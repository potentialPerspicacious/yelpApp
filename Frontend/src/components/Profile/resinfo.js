import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { UserProfileNavBar, UserProfileJumbo, NavList, Form, Button, MDBInput, Carousel, Row} from 'react-bootstrap';
import rest1 from '../../images/rest1.jpg'
import rest2 from '../../images/rest2.jpg'
import food1 from '../../images/food1.jpg'
import food2 from '../../images/food2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus ,faCartArrowDown, faUtensils, faCamera, faShareAlt, faMapMarkerAlt, faClock, faStar, faStarHalf, faPhoneAlt, faEnvelope, faCheck, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import Menu from '../Menu/Menu'

class Resinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
        
        };
    }

    componentWillMount() {
        if (localStorage.getItem("isOwner")==='on'){
            axios.get(`/profile/restaurant/${localStorage.getItem("user_id")}`)
            .then(response => 
                {this.setState({
                        profile: (response.data) 
                        
                    }); 
                })
        } else {
            axios.get(`/profile/restaurant/${localStorage.getItem("resID")}`)
            .then(response => 
                {this.setState({
                        profile: (response.data) 
                        
                    }); 
                })
        }

    }
    editProfile= () => {
        window.location = '/editProfile'
   }

    render(){
        let icon = null, 
        order = null,
        editIcon = null;
if (localStorage.getItem("isOwner")==="on"){
    order = <Button href = '/rorders' style = {{backgroundColor: "red", fontSize: "20px", border: '1px solid red', color: "white"}} variant="link">Orders  <FontAwesomeIcon className="" icon={faCartArrowDown} style={{height:"4.5mm", position:"center"}} /> </Button>

    icon = <a href="/menu/addItem"> <FontAwesomeIcon className="" icon={faPlus} style={{color: "black", marginTop:"1mm", marginLeft: "19.15cm"}} /></a>
    editIcon =  <a href="/editProfile"> <FontAwesomeIcon className="" icon={faEdit} style={{color: "black", marginTop:"5mm", marginLeft: "18.2cm"}} /></a>
} else {
    icon = null;
    editIcon = null;
    order = <Button href = '/corders' style = {{backgroundColor: "red", fontSize: "20px", border: '1px solid red', color: "white"}} variant="link">Orders  <FontAwesomeIcon className="" icon={faCartArrowDown} style={{height:"4.5mm", position:"center"}} /> </Button>

}
        let details = this.state.profile
        // console.log(details)
        return(
            <div className='container-fluid' >
            <Carousel style={{width:"850px"}}>
                <Carousel.Item style={{'height':"400px", margin:"0"}} >
                    <img style={{'height':"500px"}} className="w-100" src={rest1} />
                </Carousel.Item>
                <Carousel.Item style={{'height':"400px"}}>
                    <img style={{'height':"500px"}} className="w-100" src={rest2}/>
                </Carousel.Item>
                <Carousel.Item style={{'height':"400px"}}>
                    <img style={{'height':"500px"}} className="d-block w-100" src={food1}/>
                </Carousel.Item>
                <Carousel.Item style={{'height':"400px"}}>
                    <img style={{'height':"500px"}} className="d-block w-100" src={food2}/>
                </Carousel.Item>
            </Carousel>  
                   <div class="row">
                   <div class="col-xs-4" style={{marginLeft: "50px", textAlign: "top"}}>
                       <br />
        <Row><h1 style={{fontWeight: "bolder", margin:"4mm", textTransform:"uppercase"}}> {details.name}</h1> {editIcon}</Row>
        <FontAwesomeIcon className="" icon={faUtensils} />{'  '}{details.cusine}
        <br/>
        <FontAwesomeIcon className="" icon={faStar} style={{color: "red"}} />
        <FontAwesomeIcon className="" icon={faStar} style={{color: "red"}} />
        <FontAwesomeIcon className="" icon={faStar} style={{color: "red"}} />
        <FontAwesomeIcon className="" icon={faStar} style={{color: "red"}} />
        <FontAwesomeIcon className="" icon={faStarHalf} style={{color: "red"}} />
        <br />
                       <br />
        <p> <FontAwesomeIcon className="" icon={faMapMarkerAlt} />{'  '}{details.location}{' - '} {details.zipcode}</p>
        <p> <FontAwesomeIcon className="" icon={faPhoneAlt} />{'  '}{details.contact}<span style={{marginLeft:"2cm"}}></span> <FontAwesomeIcon className="" icon={faEnvelope} />{'   '}{details.email}</p>
                       <div style={{overflow: "hidden"}}>
                           <p style={{float: "left", color: "green"}}>Open</p>
        <p style={{float: "left", marginLeft: "10px"}}><FontAwesomeIcon className="" icon={faClock} />{'   '}{details.timings}</p>
                       </div>
                       <div>
                           <p style={{float: "left"}}> <FontAwesomeIcon className="" icon={faCheck} style={{color: "green"}}/> Take out</p>
                           <p style={{float: "left", marginLeft: "10px"}}> <FontAwesomeIcon className="" icon={faCheck} style={{color: "green"}}/> Delivery</p>
                       </div>
                       <br />
                       <br />
                       <div class="inline-block">
                        {order}
                       <Button href = '/add-photo' style = {{backgroundColor: "transparent", fontSize: "20px", border: '1px solid black', color: 'black'}} variant="link"> Events   <FontAwesomeIcon className="" icon={faCalendarPlus} style={{height:"5mm", position:"center"}} /></Button> {' '}
                       <Button href = '/share' style = {{backgroundColor: "transparent", fontSize: "20px", border: '1px solid black', color: 'black'}} variant="link"> Share <FontAwesomeIcon className="" icon={faShareAlt} style={{height:"4mm", position:"center"}} /></Button>
                       </div>

                       <hr />
        <Row><h3 style={{marginLeft:"3.5mm"}}> Menu </h3> {icon}</Row>
                       <Menu />
                       <h6> </h6>
                       <br />

                       <br/>
                       <hr />
                       <h4> Review Hightlights</h4>
                       <br />
                   </div>
                   </div>
                </div>
        
        )
    }
    }


export default Resinfo