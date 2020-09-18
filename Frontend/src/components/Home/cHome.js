import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import  Navbar  from '../Navigationbar/Navbar';
import logo from '../../images/logo.png';
import {Link} from 'react-router-dom';


class cHome extends Component {
    constructor(){
        super();
        this.state = {  
            books : []
        }
    }  
    //get the books data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/home')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    books : this.state.books.concat(response.data) 
                });
            });
        
    }
    render(){
        //iterate over books to create a table row

        //if not logged in go to login page
        let redirectVar = null;
        // if(!cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/login"/>
        // } else {
        //     redirectVar = <Redirect to = "/chome"/>
        // }
        return(
            <div>
                {/* {redirectVar} */}
                <div className="bg">
              <Navbar />
              <li><Link to='/'><img src={logo} className="logo" alt="logo" /> </Link></li>
            </div>
            </div> 
        )
    }
}
//export Home Component
export default cHome;