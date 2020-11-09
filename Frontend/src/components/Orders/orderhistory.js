import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import {Row, Col, Button} from 'react-bootstrap'
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faNewspaper, faIdCard } from "@fortawesome/free-solid-svg-icons";
import HistoryCard from './historycard'
import Geocode from "react-geocode";
import backendServer from "../../webConfig"
import ReactPaginate from 'react-paginate';



class CorderHistory extends Component {
    constructor(props) {
      super(props);
      this.state = {
          status: {},
          value: "no_filter",
          checked: {},
          order_history: [],
          perPage: 2,
          currentPage: 0,
          offset: 0
      
      };
      this.orderHistory = this.orderHistory.bind(this);
      this.getOrderHistory();
      this.handlePageClick = this.handlePageClick.bind(this);

  }  

  getOrderHistory = () => {
    if(localStorage.getItem("filter") !=='no_filter'){
        axios.get(`${backendServer}/customer/orderHistoryFilter/${localStorage.getItem("user_id")}/${localStorage.getItem("filter")}`)
        .then(response => {
                this.setState({
                    order_history: this.state.order_history.concat(response.data),
                    status: (response.data[0]),
                    checked: (response.data[0])
                })
        })
    } else {
    axios.get(`${backendServer}/customer/orderHistory/${localStorage.getItem("user_id")}`)
    .then(response => {
        console.log(response.data)
        const slice = response.data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.state.order_history = []
        this.setState({
            order_history: this.state.order_history.concat(slice),
            pageCount: Math.ceil(response.data.length / this.state.perPage),
            status: (response.data[0])
        });
    })
}
    }
    orderHistory = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.order_history && this.state.order_history.length > 0) {
            items = this.state.order_history
            if (items.length > 0) {
                for (var i = 1; i < items.length; i++) {
                    item = <HistoryCard order_history={items[i]}/>;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        console.log(selectedPage)
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.orderHistory()
        });

    };
    orderStatus = (e) => {
        this.setState({value: e.target.value});
        window.location = '/orderhistory'
        // console.log(value)
    }
    clearFilters = (e) => {
        localStorage.setItem("filter", 'no_filter')
        window.location = '/orderhistory'
    
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
          localStorage.setItem("filter", "no_filter")
          localStorage.setItem("mapsFilter", "no_filter")
          localStorage.setItem("search", 'true')
          Geocode.setApiKey("AIzaSyBb6kf0iPAJGUKRKRW8bXU85u4RNuhSja0");     
          Geocode.setLanguage("en");
          Geocode.setRegion("en");
          Geocode.enableDebug();
          Geocode.fromAddress(this.state.location).then(
              response => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng)
                localStorage.setItem('lat', lat)
                localStorage.setItem('lng', lng)
              },
            );
            setTimeout(function() {window.location = '/csearch'}, 1500);
        }
      }
      handleEvents=()=>{
      this.setState({message: "true"})
      }
  
      handleReview=()=> {
        this.setState({message: "true"})
        }
    render (){
        let navSearch = null,
        section,
        renderOutput = [];
        if (this.state.status === "ITEM_PRESENT"){
            if (this.state && this.state.order_history && this.state.order_history.length > 0) {
                section = this.orderHistory(this.state.order_history);
                console.log(section)
                renderOutput.push(section);
                    }
            } else if (this.state.status === "ITEM_NOT_PRESENT"){
                renderOutput.push (<div> <p style={{color:"red"}}> No filtered Items. </p></div>)
            }
        localStorage.setItem("filter", this.state.value)
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
                       <button class="btn btn-primary hsb" onClick={this.cSearch} type="submit"> <FontAwesomeIcon icon={faSearch} />
                              </button></div>
        
                          <li class="nav-item">
                        <a class="nav-link navtext3" style={{marginLeft:"4.3cm"}}  href="/creviews" ><FontAwesomeIcon className="signico" icon={faNewspaper} /> Write a Review</a>
                          </li>
                          <li class="nav-item">
                        <a class="nav-link navtext3"  href="/cprofile" ><FontAwesomeIcon className="signico" icon={faIdCard} /> Profile</a>
                          </li>
          </nav>
          </div>
            )

        return(
            <div>
                {navSearch}
                <div>
               <div class='row' style={{ marginLeft:"10px", marginTop:"2cm"}}>
               <Col xs="1.5mm">
                    <div class='col-xs-3' style={{marginLeft: "10px", marginTop:"1cm"}}>
                    <h6> <span style={{color:'gray', fontWeight:"bold"}}>Filters</span> <Button style={{color:"red"}} onClick={this.clearFilters} variant="link"><span style={{fontSize:"small", marginLeft:"20mm"}}>clear filters</span></Button> </h6>  <br />
                        <h9 style={{color:'gray'}}> Order Type</h9>
                        <hr />
                        <p>
                        <Row style={{marginLeft:"0mm"}}>
                        <input onChange = {this.orderStatus} id="or" type="radio" name="orderstatus" value="order recieved" placeholder="Curb Side Pickup" style={{marginTop: "1.5mm"}} checked={this.state.checked === 'order recieved'}/> 
                        <p style={{marginTop:"0mm", marginLeft:"1mm"}}> Order Received </p>
                        </Row>
                        <Row style={{marginLeft:"0mm"}}>
                        <input onChange = {this.orderStatus} id="prp" type="radio" name="orderstatus" value="preparing" placeholder="Dine In" style={{marginTop: "1.5mm"}} checked={this.state.checked === 'preparing'}/> 
                        <p style={{marginTop:"0mm", marginLeft:"1mm"}}> Preparing </p>
                        </Row>
                        <Row style={{marginLeft:"0mm"}}>
                        <input onChange = {this.orderStatus} id="no" type="radio" name="orderstatus" value="new order" placeholder="Dine In" style={{marginTop: "1.5mm"}} checked={this.state.checked === 'new order'}/> 
                        <p style={{marginTop:"0mm", marginLeft:"1mm"}}> New Orders </p>
                        </Row>
                        <Row style={{marginLeft:"0mm"}}>
                        <input onChange = {this.orderStatus} id="co" type="radio" name="orderstatus" value="cancelled order" placeholder="Dine In" style={{marginTop: "1.5mm"}} checked={this.state.checked === 'cancelled order'}/> 
                        <p style={{marginTop:"0mm", marginLeft:"1mm"}}> Cancelled Orders </p>
                        </Row>
    
                        </p> </div>
                        <div class='col-xs-3' style={{marginLeft: "10px", marginTop:"1cm"}}>
                        <h9 style={{color:'gray'}}> Delivery Status</h9>
                        <hr />
                        <p>   
                        <Row style={{marginLeft:"0mm"}}>
                        <input onChange = {this.orderStatus} id="clear" type="radio"  name="orderstatus" value="onthe way" placeholder="Curb Side Pickup" style={{marginTop: "1.5mm"}} checked={this.state.checked === 'on the way'}/> 
                        <p style={{marginTop:"0mm", marginLeft:"1mm"}}> On the Way </p>
                        </Row>
                        <Row style={{marginLeft:"0mm"}}>
                        <input onChange = {this.orderStatus} id="clear" type="radio" name="orderstatus" value="delivered" placeholder="Dine In" style={{marginTop: "1.5mm"}} checked={this.state.checked === 'delivered'}/> 
                        <p style={{marginTop:"0mm", marginLeft:"1mm"}}> Delivered </p>
                        </Row>
                        <Row style={{marginLeft:"0mm"}}>
                        <input onChange = {this.orderStatus} id="clear" type="radio" name="orderstatus" value="pickup ready" placeholder="yelp delivery" style={{marginTop: "1.5mm"}} checked={this.state.checked === 'pickup ready'}/> 
                        <p style={{marginTop:"0mm", marginLeft:"1mm"}}> Pick up ready </p>
                        </Row>
                        <Row style={{marginLeft:"0mm"}}>
                        <input onChange = {this.orderStatus} id="clear" type="radio" name="orderstatus" value="picked up" placeholder="yelp delivery" style={{marginTop: "1.5mm"}} checked={this.state.checked === 'picked up'}/> 
                        <p style={{marginTop:"0mm", marginLeft:"1mm"}}> Picked up</p>
                        </Row>
                        </p>
                    </div>
                    </Col>
                    
                    <div class='col-xs-2' style={{textAlign: "left", height: "100%", borderLeft: "1px solid #e6e6e6", marginTop:"0.85cm", marginLeft: "1.2cm"}}>
                        <div style={{marginLeft: "10px"}}>
                            <h4 style={{color:'red'}}> Your Orders</h4>
                            <hr />
                            {renderOutput}
                            <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                           {/* <p style={{color:"red", align:"center"}}> Please Add Items to Shopping Bag Before Proceeding</p>            */}
                        </div>
                    </div>
                    </div>
                </div>                    
                
            </div>
        )
    }
    }
    export default CorderHistory
