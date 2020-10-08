import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import Banner from '../Navigationbar/banner'
import {Row, Col, Button} from 'react-bootstrap'



class Creview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: {},
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    cancelReview = () => {
        window.location = '/restaurantPage'
    }

    submitReview = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            reviews: this.state.reviews,
        }
        axios.post(`/restaurant/review/${localStorage.getItem("user_id")}/${localStorage.getItem("resID")}`, data)
            .then(response => 
                {this.setState({
                    status: (response.data) 
                        
                    }); 
                })
    }

    render (){
        let success = {
            message: null
        }
        if(this.state.status == 'REVIEW_ADDED'){
            success.message = 'Successfully reviewed the restaurant.'
            console.log('Success')
            setTimeout(function() {window.location = '/restaurantPage'}, 1000);
        } 
        return(
            <div>
                <Banner />
            <center>
            <div className="form">
                            <div class="login-form signupform">
                            <div class="main-div signupform">
                        <div class="panel ">
                            <h2>Restaurant Review</h2>
                        </div>
                        <br/>
                        <br/>
                        <div class="row">
                        <label class="label-form"> Add review to this restaurant</label>
                                <input type="text" class="form-control textbox" name="reviews" placeholder="Review" style={{color:"black"}} onChange = {this.onChange}/>
                            </div>
                            <br />
                            <br />
                            <Row >
                                <Col s='3'>
                                    <Button variant="outline-danger" onClick = {this.submitReview}>Add Review</Button>
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

export default Creview