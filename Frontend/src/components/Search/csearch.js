import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import {Row, Col} from 'react-bootstrap'
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faNewspaper, faIdCard } from "@fortawesome/free-solid-svg-icons";
import ResCard from './resCard'

class Csearch extends Component {
   constructor (props) {
    super(props);
    this.state= {
        restaurant_search: []

    }
    this.restaurants = this.restaurants.bind(this);
    this.getRestaurants();

   }
   getRestaurants = () => {
    axios.get(`http://localhost:3001/search/restaurants/${localStorage.getItem("find")}/${localStorage.getItem("location")}`)
        .then(response => {
                this.setState({
                    restaurant_search: this.state.restaurant_search.concat(response.data)
                });
        })
};
restaurants = () => {
    var itemsRender = [], items, item;
    if (this.state && this.state.restaurant_search && this.state.restaurant_search.length > 0) {
        items = this.state.restaurant_search
        if (items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                item = <ResCard restaurant_search={items[i]}/>;
                itemsRender.push(item);
            }
        }
        return itemsRender;
    }
}
   delivery = () => {
       window.location = '/chome'
   }
   render() {
    let navSearch = null,
    message = null, 
    section,
    renderOutput = [];
    navSearch = (
        <div>
        <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="/">
          <img src={logo} width="90" height="45" alt="logo"/>
      </a>
               <div class="form-group col-md-3">
               {/* <FontAwesomeIcon icon={faBuilding} /> */}
                   <input onChange = {this.onChange} type="search" class="form-control hsearch" name="find" placeholder="Restaurant" style={{color:"black"}}/>
               </div>

               <div class="form-group col-md-3">
               {/* <FontAwesomeIcon icon={faSearchLocation} /> */}
                   <input onChange = {this.onChange}  type="search" class="form-control hsloc" name="location" placeholder="Location" style={{color:"black"}}/>
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
    if (this.state && this.state.restaurant_search && this.state.restaurant_search.length > 0) {
        section = this.restaurants(this.state.restaurant_search);
        console.log(section)
        renderOutput.push(section);

            }
       return (
           <div>
               {navSearch}
               <div class='row' style={{ marginLeft:"10px", marginTop:"2cm"}}>
                   <Col xs="1.5mm">
                <div class='col-xs-3' style={{marginLeft: "10px", marginTop:"1cm"}}>
                    <h7 style={{color:'gray'}}> Filters</h7>
                    <hr />
                    <p>
                    <Row style={{marginLeft:"0mm"}}>
                    <input onChange = {this.pickup} type="checkbox" name="pickup" placeholder="Curb Side Pickup" style={{marginTop: "1.5mm"}}/> 
                    <p style={{marginTop:"0mm", marginLeft:"1mm"}}> Curb Side Pickup </p>
                    </Row>
                    <Row style={{marginLeft:"0mm"}}>
                    <input onChange = {this.dine} type="checkbox" name="dine" placeholder="Dine In" style={{marginTop: "1.5mm"}}/> 
                    <p style={{marginTop:"0mm", marginLeft:"1mm"}}> Dine In </p>
                    </Row>
                    <Row style={{marginLeft:"0mm"}}>
                    <input onChange = {this.delivery} type="checkbox" name="delivery" placeholder="yelp delivery" style={{marginTop: "1.5mm"}}/> 
                    <p style={{marginTop:"0mm", marginLeft:"1mm"}}> Yelp Delivery </p>
                    </Row>
                    </p>
                </div>
                <div class='col-xs-3' style={{marginLeft: "10px", marginTop:"1cm"}}>
                    <h7 style={{color:'gray'}}> Neighborhood</h7>
                    <hr />
                    <p>
                    <Row style={{marginLeft:"0mm"}}>
                    <input onChange = {this.loc1} type="checkbox" name="pickup" placeholder="Curb Side Pickup" style={{marginTop: "1.5mm"}}/> 
                    <p style={{marginTop:"0mm", marginLeft:"1mm"}}> Richardson </p>
                    </Row>
                    <Row style={{marginLeft:"0mm"}}>
                    <input onChange = {this.loc2} type="checkbox" name="dine" placeholder="Dine In" style={{marginTop: "1.5mm"}}/> 
                    <p style={{marginTop:"0mm", marginLeft:"1mm"}}> Garland </p>
                    </Row>
                    <Row style={{marginLeft:"0mm"}}>
                    <input onChange = {this.loc3} type="checkbox" name="delivery" placeholder="yelp delivery" style={{marginTop: "1.5mm"}}/> 
                    <p style={{marginTop:"0mm", marginLeft:"1mm"}}> Plano </p>
                    </Row>
                    </p>
                    </div>
                </Col>
                
                <div class='col-xs-6' style={{textAlign: "left", height: "100%", borderLeft: "1px solid #e6e6e6", marginTop:"0.85cm", marginLeft: "1.2cm"}}>
                    <div style={{marginLeft: "10px"}}>
                        <h4 style={{color:'red'}}> Restaurants in your area</h4>
                        <hr />
                        {renderOutput}
                
                    </div>
                </div>
                <div class='col-xs-1' style={{textAlign: "left", height: "100%", borderLeft: "1px solid #e6e6e6", marginTop:"0.85cm", marginLeft: "1.5cm", float:"right"}}>
                    <div style={{marginLeft: "10px"}}>
                        <h4 style={{color:'Gray'}}> Maps</h4>
                        <hr />
                
                    </div>
                </div>
                </div>
           </div>
       )
   }
}

export default Csearch