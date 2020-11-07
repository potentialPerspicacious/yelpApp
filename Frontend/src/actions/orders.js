import axios from "axios";
import backendServer from "../webConfig"


export const placeOrder = (data) => dispatch => {
    axios.post(`${backendServer}/customer/placeOrder/${localStorage.getItem("orderID")}/${localStorage.getItem("orderstatus")}/${localStorage.getItem("ordermode")}`)
    .then(response => dispatch({
            type: 'PLACE_ORDER',
            payload: response.data 
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: 'PLACE_ORDER',
                    payload: error.response.data
                });
            }
        });
}
export const cancelOrder = (data) => dispatch => {
    axios.post(`${backendServer}/customer/cancelOrders/${localStorage.getItem("orderID")}`)
    .then(response => dispatch({
            type: 'CANCEL_ORDER',
            payload: response.data 
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: 'CANCEL_ORDER',
                    payload: error.response.data
                });
            }
        });
}
export const updateRorder = (data) => dispatch => {
    axios.post(`${backendServer}/restaurant/updateOrder`, data)
    .then(response => dispatch({
            type: 'UPDATE_RORDER',
            payload: response.data 
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: 'UPDATE_RORDER',
                    payload: error.response.data
                });
            }
        });
}