import React, { Component } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCity, faUtensils, faEnvelope, faPhoneAlt, faClock, faCar, faShoppingBag, faChair} from "@fortawesome/free-solid-svg-icons";

class ResCard extends Component {


  openmenu = () => {
     localStorage.setItem("resID", this.props.restaurant_search.idrestaurant)
     window.location = '/restaurantPage'
  }

  render() {
    // let imageSrc = `${backendServer}/grubhub/images/item/${this.props.menu_item.item_image}`;
    return (
        <Link to="" style={{color:"black", textDecoration: "none"}}>
      <Card bg="white" style={{ width: "50rem", height:"18rem", margin: '2%' }} onClick={this.openmenu}>
        <Row>
          <Col>
            <Card.Img style={{ width: "25rem", height: "18rem" }} />
          </Col>
          <Col align="left" >
            <Card.Body >
              <Card.Title style={{textTransform: "uppercase"}}> {this.props.restaurant_search.name} </Card.Title>
              <Card.Text><FontAwesomeIcon icon={faCity} />  {this.props.restaurant_search.city}</Card.Text>
              <Card.Text> <FontAwesomeIcon icon={faUtensils} />  {this.props.restaurant_search.cusine}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faEnvelope} />   {this.props.restaurant_search.email} <FontAwesomeIcon icon={faPhoneAlt} style={{marginLeft:"2mm"}} />   {this.props.restaurant_search.contact} </Card.Text>
              <Card.Text><FontAwesomeIcon icon={faClock} /> {this.props.restaurant_search.timings}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faCar}  /> <FontAwesomeIcon icon={faShoppingBag} style={{marginLeft:"2cm"}} /> <FontAwesomeIcon icon={faChair} style={{marginLeft:"2cm"}} /> </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      </Link>
    );
  }
}

export default ResCard;