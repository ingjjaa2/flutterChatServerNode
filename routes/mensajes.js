const { Router } = require('express');
const { validatJWT } = require('../middlewares/validar-jwt');
const { obtenerChat } = require('../controllers/mensajes');

const router = Router();

router.get('/:de', validatJWT, obtenerChat);

module.exports = router;
