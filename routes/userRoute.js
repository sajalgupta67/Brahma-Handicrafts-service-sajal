const express = require('express');
const router = express.Router();

//Importing the user auth function.
// const auth = require('../auth');
// const isLoggedIn = auth.isLoggedIn;
// const isAuthorized = auth.isAuthorized;

const userController = require('../controller/userController');
// Ensure userController.create is a valid function
router.post('/create', userController.create);
// This will respond to GET /user/getAll
router.get('/getAll', userController.getAll);
// This will respond to GET /user
router.get('/', userController.getAll);
// router.get('/', isLoggedIn, cashhandoverController.get);
// router.put('/', isLoggedIn, cashhandoverController.update);

module.exports = router;