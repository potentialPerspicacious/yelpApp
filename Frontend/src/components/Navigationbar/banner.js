import React, {Component} from 'react';
import '../../App.css';
import logo from '../../images/logo.png';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Banner extends Component {
    handleLogout = () => {
        window.localStorage.clear();
        cookie.remove('cookie', { path: '/' });
        this.props.userLogout();
    }
    render(){
        let banner = null;
        if(cookie.load('cookie')){
            banner = (
                <div>
                <div className="banner">
                <li><Link to='/'><img src={logo} className="bannerlogo" alt="logo" /> </Link>
                {/* <Link to="/login" onClick = {this.handleLogout}><a className='navtext'>Logout</a><span class="glyphicon glyphicon-user navicon"></span></Link> */}
                </li>
                </div>
                {/* <div className="lgbanner">
                <li><Link to="/login" onClick = {this.handleLogout}><a className='navtext'>Logout</a><span class="glyphicon glyphicon-user navicon"></span></Link></li>
                </div> */}
                </div>
            );
        }else{
            banner = (
                <div className="banner">
                <li><Link to='/'><img src={logo} className="bannerlogo" alt="logo" /> </Link></li>
                </div>
            );
        }
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/rhome"/>
        } else {
            redirectVar = <Redirect to = "/"/>
        }
        return(
            <div>
                {banner}
            </div>
        )
    }
    }
    export default Banner;
