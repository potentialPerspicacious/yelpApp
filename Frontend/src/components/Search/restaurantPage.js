import React, {Component} from 'react';
import '../../App.css';
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faNewspaper, faIdCard } from "@fortawesome/free-solid-svg-icons";
import Resinfo from '../Profile/resinfo';

class RestaurantPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render(){
        let navSearch = null;
        navSearch = (
            <div>
            <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="/">
              <img src={logo} width="90" height="45" alt="logo"/>
          </a>
                   <div class="form-group col-md-3">
                   {/* <FontAwesomeIcon icon={faBuilding} /> */}
                       <input onChange = {this.onChange} type="search" class="form-control hsearch" name="find" placeholder="Restaurant, Dishes, Events..." style={{color:"black"}}/>
                   </div>
    
                   <div class="form-group col-md-3">
                   {/* <FontAwesomeIcon icon={faSearchLocation} /> */}
                       <input onChange = {this.onChange}  type="search" class="form-control hsloc" name="location" placeholder="Where?" style={{color:"black"}}/>
                   </div>
                   <div class="form-group col-md-1">
                   <button class="btn btn-primary hsb" type="submit"> <FontAwesomeIcon icon={faSearch} />
                          </button></div>
    
                      <li class="nav-item">
                    <a class="nav-link navtext3" style={{marginLeft:"4.3cm"}}  href="/creviews" ><FontAwesomeIcon className="signico" icon={faNewspaper} /> Write a Review</a>
                      </li>
                      <li class="nav-item">
                    <a class="nav-link navtext3"  href="/cprofile" ><FontAwesomeIcon className="signico" icon={faIdCard} /> Profile</a>
                      </li>
      </nav>
      </div>
        );
        return( 
            <div>
                {navSearch}
                <Resinfo />
            </div>

        )
    }
}

export default RestaurantPage