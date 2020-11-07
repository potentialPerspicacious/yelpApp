import axios from "axios";
import backendServer from "../webConfig"


export const userLogin = (loginData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/login/:${localStorage.getItem("isOwner")}`, loginData)
            .then(response => dispatch({
            type: 'USER_LOGIN',
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: 'USER_LOGIN',
                    payload: error.response.data
                });
            }
        });
}

export const userLogout = () => dispatch => dispatch({type: 'USER_LOGOUT'});