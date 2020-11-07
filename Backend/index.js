const app = require('./app');

const login = require("./modules/login");
const signup = require("./modules/signup");
const profile = require("./modules/profile");
const restaurant = require("./modules/restaurant");
const menu = require("./modules/menu");
const customer = require("./modules/customer")
const search = require("./modules/search")
const uploads = require("./modules/uploads")
const images = require("./modules/images")
const messages = require('./modules/messages')



app.use("/login", login);
app.use("/signup", signup);
app.use("/profile", profile);
app.use("/restaurant", restaurant);
app.use("/menu", menu)
app.use("/customer", customer)
app.use("/search", search)
app.use("/uploads", uploads)
app.use("/images", images)
app.use("/messages", messages)

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;