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

// set up dependencies
app.use(cors())
app.get('/', (request, respond) => {
  respond.status(200).json({
    message: 'Welcome to Project Support',
  });
});
app.use(fileupload({
  useTempFiles:true
}));


//Un limit request
app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.json());

app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:52428800}));
/**Mongo Db */
// set up mongoose
mongoose.connect('mongodb+srv://sonp:Chikiet1@@clusterblogaccessories.w6uag.gcp.mongodb.net/<BlogAccessories>?retryWrites=true&w=majority', { useNewUrlParser: true,useFindAndModify:false,useCreateIndex:true,useUnifiedTopology: true})
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });

// set up route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Project with Nodejs Express and MongoDB',
  });
});
app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});

//Use api
app.use('/api',start);

