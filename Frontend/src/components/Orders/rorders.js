import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import {Row, Col, Button} from 'react-bootstrap'
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faNewspaper, faIdCard, faWonSign, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import RHistoryCard from './rorderhistory'
import backendServer from "../../webConfig"


class RorderHistory extends Component {
    constructor(props) {
      super(props);
      this.state = {
          status: {},
          value: "no_filter",
          checked: {},
          order_history: [],
      
      };
      this.orderHistory = this.orderHistory.bind(this);
      this.getOrderHistory();
  }  

  getOrderHistory = () => {
    if(localStorage.getItem("filter") !=='no_filter') {
        axios.get(`${backendServer}/restaurant/orderHistoryFilter/${localStorage.getItem("user_id")}/${localStorage.getItem("filter")}`)
        .then(response => {
                this.setState({
                    order_history: this.state.order_history.concat(response.data),
                    status: (response.data[0]),
                    checked: (response.data[0])
                });
        })
    } else {
        axios.get(`${backendServer}/restaurant/orderHistory/${localStorage.getItem("user_id")}`)
        .then(response => {
                this.setState({
                    order_history: this.state.order_history.concat(response.data),
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
                    item = <RHistoryCard order_history={items[i]}/>;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    }
    orderStatus = (e) => {
            this.setState({value: e.target.value});
            window.location = '/rorders'
            // console.log(value)
        }
    clearFilters = (e) => {
        localStorage.setItem("filter", 'no_filter')
        window.location = '/rorders'

    }
    render (){
        let navSearch = null,
        section,
        renderOutput = [];
        
        if (this.state.status === "ITEM_PRESENT"){
        if (this.state && this.state.order_history && this.state.order_history.length > 0) {
            section = this.orderHistory(this.state.order_history);
            renderOutput.push(section);
                }
        } else if (this.state.status === "ITEM_NOT_PRESENT"){
            renderOutput.push (<div> <p style={{color:"red"}}> No filtered Items. </p></div>)
        }
        localStorage.setItem("filter", this.state.value)
        console.log(this.state.checked)
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
                        <a class="nav-link navtext3" style={{marginLeft:"4.3cm"}}  href="/addevent" ><FontAwesomeIcon className="signico" icon={faCalendarPlus} /> Add Events</a>
                          </li>
                          <li class="nav-item">
                        <a class="nav-link navtext3"  href="/rhome" ><FontAwesomeIcon className="signico" icon={faIdCard} /> Profile</a>
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
                    
                    <div class='col-xs-2' style={{textAlign: "left", height: "100%", borderLeft: "1px solid #e6e6e6", marginTop:"0.85cm", marginLeft: "0cm"}}>
                        <div style={{marginLeft: "20px"}}>
                            <h4 style={{color:'red'}}> Your Orders</h4>
                            <hr />
                            {renderOutput}
                           {/* <p style={{color:"red", align:"center"}}> Please Add Items to Shopping Bag Before Proceeding</p>            */}
                        </div>
                    </div>
                    </div>
                </div>                    
                
            </div>
        )
    }
    }
    export default RorderHistory