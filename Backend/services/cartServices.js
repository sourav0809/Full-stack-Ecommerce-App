const Cart = require("../models/cart");
const ProductType = require("../models/productType");
const Products = require("../models/products");

const cartServices = {
    getCartProducts: async (userId) => {
        try {
            if (!userId) { throw new Error("user not found") }
            const dbRes = await Cart.findAll({
                where: { userId },
                attributes: ['id', 'quantity'],
                include: [
                    {
                        model: ProductType,
                        attributes: ['id', 'type', 'price'],
                        include: [
                            {
                                model: Products,
                                attributes: ['id', 'name', 'imageUrls']
                            }
                        ]
                    }
                ]
            });
            // reforming the response
            const formatedValues = dbRes.map((value) => {
                return {
                    id: value.id,
                    quantity: value.quantity,
                    productTypeId: value.productType.id,
                    type: value.productType.type,
                    price: value.productType.price,
                    productId: value.productType.product.id,
                    name: value.productType.product.name,
                    imageUrls: value.productType.product.imageUrls,
                }
            })

            return formatedValues
        } catch (error) {
            throw error
        }
    },




}


module.exports = cartServices