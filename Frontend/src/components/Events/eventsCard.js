import { faCalendarAlt, faCity, faClock, faMapMarkerAlt, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component} from "react";
import { Card, Row, Col, Button } from "react-bootstrap";


class EventsCard extends Component {
setCusID = () => {
        localStorage.setItem("cusID", this.props.order_history.cusID)
    }
render() {
    return (
<div>
<Card bg="white" style={{ width: "50rem", margin: "2%", height:"15rem" }}>
<Row>
          <Col xs='4'> 
            <Card.Img style={{ width: "15rem", height: "15em" }} src="" />
          </Col>
          <Col align="left" style={{marginLeft:"0mm"}}>
            <Card.Body>

                <Card.Title><p>{this.props.event_items.eventname}</p></Card.Title>
              <Card.Text><p><FontAwesomeIcon icon={faCity}/> {this.props.event_items.location}</p></Card.Text>
              <Card.Text><p><FontAwesomeIcon icon={faCalendarAlt}/>{this.props.event_items.month}/
              {this.props.event_items.date}/{this.props.event_items.year}<span style={{marginLeft:"1cm"}}><FontAwesomeIcon icon={faClock}/>{this.props.event_items.time}</span></p></Card.Text>
              <Card.Text><p><FontAwesomeIcon icon={faNewspaper}/> {this.props.event_items.description}</p></Card.Text>
              <Card.Text><Button href="/registeredPeople" style={{marginTop:"5mm", textDecoration:"none"}} variant='link'><small style={{color:"red"}}> Check registered people </small></Button></Card.Text>            </Card.Body>
          </Col>
        </Row>
      </Card>
</div>
    );
}

}
export default EventsCard;