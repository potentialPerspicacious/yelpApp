import React,{Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import  Navbar  from '../Navigationbar/Navbar';
import logo from '../../images/logo.png';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBuilding, faSearchLocation } from "@fortawesome/free-solid-svg-icons";


class LandingPage extends Component {
    render() {
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/rhome"/>
        } else {
            redirectVar = <Redirect to = "/"/>
        }
        return(
            <div className="bg">
              <Navbar />
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
                       <button class="btn btn-primary ssb" type="submit"> <FontAwesomeIcon icon={faSearch} />
                              </button></div>
                       </div>
            </div>
      
               )
      }
    }
export default LandingPage;