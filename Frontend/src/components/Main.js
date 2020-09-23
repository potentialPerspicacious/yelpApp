import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import cHome from './Home/cHome';
import rHome from './Home/rHome';
import LandingPage from './LandingPage/LandingPage';
import SignupRestaurant from './Signup/SignupRestaurant'
import EditProfile from './Profile/editProfile'


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



            </div>
        )
    }
}
//Export The Main Component
export default Main;