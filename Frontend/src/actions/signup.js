import axios from "axios";
import backendServer from "../webConfig"
import cookie from "react-cookies";



export const restaurantSignup = (resdata) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/signup/restaurant`, resdata, {
        headers: { Authorization: `JWT ${cookie.load("token")}` }})
        .then(response => dispatch({
            type: 'RESTAURANT_SIGNUP',
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: 'RESTAURANT_SIGNUP',
                    payload: error.response.data
                });
            }
            return;
        });

}

export const customerSignup = (resdata) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/signup/customer`, resdata)
        .then(response => dispatch({
            type: 'CUSTOMER_SIGNUP',
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: 'CUSTOMER_SIGNUP',
                    payload: error.response.data
                });
            }
            return;
        });

}