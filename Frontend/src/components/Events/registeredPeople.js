import React, { Component } from "react";
import axios from "axios";
import RegisteredCard from "./registerCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faIdCard, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import logo from '../../images/logo.png';
import backendServer from "../../webConfig"



class RegisteredPeople extends Component {
    constructor(props) {
        super(props);
        this.state = {
            get_people: [],
            status: {}
        };

        this.people = this.people.bind(this);
        this.getPeople();
    }


    getPeople = () => {
        if (localStorage.getItem("isOwner")==='on'){
        axios.get(`${backendServer}/restaurant/getRegisteredPeople/${localStorage.getItem("eventid")}`)
            .then(response => {
                    this.setState({
                        get_people: this.state.get_people.concat(response.data),
                        status: (response.data[0].STATUS)
                    });
            })
        } else {
            axios.get(`${backendServer}/restaurant/getRegisteredPeople/${localStorage.getItem("eventid")}`)
            .then(response => {
                    this.setState({
                        get_people: this.state.get_people.concat(response.data),
                        status: (response.data[0].STATUS)

                    });
            })

        }
    };

    people = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.get_people && this.state.get_people.length > 0) {
            items = this.state.get_people
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    item = <RegisteredCard get_people={items[i]}/>;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    };
    render() {
        let navSearch = null,
            section,
            renderOutput = [];
        console.log(this.state.status)
        if (this.state.status === 'PEOPLE_PRESENT') {
            if (this.state && this.state.get_people && this.state.get_people.length > 0) {
                section = this.people(this.state.get_people);
                renderOutput.push(section);
                    }
        } else {
            renderOutput.push(<div><span> <p style={{color:'red'}}> No Registrations.</p></span></div>)
        }
        navSearch = (
            <div>
            <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="/">
              <img src={logo} width="90" height="45" alt="logo"/>
          </a>
                   <div class="form-group col-md-3">
                   {/* <FontAwesomeIcon icon={faBuilding} /> */}
                       <input onChange = {this.onChange} type="search" class="form-control hsearch" name="find" placeholder="Restaurant" style={{color:"black"}}/>
                   </div>
    
                   <div class="form-group col-md-3">
                   {/* <FontAwesomeIcon icon={faSearchLocation} /> */}
                       <input onChange = {this.onChange}  type="search" class="form-control hsloc" name="location" placeholder="Location" style={{color:"black"}}/>
                   </div>
                   <div class="form-group col-md-1">
                   <button class="btn btn-primary hsb" type="submit"> <FontAwesomeIcon icon={faSearch} />
                          </button></div>
    
                      <li class="nav-item">
                    <a class="nav-link navtext3" style={{marginLeft:"4.3cm"}}  href="/addevent" ><FontAwesomeIcon className="signico" icon={faCalendarPlus} /> Add Events</a>
                      </li>
                      <li class="nav-item">
                    <a class="nav-link navtext3"  href="/rhome" ><FontAwesomeIcon className="signico" icon={faIdCard} /> Profile</a>
                      </li>
      </nav>
      </div>
        )

        return (
            <div>
            {navSearch}
            <div>
           <div class='row' style={{ marginLeft:"30px", marginTop:"2cm"}}>
                <div class='col-xs-2' style={{textAlign: "left", height: "100%", borderLeft: "1px solid #e6e6e6", marginTop:"0.85cm", marginLeft: "0cm"}}>
                    <div style={{marginLeft: "20px"}}>
                        <h4 style={{color:'red'}}> People Registered</h4>
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

export default RegisteredPeople;