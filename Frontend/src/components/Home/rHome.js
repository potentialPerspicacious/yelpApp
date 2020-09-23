import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import  Banner  from '../Navigationbar/banner';
import Resinfo from '../Profile/resinfo';
import {Link} from 'react-router-dom';

class rHome extends Component {
    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        } else {
            redirectVar = <Redirect to = "/rhome"/>
        }
        return( 
            <div>
                <Banner />
                <Resinfo />
            </div>

        )
    }
}
//export Home Component
export default rHome;