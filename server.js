const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRouter = require('./routes/user');

const app = express();

app.use(cookieParser());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/authenticationDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Connected to databse");
});


app.use('/user', userRouter);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});