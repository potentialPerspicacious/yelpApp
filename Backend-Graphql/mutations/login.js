const Users = require('../models/UserModel.js');
const restaurant = Users.restaurant;
const customer = Users.customer;

const login = async (args) => {
    if(args.isOwner === "on"){
        restaurant.findOne({email: args.email, password: args.password}, (error, result) => {
            if(error){
                return{status: 500, message: "ERROR SIGNING IN"}
            } else if (result){
                return{status: 200, payload: JSON.stringify(result)}
            } else if(!result && !error){
                return{status: 200, message: "Invalid User"}
            }
        })
    }
}

exports.login = login;