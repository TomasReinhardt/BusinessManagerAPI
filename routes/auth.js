const router = require('express').Router();
const UserController = require('../controllers/user');
const verifyToken = require('../Middleware/validete-token');

router.post('/register',verifyToken, UserController.registerUser);
router.post('/login', UserController.loginUser);

module.exports = router;