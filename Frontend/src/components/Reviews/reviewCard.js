import React, { Component} from "react";
import { Card, Row, Col } from "react-bootstrap";


class ReviewCard extends Component {
setCusID = () => {
        localStorage.setItem("cusID", this.props.order_history.cusID)
    }
render() {
    return (
<div>
<Card bg="white" style={{ width: "20rem", margin: "1%" }}>
        <Row>
          <Col align="left" style={{marginLeft:"0mm"}}>
            <Card.Body>
              <Card.Text><p>{this.props.review_items.reviews}</p></Card.Text>
              <br />
              <br />
              <br />
              <Card.Text><small style={{color:"gray"}}>Reviewd by: <span style={{textTransform:"uppercase"}}>
        {this.props.review_items.fname} </span></small> 
        <span style={{marginLeft:"2.5cm"}}>
          <small style={{color:"gray"}}>
            Rating: {this.props.review_items.ratings}/5
          </small>
        </span>
        
        </Card.Text>             </Card.Body>
          </Col>
        </Row>
      </Card>
</div>
    );
}

}
export default ReviewCard;