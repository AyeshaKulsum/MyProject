var Hapi = require('hapi');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const designationRoute = require('./routes/designation')
const peopleRoute = require('./routes/people')
// create new server instance
var server = new Hapi.Server()
const port = process.env.PORT || 8000;

//DB
const db = require('./config/database')
db.authenticate().then(() =>
  console.log('DB Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err))
db.sync()
// add server’s connection information
server.connection({
  host: process.env.HOST,
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
server.route(designationRoute);
server.route(peopleRoute);

// start your server
server.start(function (err) {
  if (err) {
    throw err
  }

  console.log('Server running at: ' + server.info.uri)
})

process.on('unhandledRejection', (err) => {
  console.log('Error :', err);
  process.exit(1);
})

module.exports = server;