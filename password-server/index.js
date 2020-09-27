const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

mongoose.connect("mongodb://mongo:27017/password-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const Password = mongoose.model("Passwords", new mongoose.Schema({
    password: String
}));

app.get("/password", async (req , res) => {
    const password = await Password.find({});
    res.send(password);
});

// app.delete("/password", async (req , res) => {
//     const password = await Password.find({});
//     res.send(password);
// });

app.post("/password", async(req, res) => {
    const newPassword = new Password(req.body);
    const savePassword = await newPassword.save();
    res.send(savePassword);
});


// const port = process.env.port || 5000;
// app.listen(5000, console.log('Server started'));
app.listen(5000, (err) => {   console.log('Listening')});