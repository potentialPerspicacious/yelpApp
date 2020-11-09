import axios from "axios";
import backendServer from "../webConfig"
import cookie from "react-cookies";



export const addReview = (data) => dispatch => {
    axios.post(`${backendServer}/restaurant/review/${localStorage.getItem("user_id")}/${localStorage.getItem("resID")}`, data, {
        headers: { Authorization: `JWT ${cookie.load("token")}` }})
    .then(response => dispatch({
            type: 'ADD_REVIEW',
            payload: response.data 
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: 'ADD_REVIEW',
                    payload: error.response.data
                });
            }
        });
}