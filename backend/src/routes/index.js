const express = require('express');
const router = express.Router();

const { register, login, checkAuth, getUsers } = require("../controllers/auth");
const { transaction, transactions } = require('../controllers/transaction');
const { getWallet, updateWallet } = require('../controllers/wallet');
const { auth } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', auth, checkAuth);
router.get('/users', getUsers);
router.get('/wallet', auth, getWallet);
router.patch('/wallet', auth, updateWallet);
router.post('/transaction', auth, transaction);
router.get('/transactions', auth, transactions);

module.exports = router