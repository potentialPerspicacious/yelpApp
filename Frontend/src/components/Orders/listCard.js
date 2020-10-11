import React, { Component} from "react";
import { Card, Row, Col } from "react-bootstrap";
import backendServer from "../../webConfig"



class ListCard extends Component {
render() {
  var imageSrc;
  if (this.props) {
      imageSrc = `${backendServer}/images/item/${this.props.order_items.image}`;
  }
    return (
<div>
<Card bg="white" style={{ width: "50rem", margin: "2%" }}>
        <Row>
          <Col>
            <Card.Img style={{ width: "15rem", height: "16em" }} src={imageSrc} />
          </Col>
          <Col align="left" style={{marginLeft:"0mm"}}>
            <Card.Body>
              <Card.Title>{this.props.order_items.name}</Card.Title>
              <Card.Text><p>Cusine: {this.props.order_items.category}</p></Card.Text>
              <Card.Text><p>Ingredients: {this.props.order_items.ingredients}</p></Card.Text>
              <Card.Text>Price: ${this.props.order_items.price}</Card.Text>
              <Card.Text>Quantity: <i style={{marginLeft:"2mm"}}> x{this.props.order_items.quantity} </i></Card.Text>

            </Card.Body>
          </Col>

        </Row>
      </Card>
</div>
    );
}

}
export default ListCard;