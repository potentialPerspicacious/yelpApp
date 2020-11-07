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
        axios.get(`${backendServer}/messages/getMessages/${localStorage.getItem('cusID')}/${localStorage.getItem('resID')}`)
            .then(response => {
                    this.setState({
                        message_items: this.state.message_items.concat(response.data),
                        status: (response.data[0])
                    });
            })
    };

    messages = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.message_items && this.state.message_items.length > 0) {
            items = this.state.message_items
            if (items.length > 0) {
                for (var i = 1; i < items.length; i++) {
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
        let section, renderOutput = [];
        if (this.state.status === 'MESSAGES_PRESENT') {
            if (this.state && this.state.message_items && this.state.message_items.length > 0) {
                section = this.events(this.state.message_items);
                renderOutput.push(section);
                    }
        } else {
            renderOutput.push(<div><span> <p style={{color:'red'}}> Start Your Conversation.</p></span></div>)
        }
        return(
            <div>
                <div class='row' style={{ marginLeft:"30px", marginTop:"2cm"}}>
                <div class='col-xs-2' style={{textAlign: "left", height: "100%", borderLeft: "1px solid #e6e6e6", marginTop:"0.85cm", marginLeft: "0cm"}}>
                    <div style={{marginLeft: "20px"}}>
                        <h4 style={{color:'red'}}> Message History</h4>
                        <hr />
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