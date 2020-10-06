import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Banner from '../Navigationbar/banner'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {restaurantSignup} from '../../actions/signup'


class SignupRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    submitLogin = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            rname: this.state.rname,
            email: this.state.email,
            password: this.state.password,
            zipcode: this.state.zipcode
        }
        this.props.restaurantSignup(data);

        this.setState({
            signupFlag: 1
        });
    }

    render(){
        let redirectVar = null;
        let error = {
            message: null
        }
        let success = {
            message: null
        }
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/rhome"/>
        } else {
            redirectVar = <Redirect to = "/signup-restaurant"/>
        }
        if(this.props.description == 'USER_ADDED'){
            success.message = 'Successfully added the new user.'
            console.log('Success')
            setTimeout(function() {window.location = '/login'}, 5000);
        } else if (this.props.description == 'USER_EXISTS'){
            error.message = 'User already exists please add a different one.'
            setTimeout(function() {window.location = '/signup-restaurant'}, 1500);
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
                           <input onChange = {this.onChange} type="email" class="form-control" name="rname" placeholder="Restaurant Name" style={{color:"black"}}/>
                       </div>
                       <div class="form-group">
                       <label class="label-form"> Enter your email</label>
                           <input onChange = {this.onChange} type="email" class="form-control" name="email" placeholder="Email" style={{color:"black"}}/>
                       </div>
                       <div class="row">
                       <div class="form-group col-md-6">
                       <label class="label-form"> Enter your desired password</label>
                           <input onChange = {this.onChange} type="password" class="form-control" name="password" placeholder="Password" style={{color:"black"}}/>
                       </div>

                       <div class="form-group col-md-6">
                       <label class="label-form"> Please confirm your password</label>
                           <input onChange = {this.onChange}  type="password" class="form-control" name="cpassword" placeholder="Password" style={{color:"black"}}/>
                       </div>
                       </div>
                       <div class="form-group">
                           <p>
                               <label class="label-form"> Enter your zip code</label>
                           <input onChange = {this.onChange} type="text" class="form-control" name="zipcode" placeholder="Zipcode" style={{color:"black"}}/>
                           </p>
                       </div>
                       <button class="btn btn-primary" onClick = {this.submitLogin}>Register</button>  
                            <div class="row mb-4 px-3 register"> 
                            <medium class="font-weight">Not a owner? <a href="/signup" style={{marginRight:"0.1cm"}}>Register</a></medium> 
                            <medium class="font-weight reregister"> | Already a member? <a href="/login">Login</a></medium> 
                            </div>
                        </div>
                        <div>
                        {error.message && <div className='alert alert-danger'>{error.message}</div>}
                        {success.message && <div className='alert alert-success'>{success.message}</div>}
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

SignupRestaurant.propTypes = {
    restaurantSignup: PropTypes.func.isRequired,
    description: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    description: state.signupRestaurant.description
});

export default connect(mapStateToProps, {restaurantSignup})(SignupRestaurant);
