import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Banner from '../Navigationbar/banner'



//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            authFlag : false
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login',data)
            .then(response => {
                console.log("Status Code : ",response.data);
                if(response.status === 200){
                    localStorage.setItem("email_id", response.data.email_id);
                    // localStorage.setItem("user_id", this.props.restaurant.idrestaurant);
                    localStorage.setItem("name", response.data.name);
                    localStorage.setItem("user_id", response.data.user_id);


                    this.setState({
                        authFlag : true
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                } 
            });
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/rhome"/>

        } else {
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
            {redirectVar}
            <div>
                <Banner/>
                {/* <Grid> */}
                <Row>
                    <Col>
                        <div className="form">
                            <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Sign in to Yelp</h2>
                            <p>Enter username/email and password</p>
                        </div>
                        
                            <div class="form-group">
                                <p>
                                <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username/Email" style={{color:"black"}}/>
                                </p>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" style={{color:"black"}}/>
                            </div>
                            <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>  
                            
                            <div class="row mb-4 px-3 registerlogin"> 
                            <medium class="font-weight-bold">Don't have an account? <a href="/signup">Register</a></medium> 
                            </div>               
                    </div>
                            </div>
                        </div>
                    </Col>
                    <div className="lico">
                    <Col>
                        <img src='https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png' style={{ height: '50' }} alt='loginYelp' />
                    </Col>
                    </div>
                </Row>
                {/* </Grid> */}
            </div>
        </div>
        )
    }
}
//export Login Component
export default Login;