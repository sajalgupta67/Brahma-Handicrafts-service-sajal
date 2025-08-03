// const beforeRouter = require('./modules/beforeRouter');
const router = require('./modules/router');
const afterRouter = require('./modules/afterRouter');
const beforeRouter = require('./modules/beforeRouter');

// console.log(permissions);

module.exports = {
    router,
    beforeRouter,
    afterRouter,
}