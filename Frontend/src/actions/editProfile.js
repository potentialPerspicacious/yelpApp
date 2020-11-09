import axios from "axios";
import backendServer from "../webConfig"
import cookie from "react-cookies";



export const editProfile = (profiledata) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/restaurant/editProfile/${localStorage.getItem("user_id")}`, profiledata, {
        headers: { Authorization: `JWT ${cookie.load("token")}` }})
    .then(response => dispatch({
            type: 'USER_UPDATED',
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: 'USER_UPDATED',
                    payload: error.response.data
                });
            }
        });
}

export const editCProfile = (profiledata) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/customer/editProfile/${localStorage.getItem("user_id")}`, profiledata, {
        headers: { Authorization: `JWT ${cookie.load("token")}` }})
    .then(response => dispatch({
            type: 'USER_UPDATED',
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: 'USER_UPDATED',
                    payload: error.response.data
                });
            }
        });
}