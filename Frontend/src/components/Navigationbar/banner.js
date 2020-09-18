import React, {Component} from 'react';
import '../../App.css';
import logo from '../../images/logo.png';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';


class Banner extends Component {
    render(){
        return(
        <div className="banner">
        <li><Link to='/'><img src={logo} className="bannerlogo" alt="logo" /> </Link></li>
        </div>
        )
    }
    }


export default Banner
