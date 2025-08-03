module.exports = function(app) {
    const Router = require('../../routes');

    app.use('/user', Router.user);

}