import { faCalendarAlt, faCity, faClock, faMapMarkerAlt, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component} from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import axios from 'axios'
import {registerEvent} from '../../actions/events'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


class EventsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: {},
        };
    }
    saveEventID = () => {
        localStorage.setItem('eventid', this.props.event_items._id)
    }
    registerEvent =() => {
        const data = {
            cusID: localStorage.getItem("user_id"),
            eventid: this.props.event_items.idevents
        }
        this.props.registerEvent(data)

    }
render() {
    console.log(this.props.event_items)
    let success = {
        message: null
    }
    let error = {
        message: null
    }
    if(this.props.description === 'REGISTERED_EVENT'){
        success.message = "Successfully registered for the event"      
        setTimeout(function() {window.location = '/viewcevents'}, 1000);
    } else if (this.props.description  === 'ALREADY_REGISTERED'){
    error.message = "You already registered for this event"
    setTimeout(function() {window.location = '/viewcevents'}, 1000);


}

    let registration = null;
    if (localStorage.getItem("isOwner") === "on"){
    registration = ( <Card.Text><Button href="/registeredPeople" onClick={this.saveEventID} style={{marginTop:"5mm", textDecoration:"none"}} variant='link'><small style={{color:"red"}}> Check registered people </small></Button></Card.Text>  )}
    else if(localStorage.getItem("isOwner") === "off") {
        registration = (<Card.Text><Row><Col> <Button onClick={this.registerEvent} style={{marginTop:"5mm", textDecoration:"none"}} variant='link'><small style={{color:"red"}}> Register </small></Button></Col> 
        <Col style = {{marginTop:"7mm"}}>
        <small style={{color:"gray", marginLeft:"2cm"}}> Organized By: <span style={{textTransform:"uppercase"}}> {this.props.event_items.name}
            </span>  </small>
        </Col></Row></Card.Text>)
    }
    return (
<div>
<Card bg="white" style={{ width: "50rem", margin: "2%", height:"15rem" }}>
<Row>
          <Col xs='4'> 
            <Card.Img style={{ width: "15rem", height: "15em" }} src={`https://www.kalas.co.uk/imagecache/1000x0_bs1790_4.png`} />
          </Col>
          <Col align="left" style={{marginLeft:"0mm"}}>
            <Card.Body>

                <Card.Title><p>{this.props.event_items.event_name}</p></Card.Title>
              <Card.Text><p><FontAwesomeIcon icon={faCity}/> {this.props.event_items.location}</p></Card.Text>
              <Card.Text><p><FontAwesomeIcon icon={faCalendarAlt}/><span style={{marginLeft:"1mm"}}>
                  {this.props.event_items.month}/
              {this.props.event_items.date}/{this.props.event_items.year}</span><span style={{marginLeft:"1cm"}}><FontAwesomeIcon icon={faClock}/><span style={{marginLeft:"1mm"}}>{this.props.event_items.time}</span>  </span></p></Card.Text>
              <Card.Text><p><FontAwesomeIcon icon={faNewspaper}/> {this.props.event_items.description}</p></Card.Text>
                 {registration}      </Card.Body>
          </Col>
        </Row>
      </Card>
      {success.message && <div className='alert alert-success'>{success.message}</div>}
    {error.message && <div className='alert alert-danger'>{error.message}</div>}
</div>
    );
}

}
EventsCard.propTypes = {
    registerEvent: PropTypes.func.isRequired,
    description: PropTypes.object.isRequired
}

const mapStateToProps = state => { 
    return ({
        description: state.events.description
})};

export default connect(mapStateToProps, { registerEvent })(EventsCard);