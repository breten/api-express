const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/api-express', {
    useMongoClient: true,
});

const app = express();

//MiddleWares
app.use(logger('dev'));
app.use(bodyParser.json());

//Routers
const users = require('./routes/users');
app.use('/users', users);


//Catch 404 Errors and forword them to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');

    err.status = 404;
    next(err);
});

//Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    //Respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });
    next(err);
});

//Start the server
const port = app.get('port') || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
