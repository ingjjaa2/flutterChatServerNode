/*
path: api/ligin
*/


const { Router} = require('express');
const { check } = require('express-validator');


const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const {validatJWT} = require('../middlewares/validar-jwt');


const router = Router();

router.post('/new',
[check('nombre','El nombre es obligatorio').not().isEmpty(),
check('password','El nombre es obligatorio').not().isEmpty(),
check('email','El nombre es obligatorio').isEmail(),
validarCampos],
crearUsuario);

router.post('/',[
    check('password','Password is required').not().isEmpty(),
    check('email','Password is required').isEmail(),
    validarCampos
],login);

router.get('/renew', validatJWT,renewToken)

module.exports = router;
