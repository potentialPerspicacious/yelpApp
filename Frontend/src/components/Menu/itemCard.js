import React, { Component } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faCartPlus} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: {},
    
    };
}


  setDishID = () => {
    localStorage.setItem("dishID", this.props.menu_item.dishID)
  }
  addCart = () => {
    localStorage.setItem("dishID", this.props.menu_item.dishID)
    localStorage.setItem("status", "item_present")

    
    axios.post(`http://localhost:3001/customer/order/${localStorage.getItem("user_id")}/${localStorage.getItem("resID")}/${localStorage.getItem("dishID")}`)
        .then(response => {
                this.setState({
                    status: (response.data)
                });
        })
  }


  render() {
    let icon = null;
    if (localStorage.getItem("isOwner")==="on"){
      icon = (<Link to={{ pathname: "/menu/editItem"}}>
      <Button variant="link" onClick={this.setDishID} name="edit"><FontAwesomeIcon style={{color:"black"}} icon={faEdit}/></Button>&nbsp;
      </Link> )   } else {
        icon = <Button variant="link" onClick={this.addCart} name="edit"><FontAwesomeIcon style={{color:"black"}} icon={faCartPlus}/></Button>;
    }
    let message = this.state.status
    const success = {
        message: null
    }
    var imageSrc;
    if (this.state) {
        imageSrc = `http://localhost:3001/images/item/${this.props.menu_item.image}`;
    }
    let details = this.state.dish;
    // console.log(this.props.description)
    if(message == 'ITEM_ADDED'){
        success.message = 'Item added to cart.'
        setTimeout(function() {window.location = '/restaurantPage'}, 500);
    }
    return (
      <div>
      <Card bg="white" style={{ width: "50rem", margin: "2%" }}>
        <Row>
          <Col>
            <Card.Img style={{ width: "15rem", height: "15rem" }} src={imageSrc} />
          </Col>
          <Col align="left" style={{marginLeft:"0mm"}}>
            <Card.Body>
              <Card.Title>{this.props.menu_item.name}</Card.Title>
              <Card.Text><p>{this.props.menu_item.category}</p></Card.Text>
              <Card.Text><p>{this.props.menu_item.ingredients}</p></Card.Text>
              <Card.Text><p>{this.props.menu_item.description}</p></Card.Text>
              <Card.Text>Price: ${this.props.menu_item.price}</Card.Text>
            </Card.Body>
          </Col>
          <Col align="right">
            {icon}
            {/* <Button variant="link" onClick={this.props.deleteItem} name={this.props.menu_item.item_id}>Delete</Button> */}
          </Col>
        </Row>
      </Card>
                              <div>
                              {success.message && <div className='alert alert-success'>{success.message}</div>}
                              </div>
                            </div>
    );
  }
}

export default ItemCard;