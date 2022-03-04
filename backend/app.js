const express = require('express');
const mongoose = require('mongoose')
const testRoutes = require('./route/route')
const app = express();


mongoose.connect('mongodb+srv://Nyssa:Hassina99@cluster0.uxi6e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log("db valid"))
    .catch(() => console.log("db error"))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next()
})

app.use(express.json())
app.use(express.urlencoded({
    extended : true
}))

app.use('/test', testRoutes)
app.use((req,res) =>{
    res.json({message : 'ton serveur marche'});
})
module.exports = app;

