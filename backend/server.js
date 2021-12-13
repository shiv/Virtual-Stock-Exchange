const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();

const db = require("./config/keys").mongoURI;

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Could'nt connect to MongoDB...", err));

// var allowCrossDomain = function (req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
// 	res.header("Access-Control-Allow-Headers", "Content-Type");
// 	next();
// };

app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyParser.json());

// app.use(express.json());
// app.use(allowCrossDomain);

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
