import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Share extends Component{
    goBack = () => {
        window.history.go(-1)
    }
    render(){
        return(
            <div>
                <p style={{color:"red", marginLeft:"10px"}}>/***DOES NOT SUPPORT THIS FEATURE YET***/ <Button variant='link' onClick={this.goBack} style={{color:"black", marginLeft:"5px"}}><FontAwesomeIcon icon = {faUndo} /></Button> </p>
                
            </div>
        )
    }
}

export default Share