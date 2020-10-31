import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCamera, faEdit, faIdCard, faPhoneAlt, faGenderless, faAddressCard, faBirthdayCake, faCity} from "@fortawesome/free-solid-svg-icons";
import { CardImg, Card } from "react-bootstrap";
import Banner from '../Navigationbar/banner';
import backendServer from "../../webConfig"




class Cusinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileBasic: {},
            profileAdv: {}
        
        };
    }

    componentWillMount() {
        if (localStorage.getItem("isOwner")=== "off"){
        axios.get(`/profile/customer/${localStorage.getItem("user_id")}`)
        .then(response => 
            {this.setState({
                profileBasic: response.data,
                profileAdv: response.data.profileInfo 
                    
                }); 
            })
        } else if (localStorage.getItem("isOwner")=== "on"){
            axios.get(`/profile/customer/${localStorage.getItem("cusID")}`)
            .then(response => 
                {this.setState({
                    profileBasic: response.data,
                    profileAdv: response.data.profileInfo
                        
                    }); 
                })
        }
            

    }
    render(){
        var proBasic = this.state.profileBasic;
        var proAdv = this.state.profileAdv;
        delete proBasic.profileInfo;
        // delete proAdv._id
        var details = Object.assign(proBasic, proAdv)
        let edit = null
        var imageSrc;
        if (this.state) {
            imageSrc = `${backendServer}/images/user/${details.image}`;
        }
        if (localStorage.getItem("isOwner")=== "off") {
            edit =  (<li>
                <a href='/editCprofile'>
                    <span className="navicon">
                    <FontAwesomeIcon icon={faEdit} />
                    </span>
                </a>
            </li>)
        } else if (localStorage.getItem("isOwner")=== "on") {
            edit = null
        }
        return(
            <div>
                <Banner />
            <div style={{marginTop:"0cm"}}>
                    <div class='row'>
                            <CardImg style={{marginLeft: "1cm", width: "6cm", height:"6cm"}} variant="left" src={imageSrc} alt="IMG">
                            </CardImg>
                        <div class='col-xs-4' style={{marginTop: "2cm", marginLeft: "2cm"}}>
        <h3 className='at'>{details.fname}  {details.lname}</h3>
                            <h6> "{details.headline}" </h6>
        <p style={{fontSize:"13px"}}>  <FontAwesomeIcon icon={faCity} />  {details.city}</p>
                            
                        </div>
                        
                        <div class='col-xs-4' style={{marginTop: "2.2cm", marginLeft: '7cm'}}>
                            <ul class='list-unstyled'>
                                <li>
                                </li>
     {edit}
                            </ul>
                        </div>
                    </div>

            <div class='row' style={{ marginLeft:"0px"}}>
                <div class='col-xs-3' style={{marginLeft: "40px", marginTop:"1cm"}}>
                    <h4 style={{color:'red'}}> Basic Information</h4>
                    <hr />
                    <h6 style={{margin:"0px"}}> Contact Information</h6>
                    <p> <FontAwesomeIcon icon={faPhoneAlt} style={{ height: "3mm", verticalAlign: "top", marginTop:"1.8mm"}} /> {details.contact}</p>
                    <h6 style={{margin:"0px"}}> Gender </h6>
                    <p> <FontAwesomeIcon icon={faGenderless} style={{ height: "3mm", verticalAlign: "top", marginTop:"1.8mm"}} /> {details.gender} </p>
                    <h6 style={{margin:"0px"}}> Address</h6>
                    <p> <FontAwesomeIcon icon={faAddressCard} style={{ height: "3mm", verticalAlign: "top", marginTop:"1.8mm"}}/> {details.address} - {details.zipcode}</p>
                    <h6 style={{margin:"0px"}}> Birthday </h6>
        <p> <FontAwesomeIcon icon={faBirthdayCake} style={{ height: "3mm", verticalAlign: "top", marginTop:"1.8mm"}}/> {details.month}/{details.date}/{details.year}</p>
                </div>
                <div class='col-xs-12' style={{textAlign: "left", height: "100%", borderLeft: "1px solid #e6e6e6", marginTop:"0.85cm", marginLeft: "2.5cm"}}>
                    <div style={{marginLeft: "10px"}}>
                        <h3 style={{color:'red'}}> About</h3>
                        <hr />
                        <h6 style={{margin:"0px"}}> Nickname </h6>
                        <p> {details.nickname}</p>
                        <h6 style={{margin:"0px"}}> Yelping since </h6>
                        <p> {details.yelptime}</p>
                        <h6 style={{margin:"0px"}}> When I am not yelping... </h6>
                        <p> {details.about} </p>
                        <h6 style={{margin:"0px"}}> Things I love </h6>
                        <p> {details.hobbies}</p>
                        <h6 style={{margin:"0px"}}> My Blog or Website</h6>
                        <p><a href={details.social}>{details.social}</a></p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        
        )
    }
    }


export default Cusinfo