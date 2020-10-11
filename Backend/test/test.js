var assert = require('chai').assert;
var app = require('../index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);


describe("Yelp", function () {
    describe('Mocha Test', function () {

        it('Incorrect Password',() => {
            agent.post("/login")
                .send({ email_id: "thor.odinson@yelp.edu", password: "password" })
                .then(function (res) {
                    expect(res.text).to.equal("NO_USER");
                })
                .catch(error => {
                    console.log(error);
                });
        });

        it('Invalid User', () => {
            agent.post("/login")
                .send({ email_id: "cibo@yelp.edu", password: "password" })
                .then(function (res) {
                    expect(res.text).to.equal("NO_USER");
                })
                .catch(error => {
                    console.log(error);
                });
        });

        it('Successful Login',() => {
            agent.post("/login")
                .send({ email_id: "thor.odinson@yelp.com", password: "thor" })
                .then(function (res) {
                    expect(res.status).to.equal(401);
                })
                .catch(error => {
                    console.log(error);
                });
        });
        it('Successful Signup',() => {
            agent.post("/login")
                .send({ fname: "customer",
                lname: "1",
                email: "customer.1@yelp.com", 
                password: "customer1",
                zipcode: "95110"
            })
                .then(function (res) {
                    expect(res.status).to.equal(401);
                })
                .catch(error => {
                    console.log(error);
                });
        });
        it('Error Signup - Restaurant Owner',() => {
            agent.post("/login")
                .send({ rname: "cibo",
                email: "cibo@yelp.com", 
                password: "customer1",
                zipcode: "95110"
            })
                .then(function (res) {
                    expect(res.status).to.equal(401);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });
});
