import React, { Component } from "react";
import axios from "axios";
import cookie from 'react-cookies'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faIdCard, faCalendarPlus, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import logo from '../../images/logo.png';
import backendServer from "../../webConfig"
import MessageCard from './messageCard'
import Banner from "../Navigationbar/banner";



class ViewMessagesFrom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message_from: [],
            status: {}, 
        };

        this.messages = this.messages.bind(this);
        this.getMessagesFrom();
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getMessagesFrom = () => {    
        axios.get(`${backendServer}/customer/messagesFrom/${localStorage.getItem('user_id')}`)
            .then(response => {
                    this.setState({
                        message_from: this.state.message_from.concat(response.data),
                        status: (response.data)
                    });
            })
    };

    messages = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.message_from && this.state.message_from.length > 0) {
            items = this.state.message_from
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    item = <MessageCard message_from={items[i]}/>;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    };
    render() {
        let message = null,
            section,
            renderOutput = [];
        console.log(this.state.status)
        if (this.state.status) {
            if (this.state && this.state.message_from && this.state.message_from.length > 0) {
                section = this.messages(this.state.message_from);
                renderOutput.push(section);
                    }
        } else {
            renderOutput.push(<div><span> <p style={{color:'red'}}> No messages for you.</p></span></div>)
        }

        return (
            <div>
                 <Banner />
            <div>
           <div class='row' style={{ marginLeft:"30px", marginTop:"2cm"}}>
                <div class='col-xs-2' style={{textAlign: "left", height: "100%", borderLeft: "1px solid #e6e6e6", marginTop:"0.85cm", marginLeft: "0cm"}}>
                    <div style={{marginLeft: "20px"}}>
                        <h4 style={{color:'red'}}> Messages From</h4>
                        <hr />
                        {renderOutput}
                       {/* <p style={{color:"red", align:"center"}}> Please Add Items to Shopping Bag Before Proceeding</p>            */}
                    </div>
                </div>
                </div>
            </div>                    
            
        </div>
  
        );
    }
}

export default ViewMessagesFrom;