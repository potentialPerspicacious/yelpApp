import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(cookie.load('cookie')){
            //console.log("Able to read cookie");
            navLogin = (
                <div>
                <ul class="nav navbar-nav navbar-left navposl">
                <li><Link to="/write-review"><a>Write a Review</a></Link></li>
                <li><Link to="/events"> <a>Events</a></Link></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user navicon"></span><a className='navtext'>Logout</a></Link></li>
                </ul>
                </div>
            );
        }else{
            navLogin = (
                <div>
                <ul class="nav navbar-nav navbar-left navposl">
                <li><Link to="/write-review"><a className='navtext'>Write a Review</a></Link></li>
                <li><Link to="/events"> <a className='navtext'>Events</a></Link></li>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in navicon"></span> <a className='navtext'>Login</a></Link></li>
                        <li><Link to="/signup"><span class="glyphicon glyphicon-user navicon"></span> <a className='navtext'>Sign up</a></Link></li>
                </ul>
                </div>
            );
        }
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/home"/>
        } else {
            redirectVar = <Redirect to = "/"/>
        }
        return(
            <div>
                {redirectVar}
            <nav class="navbar.transparent navbar navPad">
                <div class="container-fluid">
                    <div class="navbar-header">
                    </div>
                    {navLogin}
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;
