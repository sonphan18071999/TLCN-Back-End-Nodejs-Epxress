const express = require('express');
// set up express app
const app = express();

// set up port
const port = 4000;
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const start = require('./app/routes/mainRoute'); 
const fileupload = require("express-fileupload");
var cors = require('cors')
var db = require('./app/models/mainModels')
// set up dependencies
// app.listen(process.env.port || port);
var server = app.listen(port, () => console.log(`Listening on ${port}`))
  .use('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  })
  .use(cors())
  .use(fileupload({
    useTempFiles:true
  }))
  .use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:52428800}))
  .use(bodyParser.json({limit: "50mb"}))


var io = require('socket.io')(server, {
  cors: {
    origin: port,
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true
  }
});




//Un limit request
// app.use(bodyParser.json());

/**Mongo Db */
// set up mongoose
mongoose.connect('mongodb+srv://sonp:Chikiet1@@clusterblogaccessories.w6uag.gcp.mongodb.net/<BlogAccessories>?retryWrites=true&w=majority', { useNewUrlParser: true,useFindAndModify:false,useCreateIndex:true,useUnifiedTopology: true})
  .then(()=> {
    console.log('Database connected');
   /**Configure socket.io */
    io.on('connection', (socket) => {
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
      socket.on('broadcast',(msg)=>{
        socket.broadcast.emit("update state comment",msg);
      })
    });
  /**Configure socket.io */
  })
  .catch((error)=> {
    console.log('Error connecting to database'+error);
  });



// app.listen(port, () => {
//   console.log(`Our server is running on port ${port}`);
// });


//Use api

app.use('/api',start);


