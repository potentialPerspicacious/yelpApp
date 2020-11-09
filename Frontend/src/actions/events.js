import axios from "axios";
import backendServer from "../webConfig"
import cookie from "react-cookies";


export const addResEvent = (data) => dispatch => {
    axios.post(`${backendServer}/restaurant/addevent/${localStorage.getItem("user_id")}`, data, {
        headers: { Authorization: `JWT ${cookie.load("token")}` }})
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
    axios.post(`${backendServer}/customer/registerEvent`, data, {
        headers: { Authorization: `JWT ${cookie.load("token")}` }})
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
