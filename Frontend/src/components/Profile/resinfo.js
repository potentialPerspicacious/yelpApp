import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.png';
import Navbar from '../Navigationbar/Navbar'
import { Container, Col, Row, Form, Button, ButtonGroup, Card, Image} from 'react-bootstrap';
import userImageSrc from '../../images/resimage.jpg';
import {Modal} from 'react-bootstrap'

class Resinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
        
        };
    }

    componentWillMount() {
        axios.get(`/profile/restaurant/${localStorage.getItem("user_id")}`)
        .then(response => 
            {this.setState({
                    profile: (response.data) 
                    
                }); 
            })
            

    }
    editProfile= () => {
        window.location = '/editProfile'
   }

    render(){
        let details = this.state.profile
        console.log(details)
        return(
            <div>
                
            <Container fluid={true}>
                <Row>
                    <Col xs={6} md={4}>
                                <div class="card" style={{ width: '80rem' }}>
                            <div class="card-body">
                                <div>

                                <Image src={userImageSrc} alt="Avatar" style={{ width: '100%' }}/> <button class="btn btn-default edit" onClick={this.editProfile}><i class="glyphicon glyphicon-pencil"></i></button>
                            <h2 class="card-title restitle at">{details.name} </h2></div>
                            <h5 class="card-subtitle mb-2 text-muted restitle">  {details.cusine} </h5>
                            <h5 class="card-subtitle mb-2 text-muted restitle tab"> <span className="glyphicon glyphicon-map-marker"> </span> {details.location}{' - '} {details.zipcode} <span className="glyphicon glyphicon-earphone cmargin"> </span>  {details.contact} <span className="glyphicon glyphicon-envelope cmargin"> </span>  {details.email} </h5>
                            <h5 class="card-subtitle mb-2 text-muted restitle tab"> <span className="glyphicon glyphicon-time"> </span> {details.timings} </h5>
                            <p class="card-text restitle">{details.description}</p>
                            <a href="#" class="card-link restitle reviewbutton btn btn-info btn-sm">Reviews</a>
                            <a href="#" class="card-link restitle linkmargin btn btn-info btn-sm">Orders</a>
                            <a href="#" class="card-link restitle linkmargin btn btn-info btn-sm">Events</a>
                            <br />
                            </div>
                            </div>
                        </Col>
                        </Row>
                    </Container>
                    
                </div>
        )
    }
    }


export default Resinfo