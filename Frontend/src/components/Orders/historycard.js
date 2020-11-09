import { faBuilding, faCar, faClock, faHourglass, faList, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import React, { Component, Item} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, Row, Col } from "react-bootstrap";
import backendServer from "../../webConfig"


class HistoryCard extends Component {
render() {
  {this.props.order_history.dishes.map(item => {
    console.log(item)

  })
  }
   let menuList = (
     <div>
  {this.props.order_history.dishes.map(item => {
    <ul>
      item
    </ul>
  })
  }
     </div>
)
  console.log(this.props.order_history)
  var imageSrc;
  if (this.props) {
      imageSrc = `${backendServer}/images/restaurant/${this.props.order_history.image}`;
  }
    return (
<div>
<Card bg="white" style={{ width: "50rem", margin: "2%", height:"15rem" }}>
        <Row>
          <Col xs="4.5">
            <Card.Img style={{marginLeft:"4mm", width: "15rem", height: "15em" }} src={imageSrc} />
          </Col>
          <Col align="left" style={{marginLeft:"0mm"}}>
            <Card.Body>
            <Card.Title>Order From - <span style={{textTransform: "uppercase"}}>{this.props.order_history.name}</span></Card.Title>
              {/* <Card.Text><p><FontAwesomeIcon icon={faBuilding} /> <span style={{fontWeight:"bold"}}> Ordered From: </span> <span style={{textTransform: "uppercase"}}>{this.props.order_history.name}</span> </p></Card.Text> */}
              <Card.Text><FontAwesomeIcon icon={faCar} /> <span style={{fontWeight:"bold"}}> Order Type: </span> <span style={{textTransform: "uppercase"}}> <i>{this.props.order_history.ordermode}</i></span></Card.Text>
              <Card.Text><FontAwesomeIcon icon={faHourglass} /><span style={{fontWeight:"bold"}}> Order Status: </span> <span style={{textTransform: "uppercase"}}> <i>{this.props.order_history.orderstatus}</i></span></Card.Text>
              {/* <Card.Text><FontAwesomeIcon icon={faClock} /><span style={{fontWeight:"bold"}}> Order Time: </span> <span style={{textTransform: "uppercase"}}> <i>{this.props.order_history.datetime}</i></span></Card.Text> */}
              <Card.Text><FontAwesomeIcon icon={faList} /><span style={{fontWeight:"bold"}}> Ordered Item/s: </span> <span style={{textTransform: "uppercase"}}> <li>{this.props.order_history.dishes}</li></span></Card.Text>

            </Card.Body>
          </Col>

        </Row>
      </Card>
</div>
    );
}

}
export default HistoryCard;