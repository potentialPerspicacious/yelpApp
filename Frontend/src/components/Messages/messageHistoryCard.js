import { faCalendarAlt, faCity, faClock, faMapMarkerAlt, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component} from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import axios from 'axios'
import backendServer from "../../webConfig"
import ChatBubble from 'react-chat-bubble';
import cookie from "react-cookies";



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
    let chatBubble = null
    if(this.props.message_items.message_by === localStorage.getItem("name")){
        chatBubble = (
<div className="bubbleContainer right">
    <div className="bubble">
        <p style={{textDecorationColor: "black", textAlign:"right"}}>
        ~{this.props.message_items.message_by} <br />
            {this.props.message_items.msg}</p>
    </div>
    <br />
    <br />
    <br />

</div>
        )
    } else {
        chatBubble = (
            <div className="bubbleContainer left">
                <div className="bubble">
                    <p style={{textDecorationColor: "black", marginLeft:"10mm"}}>
                    ~{this.props.message_items.message_by} <br />
                        {this.props.message_items.msg}</p>
                </div>
                <br />
                <br />
                <br />
            </div>
        )
    }
    var imageSrc;
    return (
<div>
    {chatBubble}
</div>
    );
}

}
export default MessageHisCard;