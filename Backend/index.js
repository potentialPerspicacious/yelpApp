const app = require('./app');

const login = require("./modules/login");
const signup = require("./modules/signup");
const profile = require("./modules/profile");
const restaurant = require("./modules/restaurant");

app.use("/login", login);
app.use("/signup", signup);
app.use("/profile", profile);
app.use("/restaurant", restaurant);

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;