const app = require('./app');

const login = require("./modules/login");
const signup = require("./modules/signup");
const profile = require("./modules/profile");
const restaurant = require("./modules/restaurant");
const menu = require("./modules/menu");
const customer = require("./modules/customer")
const search = require("./modules/search")

app.use("/login", login);
app.use("/signup", signup);
app.use("/profile", profile);
app.use("/restaurant", restaurant);
app.use("/menu", menu)
app.use("/customer", customer)
app.use("/search", search)

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;