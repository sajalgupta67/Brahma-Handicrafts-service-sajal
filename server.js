const express = require("express");
const colors = require('colors');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');

const cors = require('cors');
const db = require("./config/db");
const http = require('http');
// mySqlPool.handler();
dotenv.config();

// middlewares
app.use(express.json());
app.use(morgan('dev'));


const models = require('./models');

models.use(db);
db.makeAssociations();

// routes
// app.get('/users', async(req, res) => {
//    res.json({})
// });

//Middlewares
const middlewares = require('./middlewares');
// console.log('middlewares',middlewares);
/**
 * Load the middlewares based on where the are as in they are called before the router or after the router
 */
// middlewares.beforeRouter(app);
middlewares.router(app);
middlewares.beforeRouter(app);
middlewares.afterRouter(app);
const server = http.createServer(app);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
const PORT = normalizePort(process.env.PORT) || 8080;
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log('Listening on ' + bind);
}

db.sequelize.sync().then(function() {

        server.listen(PORT);
        server.on('error', onError);
        server.on('listening', onListening);

});
// Database connection
 
//  app.listen(PORT, () => {
//         console.log(`Server is running on PORT - http://localhost:${PORT}`.bgMagenta.white);
//         app.use(cors());
// });


