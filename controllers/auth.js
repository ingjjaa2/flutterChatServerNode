const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const {generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

    const existeEmail = await Usuario.findOne({email});
      
    if(existeEmail) {
        return res.status(400).json({
            ok: false,
            msg: "Email duplicado",
            existeEmail
        });
    }

    const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


    await usuario.save();

    //Generar Token 

    const token = await generarJWT(usuario.id);


    res.json({
        ok:true,
        token,
        usuario: usuario
    })  

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error : "Error creando usuario"
        });
    }


}

const login = async (req, res = response) => {
    const { email, password } = req.body;

try {

    //Buscamos el usuario por correo
    const usuarioDB = await Usuario.findOne({email});

    if(!usuarioDB){
        return res.status(404).json({
            ok: false,
            msg: "Email no en DB"
        });
    }

    //Revisamos que el email coincida

    const validarPassword = bcrypt.compareSync(password,usuarioDB.password);
    if(!validarPassword){
        return res.status(404).json({
            ok: false,
            msg: "Password no valido"
        });
    }

    //Le creamos el JWT (Token)
    const token = await generarJWT(usuarioDB.id);

    res.json({
        ok: true,
        usuario: usuarioDB,
        token
    });
    
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        error : "Error login usuario"
    });
}

}

const renewToken = async(req, res = response) => {
    const uid = req.uid;
    
    console.log(uid)

    const token = await generarJWT(uid);

    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        usuario,
        token
    })
}


module.exports  = {
    crearUsuario, login , renewToken
}