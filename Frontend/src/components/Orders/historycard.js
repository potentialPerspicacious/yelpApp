import { faBuilding, faCar, faClock, faHourglass, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import React, { Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, Row, Col } from "react-bootstrap";


class HistoryCard extends Component {
render() {
    return (
<div>
<Card bg="white" style={{ width: "50rem", margin: "2%", height:"15rem" }}>
        <Row>
          <Col xs="4.5">
            <Card.Img style={{marginLeft:"4mm", width: "15rem", height: "15em" }} src="" />
          </Col>
          <Col align="left" style={{marginLeft:"0mm"}}>
            <Card.Body>
            <Card.Title>Order No - {this.props.order_history.idorderhistory}</Card.Title>
              <Card.Text><p><FontAwesomeIcon icon={faBuilding} /> <span style={{fontWeight:"bold"}}> Ordered From: </span> <span style={{textTransform: "uppercase"}}>{this.props.order_history.name}</span> </p></Card.Text>
              <Card.Text><FontAwesomeIcon icon={faCar} /> <span style={{fontWeight:"bold"}}> Order Type: </span> <span style={{textTransform: "uppercase"}}> <i>{this.props.order_history.ordertype}</i></span></Card.Text>
              <Card.Text><FontAwesomeIcon icon={faHourglass} /><span style={{fontWeight:"bold"}}> Order Status: </span> <span style={{textTransform: "uppercase"}}> <i>{this.props.order_history.orderstatus}</i></span></Card.Text>
              <Card.Text><FontAwesomeIcon icon={faClock} /><span style={{fontWeight:"bold"}}> Order Time: </span> <span style={{textTransform: "uppercase"}}> <i>{this.props.order_history.datetime}</i></span></Card.Text>
            </Card.Body>
          </Col>

        </Row>
      </Card>
</div>
    );
}

}
export default HistoryCard;