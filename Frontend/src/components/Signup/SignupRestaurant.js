import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import Banner from '../Navigationbar/banner'


class SignupRestaurant extends Component {
    render(){
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/rhome"/>
        } else {
            redirectVar = <Redirect to = "/signup-restaurant"/>
        }
        return(
            <div>
                <Banner/>
            <div className="form">
                       <div class="login-form signupform">
                       <div class="main-div signupform">
                   <div class="panel ">
                       <h2>Sign Up for Yelp - Restaurant</h2>
                   </div>
                        <div class="form-group">
                       <label class="label-form"> Enter your restaurant name</label>
                           <input type="email" class="form-control" name="email" placeholder="Restaurant Name" style={{color:"black"}}/>
                       </div>
                       <div class="form-group">
                       <label class="label-form"> Enter your email</label>
                           <input type="email" class="form-control" name="email" placeholder="Email" style={{color:"black"}}/>
                       </div>
                       <div class="row">
                       <div class="form-group col-md-6">
                       <label class="label-form"> Enter your desired password</label>
                           <input type="password" class="form-control" name="password" placeholder="Password" style={{color:"black"}}/>
                       </div>

                       <div class="form-group col-md-6">
                       <label class="label-form"> Please confirm your password</label>
                           <input type="password" class="form-control" name="cpassword" placeholder="Password" style={{color:"black"}}/>
                       </div>
                       </div>
                       <div class="form-group">
                           <p>
                               <label class="label-form"> Enter your zip code</label>
                           <input type="text" class="form-control" name="username" placeholder="Zipcode" style={{color:"black"}}/>
                           </p>
                       </div>
                       <button class="btn btn-primary">Register</button>  
                            <div class="row mb-4 px-3 register"> 
                            <medium class="font-weight-bold">Not a owner? <a href="/signup" style={{marginRight:"0.1cm"}}>Register</a></medium> 
                            <medium class="font-weight-bold reregister"> | Already a member? <a href="/login">Login</a></medium> 
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="lico">
                        <img src='https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png' style={{ height: '50' }} alt='loginYelp' />
                    </div>
        </div>
        )
    }
}

export default SignupRestaurant
