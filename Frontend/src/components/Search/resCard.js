import React, { Component } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck, faTimes, faCity, faUtensils, faEnvelope, faPhoneAlt, faClock, faCar, faShoppingBag, faChair} from "@fortawesome/free-solid-svg-icons";
import backendServer from "../../webConfig"


class ResCard extends Component {


  openmenu = () => {
     localStorage.setItem("resID", this.props.restaurant_search._id)
     window.location = '/restaurantPage'
  }

  render() {
    let dservice=null,
    tkservice = null,
    ydservice = null;
    var imageSrc;
    if (this.props) {
      imageSrc = `${backendServer}/images/restaurant/${this.props.restaurant_search.image}`;
    }
    if(this.props.restaurant_search.dinein === 'dinein'){
      dservice = (<FontAwesomeIcon className="" icon={faCheck} style={{color: "green"}}/>);
  } else {
   dservice = (<FontAwesomeIcon className="" icon={faTimes} style={{color: "red"}}/>) }
   if(this.props.restaurant_search.takeout === 'takeout'){
      tkservice = (<FontAwesomeIcon className="" icon={faCheck} style={{color: "green"}}/>);
  } else {
      tkservice = (<FontAwesomeIcon className="" icon={faTimes} style={{color: "red"}}/>) }
   if(this.props.restaurant_search.ydelivery === 'ydelivery'){
      ydservice = (<FontAwesomeIcon className="" icon={faCheck} style={{color: "green"}}/>);
  } else {
      ydservice = (<FontAwesomeIcon className="" icon={faTimes} style={{color: "red"}}/>) }
    return (
        <Link to="" style={{color:"black", textDecoration: "none"}}>
      <Card bg="white" style={{ width: "50rem", height:"18rem", margin: '2%' }} onClick={this.openmenu}>
        <Row>
          <Col>
            <Card.Img style={{ width: "25rem", height: "18rem" }} src={imageSrc} />
          </Col>
          <Col align="left" >
            <Card.Body >
              <Card.Title style={{textTransform: "uppercase"}}> {this.props.restaurant_search.name} </Card.Title>
              <Card.Text><FontAwesomeIcon icon={faCity} />  {this.props.restaurant_search.city}</Card.Text>
              <Card.Text> <FontAwesomeIcon icon={faUtensils} />  {this.props.restaurant_search.cusine}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faEnvelope} />   {this.props.restaurant_search.email} <FontAwesomeIcon icon={faPhoneAlt} style={{marginLeft:"2mm"}} />   {this.props.restaurant_search.contact} </Card.Text>
              <Card.Text><FontAwesomeIcon icon={faClock} /> {this.props.restaurant_search.timings}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faCar} /> {ydservice} <FontAwesomeIcon icon={faShoppingBag} style={{marginLeft:"2cm"}} /> {tkservice}<FontAwesomeIcon icon={faChair} style={{marginLeft:"2cm"}} />{dservice} </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      </Link>
    );
  }
}

export default ResCard;