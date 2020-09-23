import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Banner from '../Navigationbar/banner'
import TimePicker from 'react-bootstrap-time-picker';
import ImageUploader from 'react-images-upload';


class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pictures: [] , 
            profile: {}, 
            starttime: '7:00',
            closetime: '7:00'
        }
        
        this.onDrop = this.onDrop.bind(this);
    }
    onChangeStartTime = starttime => this.setState({ starttime })
    onChangeCloseTime = closetime => this.setState({ closetime })

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    goBack= () => {
        window.location = '/rhome'
   }
   onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
}

componentWillMount() {
    axios.get(`/profile/restaurant/${localStorage.getItem("user_id")}`)
    .then(response => 
        {console.log(response.data)
            this.setState({
                profile: (response.data) 
                
            }); 
        })
        

}

    updateProfile = (e) => {
        //prevent page from refresh
        e.preventDefault();
        let details = this.state.profile
        const data = {
            rname: this.state.rname || details.name,
            email: this.state.email || details.email,
            zipcode: this.state.zipcode || details.zipcode,
            address: this.state.address || details.location,
            contact: this.state.contact || details.contact,
            cusine: this.state.cusine || details.cusine,
            description: this.state.description || details.description,
            timings: this.state.timings || details.timings,
            // starttime: this.state.starttime || details.starttime,
            // closetime: this.state.closetime || details.closetime
        }
        const error = {
            message: null
        }
        const success = {
            message: null
        }
        console.log(data)
        console.log(localStorage.getItem("user_id"))
        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:3001/restaurant/editProfile/${localStorage.getItem("user_id")}`, data)
            .then(response => {
                if(response.data == "USER_UPDATED"){
                    success.message = "Successfully update the profile."
                    this.setState({success})
                    setTimeout(function(){
                        window.location = '/rhome'}, 1000)
                    
                } 
                if(response.data === 'PROFILE_NOT_UPDATED'){
                    error.message = "Unable to update the profile."
                    this.setState({error})
                    setTimeout(function(){
                        window.location = "/editProfile";
                       },1500);
                       
                }
            });
    }
    render(){
        let error = this.state.error;
        let success = this.state.success;
        let details = this.state.profile;
        return(
            <div>
                <Banner/>
                <center>
            <div className="form">
                       <div class="login-form signupform">
                       <div class="main-div signupform">
                   <div class="panel ">
                       <h2>Edit Your Yelp Profile</h2>
                   </div>
                   <br />
        
                   <div class="form-group">
                       <label class="label-form"> Upload/Change your image</label>
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
                       <label class="label-form"> Edit your restaurant name</label>
                           <input defaultValue={details.name} onChange = {this.onChange} type="name" class="form-control" name="rname" placeholder="Restaurant Name" style={{color:"black"}} />
                       </div>
                       <div class="form-group">
                       <label class="label-form"> Edit your email</label>
                           <input onChange = {this.onChange} type="email" class="form-control" name="email" placeholder="Email" style={{color:"black"}} defaultValue={details.email}/>
                       </div>
                       <div class="form-group">
                       <label class="label-form"> Add/Edit your address</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="address" placeholder="Address" style={{color:"black"}} defaultValue={details.location}/>
                       </div>
                       <div class="row">
                       <div class="form-group col-md-6">
                       <label class="label-form"> Edit your zipcode</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="zipcode" placeholder="Zipcode" style={{color:"black"}} defaultValue={details.zipcode}/>
                       </div>

                       <div class="form-group col-md-6">
                       <label class="label-form"> Add/Edit contact number</label>
                           <input onChange = {this.onChange}  type="name" class="form-control" name="contact" placeholder="Contact" style={{color:"black"}} defaultValue={details.contact}/>
                       </div>
                       </div>
                       <div class="form-group">
                       <label class="label-form"> Add/Edit restaurant timings</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="timings" placeholder="Timings" style={{color:"black"}} defaultValue={details.timings}/>
                       </div>

                       {/* <div class="row">
                       <div class="form-group col-md-6">
                       <label class="label-form ">Add/Edit opening time</label>
                       <TimePicker onChange={this.onChangeStartTime} start="7:00" end="23:00" step={30} value={this.state.starttime}/>
                        </div>
                        <div class="form-group col-md-6">
                       <label class="label-form">Add/Edit closing time</label>
                       <TimePicker onChange={this.onChangeCloseTime} start="7:00" end="23:00" step={30} value={this.state.closetime}/> </div>
                       </div> */}
                       <div class="form-group">
                       <label class="label-form"> Add/Edit your cusine type</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="cusine" placeholder="Cusines" style={{color:"black"}} defaultValue={details.cusine}/>
                       </div>
                       <div class="form-group desadd">
                       <label class="label-form"> Add/Edit your restaurant description</label>
                           <input onChange = {this.onChange} type="name" class="form-control" name="description" placeholder="About Restaurant" style={{color:"black"}} defaultValue={details.description}/>
                       </div>

                       <div class="row">
                        <div class="col-md-6">
                       <button class="btn btn-secondary col-md-6" onClick = {this.updateProfile}>Update</button>  
                       </div>
                       <div class="col-md-6">
                       <button class="btn btn-primary col-md-6" onClick = {this.goBack}>Cancel</button> 
                       </div> 
                        </div>
                        {error && <div className='alert alert-danger'>{error.message}</div>}
                        {success && <div className='alert alert-success'>{success.message}</div>}
                        </div>
                    </div>
                    </div>
                    </center>

        </div>
        )
    }
}

export default EditProfile
