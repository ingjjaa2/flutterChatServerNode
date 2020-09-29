const jwt = require('jsonwebtoken');

const validatJWT = (req, res, next)=> {

    //Leer token 
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No se recibio el token'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;


        next();


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token No valido 2'
        });
    }



}

module.exports = {validatJWT}