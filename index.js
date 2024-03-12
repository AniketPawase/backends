const express = require('express');
const app = express();
const cors = require ('cors');
const mysql2 = require('mysql2')

const db = require('./models');

app.use(express.json());

app.set('view engine', 'ejs');
app.use((request,response,next)=>{
    response.setHeader('Access-Control-Allow-Origin',"*");
    response.setHeader('Access-Control-Allow-Headers',"*");
    response.setHeader('Access-Control-Allow-Methods',"*");
    response.header('Access-Control-Allow-Credentials', 'true');
    next();
})

//Routes
const movieRouter = require('./routes/movieRoutes');
const reviewRouter = require('./routes/reviewRoutes');

app.use('/movies',movieRouter);
app.use('/reviews',reviewRouter);

db.sequelize.sync().then(()=>{
    app.listen(3002,()=>{
        console.log("Server running on port 3002");
    });
});