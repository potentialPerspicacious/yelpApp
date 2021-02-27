const graphql = require('graphql');
const Users = require('../models/UserModel.js');
const restaurant = Users.restaurant;
const customer = Users.customer;
const RestaurantProfile = require('../models/RestaurantProfileModel')
const { login } = require('../mutations/login');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const RestaurantType = new GraphQLObjectType({
    name: 'Restaurant',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        city: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        image: {type: GraphQLString},
        type: {type: GraphQLString},
        profileInfo: {
            type: new GraphQLList(RestaurantProfileType),
            resolve(parent, args) {
                return parent.profileInfo;
            }
        },
        dishes: {
            type: new GraphQLList(MenuType),
            resolve(parent, args) {
                return parent.dishes;
            }
        }
    })
});
const RestaurantProfileType = new GraphQLObjectType({
    name: 'RestaurantProfile',
    fields: () => ({
        _id: { type: GraphQLID },
        location: { type: GraphQLString },
        contact: { type: GraphQLString },
        cusine: { type: GraphQLString },
        description: { type: GraphQLString },
        timings: { type: GraphQLString },
        dinein: { type: GraphQLString },
        takeout: { type: GraphQLString },
        ydelivery: { type: GraphQLString },
       
    })
});
const MenuType = new GraphQLObjectType({
    name: 'Menu',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        ingredients: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString }
       
    })
});


const RootQuery = new graphql.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        restaurant: {
            type: RestaurantType,
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                let restaurant = await RestaurantProfile.findById(args.id);
                if (restaurant) {
                    return restaurant;
                }
            }
        },


    }
})
const StatusType = new GraphQLObjectType({
    name: 'Status',
    fields: () => ({
        status: { type: GraphQLString },
        message: { type: GraphQLString }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: {
            type: StatusType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                isOwner: {type: GraphQLString},
            },
            resolve(parent, args) {
                return login(args);
            }
        }
    }
}) 

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});