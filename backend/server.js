var Hapi = require('hapi');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const taskRoute = require('./routes/task')
// create new server instance
var server = new Hapi.Server()
const port = process.env.PORT || 8000;

// add server’s connection information
server.connection({
  host: 'localhost',
  port,
  routes: {
    //CORS by default false we can enable while creating server or route directly with or without properties
 cors: {
     origin: ['*'], // an array of origins or 'ignore'
     headers: ['Authorization'], // an array of strings - 'Access-Control-Allow-Headers'
     exposedHeaders: ['Accept'], // an array of exposed headers - 'Access-Control-Expose-Headers',
     additionalExposedHeaders: ['Accept'], // an array of additional exposed headers
     maxAge: 60,
     credentials: true // boolean - 'Access-Control-Allow-Credentials'
 }
}
})

// tell your server about the defined routes
server.route(taskRoute);

// start your server
server.start(function (err) {
  if (err) {
    throw err
  }

  console.log('Server running at: ' + server.info.uri)
})

process.on('unhandledRejection',(err)=>{
  console.log(err);
  process.exit(1);
})