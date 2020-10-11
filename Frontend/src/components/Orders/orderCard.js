import React, { Component} from "react";
import { Card, Button, Col, Row, ListGroupItem, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faCartPlus, faCartArrowDown, faShoppingBag, faCar} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ListCard from  './listCard'
import backendServer from "../../webConfig"


class OrderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: {},
        status_message: {},status_message2:{},
        order_items: [],
    };
    
    this.onChange = this.onChange.bind(this);
    this.orderItems = this.orderItems.bind(this);
    this.getOrderedItems();

}
getOrderedItems = () => {
    axios.get(`${backendServer}/customer/OrderItems/${localStorage.getItem("user_id")}/${localStorage.getItem("resID")}`)
    .then(response => {
            this.setState({
                order_items: this.state.order_items.concat(response.data),
                status_message: (response.data),
                status_message2: (response.data[0].STATUS)
            });
    })
    }
    orderItems = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.order_items && this.state.order_items.length > 0) {
            items = this.state.order_items
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    item = <ListCard order_items={items[i]}/>;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    }

onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}
pickup = () => {
    localStorage.setItem("ordermode", "pickup")
}
delivery = () => {
    localStorage.setItem("ordermode", "delivery")
}
placeOrder = () => {
    localStorage.setItem("orderstatus", "New Order")
    localStorage.setItem("status", 'item_not_present')
    axios.post(`http://localhost:3001/customer/placeOrder/${localStorage.getItem("user_id")}/${localStorage.getItem("resID")}/${localStorage.getItem("orderstatus")}/${localStorage.getItem("ordermode")}`)
    .then(response => {
            this.setState({
                status: (response.data)
            });
    })
    }
cancelOrder = () => {
    localStorage.removeItem("ordertype")
    localStorage.removeItem("orderstatus")
    localStorage.setItem("status", 'item_not_present')
    axios.post(`http://localhost:3001/customer/cancelOrders/${localStorage.getItem("user_id")}/${localStorage.getItem("resID")}`)
    .then(response => {
            this.setState({
                status: (response.data)
            });
    })
    }
render (){
    // let message2 = this.state.status_message
    // let message3 = this.state.status_message2
    // if(message2 == "ITEM_NOT_PRESENT"){
    //     localStorage.setItem("status", 'item_not_present')
    // }
    // if(message3 == "ITEM_PRESENT"){
    //     localStorage.setItem("status", 'item_present')
    // }
    let section,
    renderOutput = [];
    if (this.state && this.state.order_items && this.state.order_items.length > 0) {
        section = this.orderItems(this.state.order_items);
        console.log(section)
        renderOutput.push(section);

            }
    let success = {
        message: null
            }


    let message = this.state.status
    if(message == 'ORDER_CANCELLED'){
        success.message = 'Successfully cancelled the order.'
        setTimeout(function() {window.location = '/csearch'}, 1000);
            }
    if(message == 'ORDER_PLACED'){
                success.message = 'Successfully placed the order.'
                setTimeout(function() {window.location = '/orderhistory'}, 1000);
                    }
            
    return(
        <div >
            {renderOutput}
                <div onChange={this.onChange} style={{marginTop:"4mm", marginLeft:"2cm"}}> 
                <p> Choose your delivery option</p>
        <input type="radio" value="Delivery" name="ordermode" onClick={this.delivery} /> Delivery
        <input style={{marginLeft:"2mm"}}type="radio" value="Pickup" name="ordermode" onClick={this.pickup}/> Pickup
                </div>
                <div class="row" style={{marginLeft:"4cm", marginTop:"1cm", marginBottom:"1cm"}}>
                       <div class="col-md-6">
                       <button class="btn btn-primary col-md-6" onClick = {this.placeOrder}><FontAwesomeIcon style={{color:"black"}} icon={faCartArrowDown}/>  Place Order</button> 
                       </div> 
                       <div class="col-md-6">
                       <button class="btn btn-secondary col-md-6" onClick = {this.cancelOrder}>Cancel</button>  
                       </div>
                        </div>
                        <div>
                        {success.message && <div className='alert alert-success'>{success.message}</div>}
                        </div>
        </div>
    )
}
}

export default OrderCard