import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Banner from '../Navigationbar/banner'
import TimePicker from 'react-bootstrap-time-picker';
import ImageUploader from 'react-images-upload';


class EditItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pictures: [] , 
            dish: {}, 
        }
        
        this.onDrop = this.onDrop.bind(this);
    }

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
    axios.get(`/menu/editItem/${localStorage.getItem("dishID")}`)
    .then(response => 
        {
            this.setState({
                dish: (response.data) 
                
            }); 
        })
        

}

updatedish = (e) => {
    console.log("OKK")
        //prevent page from refresh
        e.preventDefault();
        let details = this.state.dish
        const data = {
            name: this.state.name || details.name,
            category: this.state.category || details.category,
            ingredients: this.state.ingredients || details.ingredients,
            description: this.state.location || details.description,
            price: this.state.price || details.price
        }
        axios.post(`http://localhost:3001/menu/updateItem/${localStorage.getItem("dishID")}`, data)
        .then(response => {
            this.setState({
                msg: (response.data)
            });
        })

    }
    render(){
        let message = this.state.msg
        const error = {
            message: null
        }
        const success = {
            message: null
        }
        let details = this.state.dish;
        // console.log(this.props.description)
        if(message == 'ITEM_UPDATED'){
            success.message = 'Successfully updated the menu item.'
            setTimeout(function() {window.location = '/rhome'}, 3000);
        }
        return(
<div>
                <Banner/>
            <div className="form">
                       <div class="login-form additem">
                       <div class="main-div additem">
                   <div class="panel ">
                       <h2>Edit Menu Item</h2>
                       <br />
                   </div>
                   <div class="form-group">
                       <label class="label-form"> Edit your dish image</label>
                       <br />
                       <ImageUploader
                withIcon={true}
                buttonText='Choose an image'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            /> </div>
                   <div class="row">
                       <div class="form-group col-md-6">
                       <label class="label-form"> Edit dish name</label>
                           <input onChange = {this.onChange} type="text" class="form-control" name="name" placeholder="Pizza, Pasta, Egg Salad..." style={{color:"black"}} defaultValue={details.name}/>
                       </div>
                       <div class="form-group col-md-6">
                       <label class="label-form"> Edit dish type</label>
                           <input onChange = {this.onChange} type="text" class="form-control" name="category" placeholder="Appetizer, Desert..." style={{color:"black"}} defaultValue={details.category}/>
                       </div>
                       </div>
                       <div class="form-group">
                       <label class="label-form"> Edit dish ingredients</label>
                           <input onChange = {this.onChange} type="text" class="form-control" name="ingredients" placeholder="Ingredients" style={{color:"black"}} defaultValue={details.ingredients}/>
                       </div>

                       <div class="form-group">
                       <label class="label-form"> Edit dish description</label>
                           <input onChange = {this.onChange}  type="text" class="form-control" name="description" placeholder="Description" style={{color:"black"}} defaultValue={details.description}/>
                       </div>
                       <div class="form-group">
                           <p>
                               <label class="label-form"> Edit dish price</label>
                           <input onChange = {this.onChange} type="text" class="form-control" name="price" placeholder="Price" style={{color:"black"}} defaultValue={details.price}/>
                           </p>
                       </div>
                       <div class="row">
                        <div class="col-md-6">
                       <button class="btn btn-secondary col-md-6" style={{marginLeft:"3.3cm"}} onClick = {this.updatedish}>Update Dish</button>  
                       </div>
                       <div class="col-md-6">
                       <button class="btn btn-primary col-md-6" onClick = {this.goBack}>Cancel</button> 
                       </div> 
                        </div>                        </div>
                        <div>
                        {error.message && <div className='alert alert-danger'>{error.message}</div>}
                        {success.message && <div className='alert alert-success'>{success.message}</div>}
                        </div>
                    </div>
                    </div>
        </div>
        )
    }
}
export default EditItem
