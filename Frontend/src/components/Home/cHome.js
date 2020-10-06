import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import  Navbar  from '../Navigationbar/Navbar';
import CusLP from '../Profile/cusLP'
import logo from '../../images/logo.png';
import {Link} from 'react-router-dom';


class cHome extends Component {
    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        } else {
            redirectVar = <Redirect to = "/chome"/>
        }
        return(
            <div>
                {redirectVar}
              <CusLP/>
            </div>
        )
    }
}
//export Home Component
export default cHome;