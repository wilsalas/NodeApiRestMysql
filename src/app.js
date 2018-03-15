const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//routes
require('./routes/userRoutes')(app);

//server
app.listen(app.get('port'), () => {
    console.log("CONECTADO");
})