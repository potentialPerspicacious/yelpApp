import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import cHome from './Home/cHome';
import rHome from './Home/rHome';
import LandingPage from './LandingPage/LandingPage';
import SignupRestaurant from './Signup/SignupRestaurant'
import EditProfile from './Profile/editProfile'
import AddItem from './Menu/addItem'
import EditItem from './Menu/EditMenuItems'
import Cusinfo from './Profile/cusinfo';
import editCprofile from './Profile/editCprofile';
import Csearch from './Search/csearch'
import RestaurantPage from './Search/restaurantPage'
import CusOrders from './Orders/corders';
import CorderHistory from './Orders/orderhistory';
import RorderHistory from './Orders/rorders';
import Creview from './Reviews/creviews';
import AddEvent from './Events/addevent';
import Share from './Share/share';
import Events from './Events/viewEvents';
import CEvents from './Events/viewCevents'
import RegisteredPeople from './Events/registeredPeople';
import Maps from './Maps/maps';
import YourEvents from './Events/yourevents'
import SendMessages from './Messages/sendmessage'
import ViewMessagesFrom from './Messages/customermessage'
import CustomerReply from './Messages/customerReply'

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/signup-restaurant" component={SignupRestaurant}/>
                <Route exact path="/chome" component={cHome}/>
                <Route exact path="/rhome" component={rHome}/>
                <Route exact path="/editProfile" component={EditProfile}/>
                <Route exact path="/menu/addItem" component={AddItem}/>
                <Route exact path="/menu/editItem" component={EditItem}/>
                <Route exact path="/cprofile" component={Cusinfo}/>
                <Route exact path="/editCprofile" component={editCprofile}/>
                <Route exact path="/csearch" component={Csearch}/>
                <Route exact path="/restaurantPage" component={RestaurantPage}/>
                <Route exact path="/corders" component={CusOrders}/>
                <Route exact path="/orderhistory" component={CorderHistory}/>
                <Route exact path="/rorders" component={RorderHistory}/>
                <Route exact path="/creviews" component={Creview}/>
                <Route exact path="/addevent" component={AddEvent}/>
                <Route exact path="/share" component={Share}/>
                <Route exact path="/viewevents" component={Events}/>
                <Route exact path="/viewcevents" component={CEvents}/>
                <Route exact path="/registeredPeople" component={RegisteredPeople}/>
                <Route exact path="/maps" component={Maps}/>
                <Route exact path="/yourevents" component={YourEvents}/>
                <Route exact path="/messageCustomer" component={SendMessages}/>
                <Route exact path="/viewMessages" component={ViewMessagesFrom}/>
                <Route exact path="/messageReply" component={CustomerReply}/>




            </div>
        )
    }
}
//Export The Main Component
export default Main;