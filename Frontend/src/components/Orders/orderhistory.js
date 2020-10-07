import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import {Row, Col} from 'react-bootstrap'
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faNewspaper, faIdCard } from "@fortawesome/free-solid-svg-icons";
import HistoryCard from './historycard'

class CorderHistory extends Component {
    constructor(props) {
      super(props);
      this.state = {
          status: {
          },
          order_history: []
      
      };
      this.orderHistory = this.orderHistory.bind(this);
      this.getOrderHistory();
  }  

  getOrderHistory = () => {
    axios.get(`http://localhost:3001/customer/orderHistory/${localStorage.getItem("user_id")}`)
    .then(response => {
            this.setState({
                order_history: this.state.order_history.concat(response.data)
            });
    })
    }
    orderHistory = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.order_history && this.state.order_history.length > 0) {
            items = this.state.order_history
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    item = <HistoryCard order_history={items[i]}/>;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    }
    render (){
        let navSearch = null,
        section,
        renderOutput = [];
        if (this.state && this.state.order_history && this.state.order_history.length > 0) {
            section = this.orderHistory(this.state.order_history);
            renderOutput.push(section);
                }
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
            )

        return(
            <div>
                {navSearch}
                <div>
               <div class='row' style={{ marginLeft:"10px", marginTop:"2cm"}}>
                       <Col xs="1.5mm">
                    <div class='col-xs-3' style={{marginLeft: "10px", marginTop:"1cm"}}>
                        <h7 style={{color:'gray'}}> Filters</h7>
                        <hr />
                        <p>
                        <Row style={{marginLeft:"0mm"}}>
                        <input onChange = {this.pickup} type="checkbox" name="pickup" placeholder="Curb Side Pickup" style={{marginTop: "1.5mm"}}/> 
                        <p style={{marginTop:"0mm", marginLeft:"1mm"}}> Order Received </p>
                        </Row>
                        <Row style={{marginLeft:"0mm"}}>
                        <input onChange = {this.dine} type="checkbox" name="dine" placeholder="Dine In" style={{marginTop: "1.5mm"}}/> 
                        <p style={{marginTop:"0mm", marginLeft:"1mm"}}> Preparing </p>
                        </Row>
    
                        </p> </div>
                        <div class='col-xs-3' style={{marginLeft: "10px", marginTop:"1cm"}}>
                        <h7 style={{color:'gray'}}> Delivery Status</h7>
                        <hr />
                        <p>   
                        <Row style={{marginLeft:"0mm"}}>
                        <input onChange = {this.loc1} type="checkbox" name="pickup" placeholder="Curb Side Pickup" style={{marginTop: "1.5mm"}}/> 
                        <p style={{marginTop:"0mm", marginLeft:"1mm"}}> On the Way </p>
                        </Row>
                        <Row style={{marginLeft:"0mm"}}>
                        <input onChange = {this.loc2} type="checkbox" name="dine" placeholder="Dine In" style={{marginTop: "1.5mm"}}/> 
                        <p style={{marginTop:"0mm", marginLeft:"1mm"}}> Delivered </p>
                        </Row>
                        <Row style={{marginLeft:"0mm"}}>
                        <input onChange = {this.loc3} type="checkbox" name="delivery" placeholder="yelp delivery" style={{marginTop: "1.5mm"}}/> 
                        <p style={{marginTop:"0mm", marginLeft:"1mm"}}> Pick up ready </p>
                        </Row>
                        <Row style={{marginLeft:"0mm"}}>
                        <input onChange = {this.loc3} type="checkbox" name="delivery" placeholder="yelp delivery" style={{marginTop: "1.5mm"}}/> 
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
