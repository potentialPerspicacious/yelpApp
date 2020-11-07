import axios from "axios";
import backendServer from "../webConfig"


export const addResEvent = (data) => dispatch => {
    axios.post(`${backendServer}/restaurant/addevent/${localStorage.getItem("user_id")}`, data)
        .then(response => dispatch({
            type: 'ADD_EVENT',
            payload: response.data 
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: 'ADD_EVENT',
                    payload: error.response.data
                });
            }
        });
}

export const registerEvent = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/customer/registerEvent`, data)
        .then(response => dispatch({
            type: 'REGISTER_EVENT',
            payload: response.data 
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: 'REGISTER_EVENT',
                    payload: error.response.data
                });
            }
        });
}
