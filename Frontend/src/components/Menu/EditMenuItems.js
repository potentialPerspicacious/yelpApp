import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Banner from '../Navigationbar/banner'
import TimePicker from 'react-bootstrap-time-picker';
import ImageUploader from 'react-images-upload';
import {Button} from 'react-bootstrap'
import backendServer from "../../webConfig"
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {editMenuItem} from '../../actions/menu'





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
        this.props.editMenuItem(data)
        // axios.post(`${backendServer}/menu/updateItem/${localStorage.getItem("dishID")}`, data)
        // .then(response => {
        //     this.setState({
        //         msg: (response.data)
        //     });
        // })

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
        axios.post(`${backendServer}/uploads/items/${localStorage.getItem("user_id")}`, formData, uploadConfig)
            .then(response => {
                alert("Image uploaded successfully!");
                this.setState({
                    fileText: "Choose file...",
                    user_image: response.data
                });
            })
            .catch(err => {
                console.log("Error");
            });
    }
    render(){
        let message = this.props.description
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
            setTimeout(function() {window.location = '/rhome'}, 1000);
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
                       <label class="label-form"> Edit/Upload your dish image</label>
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
            
                       </div>
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
EditItem.propTypes = {
    editMenuItem: PropTypes.func.isRequired,
    description: PropTypes.object.isRequired
}

const mapStateToProps = state => { 
    return ({
        description: state.menu.description
})};

export default connect(mapStateToProps, { editMenuItem })(EditItem);
