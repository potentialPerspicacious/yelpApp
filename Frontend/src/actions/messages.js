import axios from "axios";
import backendServer from "../webConfig"


export const res2cus = (data) => dispatch => {
    axios.post(`${backendServer}/restaurant/sendMessage/${localStorage.getItem("user_id")}/${localStorage.getItem("cusID")}`, data)
        .then(response => dispatch({
            type: 'MESSAGE_INIT',
            payload: response.data 
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: 'MESSAGE_INIT',
                    payload: error.response.data
                });
            }
        });
}
export const cus2res = (data) => dispatch => {
    axios.post(`${backendServer}/customer/replyMessage/${localStorage.getItem("msgID")}`, data)
        .then(response => dispatch({
            type: 'MESSAGE_REPLY',
            payload: response.data 
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: 'MESSAGE_REPLY',
                    payload: error.response.data
                });
            }
        });
}
