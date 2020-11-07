import { faCalendarAlt, faCity, faClock, faMapMarkerAlt, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component} from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import axios from 'axios'
import backendServer from "../../webConfig"


class MessageHisCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: {},
        };
    }
    setMsgID = () => {
        localStorage.setItem("cusID", this.props.message_items._id)
    }

render() {
    var imageSrc;
    if (this.props) {
        imageSrc = `${backendServer}/images/user/${this.props.message_items.image}`;
    }
    return (
<div>
<Card bg="white" style={{ width: "30rem", margin: "2%", height:"5rem" }}>
<Row>
          <Col xs='2'> 
            <Card.Img style={{ width: "5rem", height: "5em" }} src={imageSrc} />
          </Col>
          <Col align="left" style={{marginLeft:"0mm"}} xs='8'>
            <Card.Body>

                <Card.Title>
    <p style={{textTransform:"uppercase", marginTop:"2mm"}}>{this.props.message_items.name}: {this.props.message_items.msg}</p>
                    </Card.Title>  
                  </Card.Body>
          </Col>
        </Row>
      </Card>
</div>
    );
}

}
export default MessageHisCard;