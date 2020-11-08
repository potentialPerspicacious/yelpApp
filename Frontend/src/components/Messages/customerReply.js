import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import Banner from '../Navigationbar/banner'
import {Row, Col, Button} from 'react-bootstrap'
import backendServer from "../../webConfig"
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ViewMessage from '../Messages/viewmessage'
import {cus2res} from '../../actions/messages'


class CustomerReply extends Component {
    constructor(props) {
        super(props);
        this.state = { 

        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    sendMessage = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            message: this.state.message
        }
        this.props.cus2res(data)
    }
    render(){

        let success = {
            message: null
        }
        if(this.props.description == 'MESSAGE_SENT'){
            success.message = 'Message Sent.'
            setTimeout(function() {window.location = '/viewMessages'}, 1000);
        }
        return(
            <div>
                <Banner />
                <center>
            <div className="form">
                            <div class="login-form signupform">
                            <div class="main-div signupform">
                        <div class="panel ">
                        <ViewMessage />
                        </div>
                        <br/>
                        <br/>
                        <div class="row">
                        <label class="label-form"> Message</label>
                                <input type="text" class="form-control textbox" name="message" placeholder="Message here..." style={{color:"black"}} onChange = {this.onChange} required="required"/>
                            </div>
                            <br />
                            {/* <div class="row">
                        <label class="label-form"> Rate your recent dish</label>
                                <input type="number" class="form-control textbox" name="rating" placeholder="Rate from 1 - 5" style={{color:"black"}} onChange = {this.onChange} required="required"/>
                            </div> */}
                            <Row >
                                <Col s='3'>
                                    <Button variant="outline-danger" onClick = {this.sendMessage}>Send</Button>
                                </Col>
                                <Col s='3'>
                                <Button variant="outline-secondary" onClick = {this.cancelReview}>Cancel</Button>

                                </Col>
                            </Row>
                            <br />
                            <br />
                            <div>
                        {success.message && <div className='alert alert-success'>{success.message}</div>}
                        </div>
                        </div>
                        </div>


</div>                       
            </center>
            </div>
        )
    }
}

CustomerReply.propTypes = {
    sendMsg: PropTypes.func.isRequired,
    description: PropTypes.object.isRequired
}

const mapStateToProps = state => { 
    return ({
        description: state.messages.description
})};

export default connect(mapStateToProps, { cus2res })(CustomerReply);