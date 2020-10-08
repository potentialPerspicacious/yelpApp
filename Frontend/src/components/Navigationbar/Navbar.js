import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { userLogout } from '../../actions/login'
import { connect } from 'react-redux';
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faSearch, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";




//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        window.localStorage.clear();
        cookie.remove('cookie', { path: '/' });
        this.props.userLogout();
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(cookie.load('cookie')){
            navLogin = (
                <div>
                <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="/">
                  <img src={logo} width="90" height="45" alt="logo"/>
              </a>
                       <div class="form-group col-md-3">
                       {/* <FontAwesomeIcon icon={faBuilding} /> */}
                           <input onChange = {this.onChange} type="search" class="form-control hsearch" name="find" placeholder="Restaurant" style={{color:"black"}}/>
                       </div>

                       <div class="form-group col-md-3">
                       {/* <FontAwesomeIcon icon={faSearchLocation} /> */}
                           <input onChange = {this.onChange}  type="search" class="form-control hsloc" name="location" placeholder="Location" style={{color:"black"}}/>
                       </div>
                       <div class="form-group col-md-1">
                       <button class="btn btn-primary hsb" type="submit"> <FontAwesomeIcon icon={faSearch} />
                              </button></div>
                              <li class="nav-item">
                        <a class="nav-link navtext2" style={{marginLeft:"5cm"}}  href="/addevent"><FontAwesomeIcon className="signico" icon={faCalendarPlus} /> Add Events</a>
                          </li>
                          <li class="nav-item">
                        <a class="nav-link navtext3" href="/login" onClick = {this.handleLogout}><FontAwesomeIcon className="signico" icon={faSignOutAlt} /> Logout</a>
                          </li>
          </nav>
          </div>

            );
        }else{
            navLogin = (
                <nav class="navbar navbar-expand-lg navposl navpad">
                          <li class="nav-item">
                        <a class="nav-link navtext" href="/write-review">Write a Review</a>
                          </li>
                          <li class="nav-item">
                        <a class="nav-link navtext" href="/events">Events</a>
                          </li>

                          <li class="nav-item navpos"> 
                          
                        <a class="nav-link navtext" href="/login"> <FontAwesomeIcon className="signico" icon={faSignInAlt} /> Login</a>
                          </li>
                          <li class="nav-item">
                        <a class="nav-link navtext" href="/signup"><FontAwesomeIcon className="signico" icon={faUserPlus} /> Sign Up</a>
                          </li>
                    </nav>

                
            );
        }
        let redirectVar = null;
        if(cookie.load('cookie')){
            if (localStorage.getItem("isOwner") === "off"){
                redirectVar = <Redirect to="/chome"/>
            } else {
                redirectVar = <Redirect to="/rhome"/>

            }
        } else {
            redirectVar = <Redirect to = "/"/>
        }
        return(
            <div>
                {redirectVar}
                {navLogin}
        </div>
        )
    }
}

export default connect(null, { userLogout })(Navbar);
