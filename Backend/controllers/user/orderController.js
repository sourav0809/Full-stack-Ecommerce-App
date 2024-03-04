const Razorpay = require('razorpay')
const { getCartProducts, deleteCartService } = require('../../services/cartServices')
const { findOfferbyId, deleteGivenOfferService } = require('../../services/offerServices')
const { addTransactionService, createOrderService, createOrderItemService, updateTransactionService } = require('../../services/orderServices')
const sequelize = require('../../util/database')

const orderController = {

    createOrder: async (req, res) => {
        const { email, id } = req.user
        const { offerId } = req.body
        try {
            // taking all cart products
            const cartProducts = await getCartProducts(id)

            // calculating total price 
            let totalPrice = cartProducts.reduce((prev, curr) => {
                const productTotal = curr.quantity * curr.price;
                return prev + productTotal + 5;
            }, 0)

            // if user applied some offer
            if (offerId) {
                const appliedOffer = await findOfferbyId(offerId)
                if (appliedOffer) { totalPrice = Math.round(totalPrice - (totalPrice * (appliedOffer.discount / 100))) }
            }
            // razorpay instance
            const amount = totalPrice * 100
            const rzp = new Razorpay({
                key_id: process.env.RZP_KEY_ID,
                key_secret: process.env.RZP_KEY_SECRET
            })
            // creating the order
            rzp.orders.create({ amount: amount, currency: 'INR' }, async (err, order) => {
                try {
                    if (err) {
                        throw new Error(JSON.stringify(err))
                    }
                    await addTransactionService(order.id, totalPrice, email)
                    res.send({ order, key_id: process.env.RZP_KEY_ID })

                } catch (error) {
                    res.status(400).send({ message: "error while creating order", error: error })
                }

            })

        } catch (error) {
            console.log(error)
        }
    },
    updateOrderCompleted: async (req, res) => {
        const { id } = req.user
        const { orderId, paymentId, address, offerId } = req.body
        let tran;
        try {
            // creating transaction object
            tran = await sequelize.transaction()

            // taking all cart products
            const cartProducts = await getCartProducts(id)

            // calculating total price 
            let totalAmount = cartProducts.reduce((prev, curr) => {
                const productTotal = curr.quantity * curr.price;
                return prev + productTotal + 5;
            }, 0)

            // if user applied some offer
            let discountPercentage = 0
            let finalAmount = totalAmount
            if (offerId) {
                const appliedOffer = await findOfferbyId(offerId)

                if (appliedOffer) {
                    finalAmount = Math.round(finalAmount - (finalAmount * (appliedOffer.discount / 100)))
                    discountPercentage = appliedOffer.discount
                }
            }
            // creating the order in order table
            const createdOrder = await createOrderService(totalAmount, discountPercentage, finalAmount, address, id, tran)

            // creating the order item table in bulk
            const orderItems = cartProducts.map((value) => {
                return {
                    orderDetails: JSON.stringify({ ...value }),
                    userId: id,
                    orderId: createdOrder.id
                }
            })
            await createOrderItemService(orderItems, tran)

            // deleting the cart items 
            await deleteCartService(id, tran)

            // updating the transaction table
            await updateTransactionService(orderId, "Completed", paymentId, tran)

            // deleting the offers if user applied 
            if (offerId) {
                await deleteGivenOfferService(offerId, tran)
            }


            // if all promises fulfiled
            tran.commit()

            res.send({ message: "Order completed" })
        } catch (error) {
            console.log(error)
            tran.rollback()
            res.status(400).send({ message: "error while creating order" })
        }
    },

    // for updating the order status failed 
    updateOrderFailed: async (req, res) => {
        const { orderId } = req.body
        try {
            if (!orderId) {
                res.status(500).send({ message: "Order Id is not found " })
            }
            updateTransactionService(orderId, "Failed")
            res.send({ message: "Order failed " })
        } catch (error) {
            res.status(500).send({ message: "Error while updating order status failed" })
        }
    }
}

module.exports = orderController