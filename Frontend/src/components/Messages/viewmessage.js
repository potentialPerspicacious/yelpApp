import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import Banner from '../Navigationbar/banner'
import {Row, Col, Button} from 'react-bootstrap'
import backendServer from "../../webConfig"
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import MessageHisCard from './messageHistoryCard'
import ChatBubble from 'react-chat-bubble';



class ViewMessage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            message_items: [],

        }
        this.messages = this.messages.bind(this);
        this.getMessages();
    }
    getMessages = () => {
        if(localStorage.getItem("isOwner") === "on"){
        axios.get(`${backendServer}/messages/getMessages/${localStorage.getItem('cusID')}/${localStorage.getItem('user_id')}`, {
            headers: { Authorization: `JWT ${cookie.load("token")}` }})
            .then(response => {
                    this.setState({
                        message_items: this.state.message_items.concat(response.data),
                        status: (response.data)
                    });
            })
        } else if(localStorage.getItem("isOwner") === "off"){
            axios.get(`${backendServer}/messages/getMessages/${localStorage.getItem('user_id')}/${localStorage.getItem('resID')}`, {
                headers: { Authorization: `JWT ${cookie.load("token")}` }})
            .then(response => {
                    this.setState({
                        message_items: this.state.message_items.concat(response.data),
                        status: (response.data)
                    });
            })
        }
    }

    messages = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.message_items && this.state.message_items.length > 0) {
            items = this.state.message_items
            console.log(items)
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    item = <MessageHisCard message_items={items[i]}/>;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    };
    render(){
        let success = {
            message: null
        }
        console.log(this.state.message_items)
        let section, renderOutput = [];
        if (this.state.status === 'NO_MESSAGES') {
            renderOutput.push(<div><span> <p style={{color:'red'}}> Start Your Conversation.</p></span></div>)

        } else {
            if (this.state && this.state.message_items && this.state.message_items.length > 0) {
                section = this.messages(this.state.message_items);
                console.log(section)
                renderOutput.push(section);
                    }
        }
        return(
            <div>
                <div class='' style={{ marginLeft:"30px", marginTop:"2cm"}}>
                <div class='' style={{textAlign: "left", height: "100%", borderLeft: "1px solid #e6e6e6", marginTop:"0.85cm", marginLeft: "0cm"}}>
                    <div style={{marginLeft: "20px"}}>
                        <h4 style={{color:'red'}}> Message History</h4>
                        <hr />
                        {/* <ChatBubble messages = {this.state.message_items} /> */}
                        {renderOutput}
                       {/* <p style={{color:"red", align:"center"}}> Please Add Items to Shopping Bag Before Proceeding</p>            */}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default ViewMessage