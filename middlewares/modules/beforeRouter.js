const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
// const RedisStore = require('connect-redis')(session);
const env = process.env.NODE_ENV || 'development';
// const config = require('../../config/config.json')[env];


module.exports = function (app) {
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json({
        limit: '50mb'
    }));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));



    // Redis connection for string sessions.

    // TODO : Deactivated due to cookie issue.
    // app.use(session({
    //     store: new RedisStore(config.redis),
    //     secret: 'Hello@World',
    //     cookie: { maxAge: (60000 * 24 * 30)},
    //     resave: false,
    //     saveUninitialized: false,
    //     cookie:{
    //         httpOnly: true
    //     }
    // }));


    // Adding custom response handlers.
    app.use(function (req, res, next) {
        let responses = ['ok', 'badRequest', 'created', 'forbidden', 'notFound', 'serverError', 'negotiate', 'invalidRequest'];
        for (let response of responses) {
            res[response] = require('./responses/' + response);
        }
        next();
    });
}