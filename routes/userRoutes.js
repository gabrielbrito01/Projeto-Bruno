const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/authenticate', userController.authenticateUser);

router.route('/').post((req, res) => userController.createUser(req, res))

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;