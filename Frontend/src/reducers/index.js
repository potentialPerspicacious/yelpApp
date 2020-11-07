import { combineReducers } from 'redux';
import signupRedux from './signupRedux';
import loginRedux from './loginRedux';
import updateRedux from './updateRedux';
import eventsRedux from './eventsRedux';
import menuRedux from './menuRedux';
import ordersRedux from './ordersRedux.js'
import reviewRedux from './reviewRedux'
import messagesRedux from './messagesRedux'

export default combineReducers({
    signupRestaurant: signupRedux,
    login: loginRedux,
    edit: updateRedux,
    customersignup: signupRedux,
    events: eventsRedux,
    menu: menuRedux,
    orders: ordersRedux,
    reviews: reviewRedux,
    messages: messagesRedux
    
});