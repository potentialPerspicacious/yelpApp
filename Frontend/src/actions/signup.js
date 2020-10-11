import axios from "axios";

export const restaurantSignup = (resdata) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/signup/restaurant', resdata)
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
    axios.post('http://localhost:3001/signup/customer', resdata)
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