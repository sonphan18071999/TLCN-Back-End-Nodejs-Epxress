const express = require('express');
// set up express app
const app = express();
var http = require('http'); //the variable doesn't necessarily have to be named http
const dotenv = require('dotenv')

// set up port
const port = process.env.PORT || 4000 ;
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const start = require('./app/routes/mainRoute'); 
const fileupload = require("express-fileupload");
var cors = require('cors')
var db = require('./app/models/mainModels')
// set up dependencies
app.use(cors())
var server = http.createServer((req, res) => {
});
dotenv.config({ path: './database.env' })

server = app.listen(port);
var io = require('socket.io')(server, {
  cors: {
    origin: "https://fe-angular-tlcn.herokuapp.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true
  }
});


// app.get('/', (request, respond) => {
//   respond.status(200).json({
//     message: 'Welcome to Project Support',
//   });
// });
app.use(fileupload({
  useTempFiles:true
}));


//Un limit request
app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.json());

app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:52428800}));
/**Mongo Db */
// set up mongoose
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,useFindAndModify:false,useCreateIndex:true,useUnifiedTopology: true})
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

// set up route
// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Welcome to Project with Nodejs Express and MongoDB',
//   });
// });


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// app.listen(port, () => {
//   console.log(`Our server is running on port ${port}`);
// });


//Use api

app.use('/api',start);