import React,{Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import  Navbar  from '../Navigationbar/Navbar';
import logo from '../../images/logo.png';
import {Link} from 'react-router-dom';


class LandingPage extends Component {
    render() {
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/chome"/>
        } else {
            redirectVar = <Redirect to = "/"/>
        }
        return(
            <div className="bg">
              <Navbar />
              <li><Link to='/'><img src={logo} className="logo" alt="logo" /> </Link></li>
            </div>
      
               )
      }
    }
export default LandingPage;