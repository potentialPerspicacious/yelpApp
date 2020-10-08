import React, { Component } from "react";
import axios from "axios";
import EventsCard from "./eventsCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faIdCard, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import logo from '../../images/logo.png';


class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event_items: [],
            status: {}
        };

        this.events = this.events.bind(this);
        this.getEvents();
    }


    getEvents = () => {
        if (localStorage.getItem("isOwner")==='on'){
        axios.get(`http://localhost:3001/restaurant/getEvents/${localStorage.getItem("user_id")}`)
            .then(response => {
                    this.setState({
                        event_items: this.state.event_items.concat(response.data),
                        status: (response.data[0].STATUS)
                    });
            })
        } else {
            axios.get(`http://localhost:3001/restaurant/getEvents/${localStorage.getItem("resID")}`)
            .then(response => {
                    this.setState({
                        event_items: this.state.event_items.concat(response.data),
                        status: (response.data[0].STATUS)

                    });
            })

        }
    };

    events = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.event_items && this.state.event_items.length > 0) {
            items = this.state.event_items
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    item = <EventsCard event_items={items[i]}/>;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    };
    render() {
        let message = null,
        navSearch = null,
            section,
            renderOutput = [];
        console.log(this.state.status)
        if (this.state.status === 'EVENTS_PRESENT') {
            if (this.state && this.state.event_items && this.state.event_items.length > 0) {
                section = this.events(this.state.event_items);
                renderOutput.push(section);
                    }
        } else {
            renderOutput.push(<div><span> <p style={{color:'red'}}> No Events.</p></span></div>)
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
                        <h4 style={{color:'red'}}> Your Events</h4>
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

export default Events;