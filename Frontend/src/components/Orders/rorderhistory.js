import { faBuilding, faCar, faClock, faHourglass, faList, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import React, { Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, Row, Col, Button } from "react-bootstrap";
import axios from 'axios'
import backendServer from "../../webConfig"
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {updateRorder} from '../../actions/orders'


class RHistoryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.order_history.orderstatus,
            value2: this.props.order_history.ordertype
            }
    }

onChange = (e) => {
        this.setState({value: e.target.value});

    }
onChange2 = (e) => {
        this.setState({value2: e.target.value});
    }

    setCusID = () => {
        localStorage.setItem("cusID", this.props.order_history.cusID)
    }

updateOrder = (e) => {
    e.preventDefault();
    const data = {
        // user_id: localStorage.getItem("user_id"),
        orderID: this.props.order_history.idorderhistory,
        orderStatus: this.state.value,
        orderType: this.state.value2,
    }
    this.props.updateRorder(data)
    // axios.post(`${backendServer}/restaurant/updateOrder`, data)
    // .then(response => {
    //     this.setState({
    //         msg: (response.data)
    //     });
    // })
}
render() {
    console.log(this.props.order_history)
    let message = this.props.description
    let success = {
        message: null
    }
    if(message == 'ORDER_UPDATED'){
        success.message = 'Successfully updated the order.'
        setTimeout(function() {window.location = '/rorders'}, 10000);
    }
    return (
<div>
<Card bg="white" style={{ width: "60rem", margin: "2%", height:"21rem" }}>
        <Row>
          <Col xs="4.5">
            <Card.Img style={{marginLeft:"4mm", width: "15rem", height: "21rem" }} src="" />
          </Col>
          <Col align="left" style={{marginLeft:"0mm"}}>
            <Card.Body>
              <Card.Title>Order No - {this.props.order_history.idorderhistory}</Card.Title>
              <Card.Text><p><FontAwesomeIcon icon={faBuilding} /> <span style={{fontWeight:"bold"}}> Order From: </span> <span style={{textTransform: "uppercase"}}><a href="/cprofile" onClick={this.setCusID} style={{textDecoration:"none", color:"black"}}> {this.props.order_history.fname} {this.props.order_history.lname}</a></span> </p></Card.Text>
              <Card.Text><FontAwesomeIcon icon={faCar} /> <span style={{fontWeight:"bold"}}> Order Type: </span> <span style={{textTransform: "uppercase"}}> <i>{this.props.order_history.ordertype}</i></span><span style={{fontWeight:"bold", marginLeft:"3.5cm", marginRight:"1cm"}}> <br/>Change Delivery Status:
              
              <select id="ordertype" onChange={this.onChange2} value={this.state.value2}>
                  <option value="select">Select</option>
                  <option value="pickup">Pickup</option>
                  <option value="delivery">Delivery</option>
                  <option value="Pickup Ready">Pickup Ready</option>
                  <option value="Picked Up">Picked Up</option>
                  <option value="On the way">On the way</option>
                  <option value="Delivered">Delivered</option>
               </select>
              </span></Card.Text>
              <Card.Text><FontAwesomeIcon icon={faHourglass} /><span style={{fontWeight:"bold"}}> Order Status: </span> <span style={{textTransform: "uppercase"}}> <i>{this.props.order_history.orderstatus}</i></span> <span style={{fontWeight:"bold", marginLeft:"1.2cm", marginRight:"1cm"}}> <br/>Change Order Status:
              
              <select id="orderstatus" onChange={this.onChange} value={this.state.value}>
                  <option value="select">Select</option>
                  <option value="New Order">New Order</option>
                  <option value="Order Recieved">Order Recieved</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Prepared">Prepared</option>
                 
               </select>
              </span> </Card.Text>
              
              <Card.Text><FontAwesomeIcon icon={faList} /><span style={{fontWeight:"bold"}}> Ordered Item/s: </span> <span style={{textTransform: "uppercase"}}> <li>{this.props.order_history.dishes}</li></span></Card.Text>
              {/* <Card.Text><FontAwesomeIcon icon={faClock} /><span style={{fontWeight:"bold"}}> Order Items: </span> <span style={{textTransform: "uppercase"}}> <i>{this.props.order_history.datetime}</i></span></Card.Text> */}

              <Row>
              <Button variant="outline-success" onClick={this.updateOrder}>Update Order</Button>
              <Button style={{marginLeft:"2cm"}}variant="outline-danger" onClick={this.updateOrder}>Cancel Order</Button>
              </Row>
            </Card.Body>
          </Col>

        </Row>
      </Card>
      {success.message && <div className='alert alert-success'>{success.message}</div>}
</div>
    );
}

}

RHistoryCard.propTypes = {
    updateRorder: PropTypes.func.isRequired,
    description: PropTypes.object.isRequired
  }
  
  const mapStateToProps = state => { 
    return ({
        description: state.orders.description
  })};
  
  export default connect(mapStateToProps, { updateRorder })(RHistoryCard);