import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Banner from '../Navigationbar/banner'
import {Row, Col} from 'react-bootstrap';
import ImageUploader from 'react-images-upload';
import { editProfile } from '../../actions/editProfile'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {Button} from 'react-bootstrap'
import backendServer from "../../webConfig"




class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pictures: [] , 
            profile: {}, 
            starttime: '7:00',
            closetime: '7:00',
        }
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
            location: this.state.location || details.location,
            contact: this.state.contact || details.contact,
            cusine: this.state.cusine || details.cusine,
            description: this.state.description || details.description,
            timings: this.state.timings || details.timings,
            dinein: this.state.dinein || details.dinein,
            takeout: this.state.takeout || details.takeout,
            ydelivery: this.state.ydelivery || details.delivery
            // starttime: this.state.starttime || details.starttime,
            // closetime: this.state.closetime || details.closetime
        }
        this.props.editProfile(data);

    }
    onImageChange = (e) => {
        this.setState({
            pictures: this.state.pictures.concat(e),
    
        });
    }
    onUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", this.state.pictures[0]);
        const uploadConfig = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        axios.post(`${backendServer}/uploads/restaurant/${localStorage.getItem("user_id")}`, formData, uploadConfig)
            .then(response => {
                alert("Image uploaded successfully!");
                this.setState({
                    fileText: "Choose file...",
                    image: (response.data)
                });
            })
            .catch(err => {
                console.log("Error");
            });
    }
    render(){
        console.log(this.state.pictures[0])
        const error = {
            message: null
        }
        const success = {
            message: null
        }
        let details = this.state.profile;
        // console.log(this.props.description)
        if(this.props.description == 'USER_UPDATED'){
            success.message = 'Successfully updated the user.'
            setTimeout(function() {window.location = '/rhome'}, 1000);
        }
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
        
                   <center>
                   <div class="form-group">
                       <label class="label-form"> Upload your dish image</label>
 <form onSubmit={this.onUpload}><br />
                                    <div class="custom-file" style={{width: "80%"}}>
                                    <ImageUploader
                withIcon={true}
                buttonText='Choose an image'
                onChange={this.onImageChange}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                name='image'
                singleImage={true}
            />                                    
            </div><br/><br/><br /><br /><br/>
                                    <Button variant='link' type="submit">Upload</Button>
                                </form>
            
                       </div></center>
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
                           <input onChange = {this.onChange} type="name" class="form-control" name="location" placeholder="Address" style={{color:"black"}} defaultValue={details.location}/>
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
                       <left>
                       <div class="form-group">

                       <label class="label-form"> Add/Edit your restaurant services</label> <br />
<ol type="a">
                       <Col align="left" style={{marginTop:"3mm"}}>
                           <li>
                        <small>Does your restaurant provide dining-in service?</small>
                       <input onChange = {this.onChange} type="radio" name= "dinein" value="dinein" placeholder="" style={{marginLeft:"9.35mm"}}/> <small>Yes</small>
                       <input onChange = {this.onChange} type="radio" name= "dinein" value="no" placeholder="" style={{marginLeft:"3mm"}}/> <small>No</small>
                       </li>
                       </Col>
                       
                       <Col align="left" style={{marginTop:"3mm"}}>
                           <li>
                        <small>Does your restaurant provide take out service?</small>
                       <input onChange = {this.onChange} type="radio" name= "takeout" value="takeout" placeholder="" style={{marginLeft:"10.5mm"}}/> <small>Yes</small>
                       <input onChange = {this.onChange} type="radio" name= "takeout" value="no" placeholder="" style={{marginLeft:"3mm"}}/> <small>No</small>
                       </li>
                       </Col>
                       <Col align="left" style={{marginTop:"3mm"}}>
                           <li>
                        <small>Does your restaurant provide yelp delivery service?</small>
                       <input onChange = {this.onChange} type="radio" name= "ydelivery" value="ydelivery" placeholder="" style={{marginLeft:"3.35mm"}}/> <small>Yes</small>
                       <input onChange = {this.onChange} type="radio" name= "ydelivery" value="no" placeholder="" style={{marginLeft:"3mm"}}/> <small>No</small>
                       </li>
                       </Col>
                       </ol>
                                              </div>
                                              </left>
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
                        {error.message && <div className='alert alert-danger'>{error.message}</div>}
                        {success.message && <div className='alert alert-success'>{success.message}</div>}
                        </div>
                    </div>
                    </div>
                    </center>

        </div>
        )
    }
}
EditProfile.propTypes = {
    editProfile: PropTypes.func.isRequired,
    description: PropTypes.object.isRequired
}

const mapStateToProps = state => { 
    return ({
        description: state.edit.description
})};
export default connect(mapStateToProps, { editProfile })(EditProfile);
