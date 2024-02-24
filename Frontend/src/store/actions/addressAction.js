import axios from "axios"
import { ADD_ADDRESS, GET_ADDRESSES } from "../../api/agent"
import { addAdress } from "../reducers/addressSlice"
import toast from "react-hot-toast"
// for add a new address
export const addAdressAction = (addedAdress, showModal) => {
    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {
        if (token) {
            try {
                const { data } = await axios.post(ADD_ADDRESS, addedAdress, { headers: { token: token } })
                const { addresses } = getState().addressSlice
                const newAddresses = [...addresses, data]
                dispatch(addAdress(newAddresses))
                showModal(false)

            } catch (error) {
                toast.error("Some error occurred ! ")
                console.log(error)
            }

        } else {
            toast.error("LogIn Again !")
        }
    }
}


export const getAddreesesAction = () => {
    return async (dispatch, getState) => {
        const token = localStorage.getItem("token")
        try {
            const { data } = await axios.get(GET_ADDRESSES, { headers: { token: token } })
            dispatch(addAdress(data))
        } catch (error) {
            console.log(error)
        }
    }
}