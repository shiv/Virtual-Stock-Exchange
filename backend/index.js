const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/Users")
	.then(() => console.log("connected to MongoDB"))
	.catch((err) => console.error("could not connect to MongoDB...", err));

var allowCrossDomain = function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
};

app.use(express.json());
app.use(allowCrossDomain);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port ${port}`));
