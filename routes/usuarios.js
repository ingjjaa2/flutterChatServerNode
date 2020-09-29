const {Router} = require('express');
const { validatJWT } = require('../middlewares/validar-jwt');

const { getUsuarios } = require('../controllers/usuario');

const router = Router();

router.get('/', validatJWT, getUsuarios);

module.exports = router;