import axios from "axios";
import backendServer from "../webConfig"


export const editProfile = (profiledata) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/restaurant/editProfile/${localStorage.getItem("user_id")}`, profiledata)
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