const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', (client) => {

    const [valido,uid] = comprobarJWT( client.handshake.headers['x-token'])

    if(!valido) { return client.disconnect();}

    usuarioConectado(uid);

    client.join(uid);

    client.on('mensaje-personal', async(payload)=>{
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    })

    client.on('disconnect',()=>{
        usuarioDesconectado(uid);
    })

    // console.log('Cliente conectado');

    // client.on('disconnect', () => {
    //     console.log('Cliente desconectado');
    // });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});
