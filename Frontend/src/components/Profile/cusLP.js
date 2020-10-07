import React,{Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import  Navbar  from '../Navigationbar/Navbar';
import logo from '../../images/logo.png';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faIdCard, faSignOutAlt, faClock } from "@fortawesome/free-solid-svg-icons";


class CusLP extends Component {
  constructor (props) {
    super(props);
    this.state= {

    }
  }

    handleLogout = () => {
        window.localStorage.clear();
        cookie.remove('cookie', { path: '/' });
        this.props.userLogout();
    }

    onChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

    cSearch = () => {
      if (cookie.load('cookie')){
        localStorage.setItem("find", this.state.find)
        localStorage.setItem("location", this.state.location)
        localStorage.setItem("status", "item_not_present")
        window.location = '/csearch'
      }
    }
    render() {
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/chome"/>
        } else {
            redirectVar = <Redirect to = "/"/>
        }
        return(
            <div className="bg">

<nav class="navbar navbar-expand-lg navposl navpad">
                          <li class="nav-item">
                        <a class="nav-link navtext" href="/write-review">Write a Review</a>
                          </li>
                          <li class="nav-item">
                        <a class="nav-link navtext" href="/events">Events</a>
                          </li>

                          <li class="nav-item">
                        <a class="nav-link" href="/cprofile"><FontAwesomeIcon className="signico2" icon={faIdCard} /></a>
                          </li>
                          <li class="nav-item">
                        <a class="nav-link navtext3" style={{marginTop:"3mm", marginLeft:"1.5mm"}} href="/orderhistory"><FontAwesomeIcon className="signico" icon={faClock} /> Order History</a>
                          </li>

                          <li class="nav-item">
                        <a class="nav-link navtext3" style={{marginTop:"4mm"}}  href="/login" onClick = {this.handleLogout}><FontAwesomeIcon className="signico" icon={faSignOutAlt} /> Logout</a>
                          </li>

                    </nav>

              <li><Link to='/'><img src={logo} className="logo" alt="logo" /> </Link></li>

              <div class="row searchbar">
                       <div class="form-group col-md-3">
                       {/* <FontAwesomeIcon icon={faBuilding} /> */}
                           <input onChange = {this.onChange} type="search" class="form-control ssearch" name="find" placeholder="Restaurant" style={{color:"black"}}/>
                       </div>

                       <div class="form-group col-md-3">
                       {/* <FontAwesomeIcon icon={faSearchLocation} /> */}
                           <input onChange = {this.onChange}  type="search" class="form-control ssloc" name="location" placeholder="Location" style={{color:"black"}}/>
                       </div>
                       <div class="form-group col-md-3">
                       <button class="btn btn-primary ssb" type="submit" onClick = {this.cSearch}> <FontAwesomeIcon icon={faSearch} />
                              </button></div>
                       </div>
            </div>
      
               )
      }
    }
export default CusLP;