import { combineReducers } from 'redux';
import signupRedux from './signupRedux';
import loginRedux from './loginRedux';
import updateRedux from './updateRedux';

export default combineReducers({
    signupRestaurant: signupRedux,
    login: loginRedux,
    edit: updateRedux,
    customersignup: signupRedux,
});