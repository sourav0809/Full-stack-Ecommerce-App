import axios from "axios"
import { GET_OFFERS } from "../../api/agent"
import { addOffers } from "../reducers/offerSlice"
import toast from "react-hot-toast"

//get offers action to fetch the offers 
export const getOffersAction = () => {
    return async (dispatch, getState) => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const { data } = await axios.get(GET_OFFERS, { headers: { token: token } })
                const formatedData = data.map((value) => {
                    return {
                        id: value.id,
                        offerName: value.createdoffer.offerName,
                        minValue: value.createdoffer.minValue,
                        discount: value.createdoffer.discount,
                    }
                })
                dispatch(addOffers(formatedData))
            } catch (error) {
                toast.error('error while fetching offers')
                throw error
            }

        }
        else {
            toast.error("token not found please logIn again")

        }
    }
}