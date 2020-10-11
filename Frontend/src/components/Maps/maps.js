import React, { Component} from "react";
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";
import axios from 'axios'
import backendServer from "../../webConfig"




class Maps extends Component {
    constructor(props) {
        super(props);  
        this.state = {
            center: {
                lat: parseFloat(localStorage.getItem('lat')),
                lng: parseFloat(localStorage.getItem('lng'))
            },
            locations : [],
            zoom: 11,
            }
           
    this.geoCode = this.geoCode.bind(this);
    this.getLocations();
                };


    getLocations = () => {
        console.log(localStorage.getItem("mapsFilter"))
        if(localStorage.getItem("mapsFilter") !== ('no_filter')){
            axios.get(`${backendServer}/search/locationsFilter/${localStorage.getItem("find")}/${localStorage.getItem("location")}/${localStorage.getItem("mapsFilter")}`)
            .then(response => {
                    this.setState({
                        locations: this.state.locations.concat(response.data)
                    });
            })
        } else {
        axios.get(`${backendServer}/search/locations/${localStorage.getItem("find")}/${localStorage.getItem("location")}`)
        .then(response => {
                this.setState({
                    locations: this.state.locations.concat(response.data)

                });
        })
    }
    }

    geoCode = (map, maps) => {
        var items, markersRender = [], loc;
        Geocode.setApiKey("AIzaSyBb6kf0iPAJGUKRKRW8bXU85u4RNuhSja0");     
        Geocode.setLanguage("en");
        Geocode.setRegion("en");
        Geocode.enableDebug();
        if (this.state && this.state.locations && this.state.locations.length > 0) {
            items = this.state.locations
            console.log(items)
        }
        if(items.length > 0){
            for (var i = 0; i < items.length; i++) {
                loc = items[i].location
                console.log((items[i].location))
                Geocode.fromAddress(loc).then(
                    response => {
                        const { lat, lng } = response.results[0].geometry.location;
                        let pos = {
                            lat: lat,
                            lng: lng
                        }
                        let marker = this.renderMarkers(map, maps, pos)
                        markersRender.push(marker);

                    },
                  );
               
            }
        }
    
        return markersRender
        
    }
    renderMarkers = (map, maps, pos) => {
             let marker = new maps.Marker({
             position: { lat: pos.lat, lng: pos.lng },
             map,
             });
             return marker;
            };     

    render(){

        return (
            <div style={{ height: '60vh', width: '500%' }}>
                
                <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBb6kf0iPAJGUKRKRW8bXU85u4RNuhSja0'}}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {this.geoCode(map, maps)}}
          >
          </GoogleMapReact>

            </div>
        )
    }
}

export default Maps