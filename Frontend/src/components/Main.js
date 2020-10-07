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



                


            </div>
        )
    }
}
//Export The Main Component
export default Main;