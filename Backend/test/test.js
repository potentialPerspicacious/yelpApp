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

        it('Error User', () => {
            agent.post("/login")
                .send({ email_id: "cibo@yelp.edu", password: "password" })
                .then(function (res) {
                    expect(res.text).to.equal("NO_USER");
                })
                .catch(error => {
                    console.log(error);
                });
        });

        it('Get Events - Customer', () => {
            agent.get("/customer/yourevents/:user_id")
                .send({ user_id: "10" })
                .then(function (res) {
                    expect(res.text).to.equal("Error in Data");
                    expect(res.status).to.equal(200)
                })
                .catch(error => {
                    console.log(error);
                });
        });
        it('Get Menu Items', () => {
            agent.get("/menu/items/:user_id")
                .send({ user_id: "10" })
                .then(function (res) {
                    expect(res.status).to.equal(200)
                })
                .catch(error => {
                    console.log(error);
                });
        });
        it('Get Reviews - Restaurant', () => {
            agent.get("/restaurant/getReviews/:resID/")
                .send({ user_id: "10" })
                .then(function (res) {
                    expect(res.status).to.equal(200)
                })
                .catch(error => {
                    console.log(error);
                });
        });

    });
});
