const express = require('express');
const app = express();
const server = require('http').createServer(app);

/*
El servidor de Socket.IO está configurado con CORS, lo que permite conexiones solo desde https://frontdiagramador.netlify.app
También podría permitir conexiones locales (http://localhost:4200) para desarrollo.
 */
const io = require('socket.io')(server, {
  cors: {
    origin: 'https://harmonious-fox-f44c67.netlify.app', // URL permitida
    methods: ['GET', 'POST'], // Métodos HTTP permitidos
  },
    // cors: {
    //   origins: ['http://localhost:4200']
    //   //http://localhost:4200/
    //   //https://frontdiagramador.netlify.app
    // }
  });


io.on('connection', (socket) => {
   // console.log('Hola');
    const idHandShake = socket.id;
    const { nameRoom } = socket.handshake.query;

    socket.join(nameRoom)
    console.log(`Hola desde: ${idHandShake}`);
    console.log(`Se unió a la sala: ${nameRoom}`);

    socket.on('evento',(res) =>{
       // const data = res
        console.log(res);
        // socket.to(nameRoom).emit('evento',res);
         socket.broadcast.to(nameRoom).emit('evento', res);
    //    console.log('esta es la room')
        console.log(res)
    });

    // socket.on('addClass', (classNode) => {
    //   console.log(classNode);
    //   // Emitir el nuevo nodo a todos en la sala excepto al emisor
    //   socket.to(nameRoom).emit('addClass',classNode);
    //   // socket.broadcast.to('roomId').emit('addClass', classNode);
    // });
   
});

server.listen(5000, () => {
    console.log('>> Socket listo y escuchando en el puerto 5000');
});
