import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import Banner from '../Navigationbar/banner'
import {Row, Col, Button} from 'react-bootstrap'
import ImageUploader from 'react-images-upload';



class AddEvent extends Component {
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
    cancelEvent = () => {
        window.location = '/rhome'
    }

    addEvent = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            eventname: this.state.eventname,
            description: this.state.description, 
            month: this.state.month,
            date: this.state.date,
            year: this.state.year,
            time: this.state.time,
            location: this.state.location,
            hashtags: this.state.hashtags

        }
        axios.post(`/restaurant/addevent/${localStorage.getItem("user_id")}`, data)
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
        let error = {
            message: null
        }
        if(this.state.status == 'EVENT_ADDED'){
            success.message = 'Successfully added the event.'
            setTimeout(function() {window.location = '/rhome'}, 1000);
        } else if (this.state.status == 'EVENT_EXISTS'){
            error.message = 'Event already exists.'
            setTimeout(function() {window.location = '/addevent'}, 1000);
        }
        return(
            <div>
                <Banner />
            <center>
            <div className="form">
                            <div class="login-form signupform">
                            <div class="main-div signupform">
                        <div class="panel ">
                            <h2>Post Your Event</h2>
                        </div>
                        <br/>
                        <br/>
                        <br/>
        
                   <div class="form-group">
                       <label class="label-form"> Choose an image</label>
                       <br />
                       <ImageUploader
                withIcon={true}
                buttonText='Choose an image'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
                       </div>
                        <div class="form-group">
                       <label class="label-form"> Event name</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="eventname" placeholder="Event Name" style={{color:"black"}} />
                       </div>
                       <div class="form-group">
                       <label class="label-form"> Description</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="description" placeholder="Description" style={{color:"black"}} />
                       </div>
                       <div class="row">
                            <div class="form-group col-sm-4">
                            <label class="label-form"> Select Date</label>
                            <select class="form-control" onChange = {this.onChange} name="month">
                            <option selected>Month</option>
                            <option value="1">January</option>
<option value="2">Febuary</option>
<option value="3">March</option>
<option value="4">April</option>
<option value="5">May</option>
<option value="6">June</option>
<option value="7">July</option>
<option value="8">August</option>
<option value="9">September</option>
<option value="10">October</option>
<option value="11">November</option>
<option value="12">December</option>
                            </select>
                            </div>

                            <div class="form-group col-sm-4 dob-form">
                            <select class="form-control" onChange = {this.onChange} name="date">
                            <option selected>Day</option>
                            <option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
<option value="6">6</option>
<option value="7">7</option>
<option value="8">8</option>
<option value="9">9</option>
<option value="10">10</option>
<option value="11">11</option>
<option value="12">12</option>
<option value="13">13</option>
<option value="14">14</option>
<option value="15">15</option>
<option value="16">16</option>
<option value="17">17</option>
<option value="18">18</option>
<option value="19">19</option>
<option value="20">20</option>
<option value="21">21</option>
<option value="22">22</option>
<option value="23">23</option>
<option value="24">24</option>
<option value="25">25</option>
<option value="26">26</option>
<option value="27">27</option>
<option value="28">28</option>
<option value="29">29</option>
<option value="30">30</option>
<option value="31">31</option>
                            </select>
                            </div>

                            <div class="form-group col-sm-4 dob-form">
                            <select class="form-control" onChange = {this.onChange} name="year">
                            <option selected>Year</option>
<option value="2020">2020</option>
<option value="2021">2021</option>
<option value="2022">2022</option>
<option value="2023">2023</option>
<option value="2024">2024</option>
<option value="2025">2025</option>
                            </select>

                            </div>
                            </div>
                       <div class="row">
                       <div class="form-group col-md-6">
                       <label class="label-form"> Time</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="time" placeholder="Time" style={{color:"black"}}/>
                       </div>

                       <div class="form-group col-md-6">
                       <label class="label-form"> Location</label>
                           <input onChange = {this.onChange}  type="name" class="form-control" name="location" placeholder="Location" style={{color:"black"}} />
                       </div>
                       </div>
                       <div class="form-group">
                       <label class="label-form"> Hastags</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="hashtags" placeholder="Hashtags" style={{color:"black"}}/>
                       </div>
                       <Row>
                       <div class="form-group col-md-6">
                                    <Button variant="outline-danger" onClick = {this.addEvent} style={{marginTop:"1cm"}}>Add Event</Button>
                        </div>
                        <div class="form-group col-md-6">
                                <Button variant="outline-secondary" onClick = {this.cancelEvent} style={{marginTop:"1cm"}}>Cancel</Button>
</div> </Row>
                            <br />
                            <br />
                            <div>
                        {success.message && <div className='alert alert-success'>{success.message}</div>}
                        {error.message && <div className='alert alert-danger'>{error.message}</div>}

                        </div>
                        
                        </div>
                        </div>


</div>                       
            </center>
            </div>

        )
    }
}

export default AddEvent