const express = require('express');

const cors = require('cors')
require('dotenv').config();

const app = express();

const httpServer  = require('http').createServer(app);

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
});
  let n=1;
  io.on("connection", (socket) => {
    // ...
    socket.on("send_message", (data) => {
      console.log(data);

      
    });
    socket.broadcast.emit("broadcat", { some: `broadcat toàn server ${n++}` });
    console.log("success")
    
  });
// Middleware
app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );
//



httpServer.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
    console.log(`http://localhost:${process.env.PORT}`);
  });

