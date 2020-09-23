import React, {Component} from 'react';
import '../../App.css';
import logo from '../../images/logo.png';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';



class Banner extends Component {
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    render(){
        let banner = null;
        if(cookie.load('cookie')){
            banner = (
                <div>
                <div className="banner">
                <li><Link to='/'><img src={logo} className="bannerlogo" alt="logo" /> </Link>
                <Link to="/login" onClick = {this.handleLogout}><a className='navtext'>Logout</a><span class="glyphicon glyphicon-user navicon"></span></Link></li>

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
        return(
            <div>
                {banner}
            </div>
        )
    }
    }


export default Banner
