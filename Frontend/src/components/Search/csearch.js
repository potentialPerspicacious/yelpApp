import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import {Row, Col, Button} from 'react-bootstrap'
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faNewspaper, faIdCard } from "@fortawesome/free-solid-svg-icons";
import ResCard from './resCard'
import Maps from '../Maps/maps'

class Csearch extends Component {
   constructor (props) {
    super(props);
    this.state= {
        restaurant_search: [],
        status: {},
        value: "no_filter",
        mapsFilter: "no_filter",
        checked: {}

    }
    this.restaurants = this.restaurants.bind(this);
    this.getRestaurants();

   }
   getRestaurants = () => {

    if(localStorage.getItem("filter") !=='no_filter'){
        axios.get(`http://localhost:3001/search/restaurantsFilter/${localStorage.getItem("find")}/${localStorage.getItem("location")}/${localStorage.getItem("filter")}`)
        .then(response => {
                this.setState({
                    restaurant_search: this.state.restaurant_search.concat(response.data),
                    status: (response.data[0].STATUS),
                    checked: (response.data[0].filter)
                });
        })
    } else {
    axios.get(`http://localhost:3001/search/restaurants/${localStorage.getItem("find")}/${localStorage.getItem("location")}`)
        .then(response => {
                this.setState({
                    restaurant_search: this.state.restaurant_search.concat(response.data),
                    status: (response.data[0].STATUS),

                });
        })
    }
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
   orderStatus = (e) => {
    this.setState({value: e.target.value});
    localStorage.setItem("mapsFilter", e.target.value)

    window.location = '/csearch'
    // console.log(value)
}
clearFilters = (e) => {
    localStorage.setItem("filter", 'no_filter')
    localStorage.setItem("mapsFilter", 'no_filter')

    window.location = '/csearch'

}
   render() {
    let navSearch = null,
    message = null, 
    section,
    renderOutput = [];
    localStorage.setItem("filter", this.state.value)
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
    if (this.state.status === "ITEM_PRESENT"){
        if (this.state && this.state.restaurant_search && this.state.restaurant_search.length > 0) {
            section = this.restaurants(this.state.restaurant_search);
            renderOutput.push(section);
                }
        } else if (this.state.status === "ITEM_NOT_PRESENT"){
            renderOutput.push (<div> <p style={{color:"red"}}> No filtered Items. </p></div>)
        }
       return (
           <div>
               {navSearch}
               <div class='row' style={{ marginLeft:"10px", marginTop:"2cm"}}>
                   <Col xs="1.5mm">
                <div class='col-xs-3' style={{marginLeft: "10px", marginTop:"1cm"}}>
                <h6> <span style={{color:'gray', fontWeight:"bold"}}>Filters</span> <Button style={{color:"red"}} onClick={this.clearFilters} variant="link"><span style={{fontSize:"small", marginLeft:"10mm"}}>clear filters</span></Button> </h6>  <br />
                    <h9 style={{color:'gray'}}> Order Type</h9>
                        <hr />
                    <p>
                    <Row style={{marginLeft:"0mm"}}>
                    <input onChange = {this.orderStatus} type="radio" name="orderstatus" value="takeout" placeholder="Curb Side Pickup" style={{marginTop: "1.5mm"}} checked={this.state.checked === 'takeout'}/> 
                    <p style={{marginTop:"0mm", marginLeft:"1mm"}}> Curb Side Pickup </p>
                    </Row>
                    <Row style={{marginLeft:"0mm"}}>
                    <input onChange = {this.orderStatus} type="radio" name="orderstatus" value="dinein" placeholder="Dine In" style={{marginTop: "1.5mm"}} checked={this.state.checked === 'dinein'}/> 
                    <p style={{marginTop:"0mm", marginLeft:"1mm"}}> Dine In </p>
                    </Row>
                    <Row style={{marginLeft:"0mm"}}>
                    <input onChange = {this.orderStatus} type="radio" name="orderstatus" value="ydelivery" placeholder="yelp delivery" style={{marginTop: "1.5mm"}} checked={this.state.checked === 'ydelivery'}/> 
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
                
                <div class='col-xs-6' style={{textAlign: "left", height: "100%", borderLeft: "1px solid #e6e6e6", marginTop:"0.85cm", marginLeft: "0cm"}}>
                    <div style={{marginLeft: "10px"}}>
                        <h4 style={{color:'red'}}> Restaurants in your area</h4>
                        <hr />
                        {renderOutput}
                
                    </div>
                </div>
                <div class='col-xl-1' style={{width:"100px", textAlign: "left", height: "100%", borderLeft: "1px solid #e6e6e6", marginTop:"0.85cm", marginLeft: "1.5cm", float:"right"}}>
                    <div style={{marginLeft: "10px"}}>
                        <h4 style={{color:'Gray'}}> Maps</h4>
                        <hr />
                        <Maps />
                
                    </div>
                </div>
                </div>
           </div>
       )
   }
}

export default Csearch