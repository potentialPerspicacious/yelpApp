import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Banner from '../Navigationbar/banner'
import { userLogin } from '../../actions/login'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'



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
            isOwner: "off",
            authFlag : false
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.isOwner = this.isOwner.bind(this);

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
    isOwner = (e) => {
        this.setState({
            isOwner: e.target.value

        }) 
    
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password, 
            isOwner: this.state.isOwner
        }
        // console.log(data)
        this.props.userLogin(data);
        this.setState({
            loginFlag: 1
        });
        this.setState({
            username : this.state.username,
            password : this.state.password, 
            isOwner: this.state.isOwner
        })
    }

    render(){
        //redirect based on successful login
        const isowner = this.state.isOwner
        localStorage.setItem("isOwner", isowner);
        const error = {
            message: null
        }
        let redirectVar = null;
        if(cookie.load('cookie')){
            if (this.props.description.type === "restaurant"){
                redirectVar = <Redirect to= "/rhome"/>
            } else {
                redirectVar = <Redirect to= "/chome"/>

            }
        } else {
            redirectVar = <Redirect to= "/login"/>
        }
        if(this.props.description == 'INCORRECT_PASSWORD'){
            error.message = 'Invalid username/password.'
            setTimeout(function() {window.location = '/login'}, 2000);
        } else if(this.props.description == 'NO_USER'){
            error.message = 'User does not exists. Please signup.'
            setTimeout(function() {window.location = '/login'}, 2000);
        }
        console.log(this.props.description)
        if(this.props.description && this.props.description._id){
            localStorage.setItem("email_id", this.props.description.email);
            localStorage.setItem("user_id", this.props.description._id);
            localStorage.setItem("type", this.props.description.type);

        }
        return(
            <div>
            {redirectVar}
            <div>
                <Banner/>
                {/* <Grid> */}
                <Row>
                    <Col>
                        <div className="lgform">
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
        
                                <Row className="" style={{marginLeft:"1mm"}}>
                                <p> Check if owner </p>
                                    <input onChange = {this.isOwner} type="checkbox" name="isowner" placeholder="" style={{marginTop:"2mm", marginLeft:"1mm"}}/> 

                                </Row>

                            <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>  
                            
                            <div class="row mb-4 px-3 registerlogin"> 
                            <medium class="font-weight">Don't have an account? <a href="/signup">Register</a></medium> 
                            </div>    
           
                    </div>
                    {error.message && <div className='alert alert-danger'>{error.message}</div>}
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
Login.propTypes = {
    userLogin: PropTypes.func.isRequired,
    description: PropTypes.object.isRequired
}

const mapStateToProps = state => { 
    return ({
        description: state.login.description
})};

export default connect(mapStateToProps, { userLogin })(Login);