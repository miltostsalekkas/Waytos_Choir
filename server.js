'use strict';
const colors = require('riso-colors');
const express = require('express');
const socketIO = require('socket.io');
const http = require("http");
const fs = require('fs');

const app = express();
const server = http.createServer(app);
var CharactersNo;

const dir = './assets/Characters/300ppi';

fs.readdir(dir, (err, files) => {
  CharactersNo = files.length;
});


app.use(express.static(__dirname));


const io = socketIO(server);

var Users = 0;
var IDs = [];
var PublicData = [];
var Positions = [];

io.on('connection',
  // We are given a websocket object in our function
  function (socket) {




    console.log("We have a new client: " + socket.id);
    Users = Users + 1;
    console.log("Number od Users : " + Users);
    socket.emit('CharNo', CharactersNo);
    socket.broadcast.emit('Users', { Users: Users, IDs: IDs });
    socket.emit('Users', { Users: Users });

    const color = colors[Math.floor(Math.random() * colors.length)];



    IDs.push(socket.id);

    socket.on('grid',
      function (data) {
        for (var i = 0; i < IDs.length; i++) {
          if (data[IDs[i]] != null) {
            Positions.push((AssisgnRandomPixel(data[IDs[i]].x, data[IDs[i]].y)));
          }
        }
      }
    );


    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on('mic',
      function (data) {

        console.log('public data',PublicData);

        if (data != null) {

          for (var i = 0; i < IDs.length; i++) {
            if (data[IDs[i]] != null) {
              // data[IDs[i]].color = color;
              // data[IDs[i]].position = Positions[i];
              PublicData [i]= {[IDs[i]]:data[IDs[i]]};
            }
          }

          socket.broadcast.emit('Public', PublicData);
          socket.emit('Public', PublicData);
        }
      }
    );



    socket.on('disconnect', function () {

      console.log("This user left " + socket.id);
      var SocketLeftIndex = IDs.indexOf(socket.id);

      IDs = IDs.filter(item => item !== socket.id);


     PublicData = PublicData.filter(item => {
       console.log('item', item)
       Object.keys(item) !== SocketLeftIndex
    });

      console.log('public data', PublicData)
      console.log("Client has disconnected");
      Users = Users - 1;
      console.log("Number of Users : " + Users);
      socket.broadcast.emit('Users', { Users: Users, IDs: IDs });
      socket.emit('Users', { Users: Users });
      socket.broadcast.emit('Public', PublicData);
      socket.emit('Public', PublicData);



    });



  }
);

function AssisgnRandomPixel(columnsNo, rowsNo) {



  var RPixelEntry = {

    x: Math.floor(Math.random() * columnsNo),
    y: Math.floor(Math.random() * rowsNo)

  };


  return RPixelEntry;
}
//WebSockets Server 

const port = process.env.PORT || 3000;
server.listen(port, () => {
  // Print to console just so we know its ready to go...
  console.log("Server listening on http://localhost:" + port);
});

//