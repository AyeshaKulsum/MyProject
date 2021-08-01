var Hapi = require('hapi');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const designationRoute = require('./routes/designation')
const peopleRoute = require('./routes/people')
const classRoute = require('./routes/class')
const subjectRoute = require('./routes/subject')
const path = require('path');
const { Sequelize } = require('sequelize');
const fs = require('fs')
// create new server instance
var server = new Hapi.Server()
const port = process.env.PORT || 8000;

//DB
const db = require('./config/database');
const Designation = require('./model/designation');
const People = require('./model/people');
const ClassRoom = require('./model/classroom');
const Subject = require('./model/subject');
const SubjectClassTeacherMapping = require('./model/subjectclassteachermapping');
db.authenticate().then(() =>
  console.log('DB Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err))
db.sync({ force: false })
console.log('this', __dirname, '/model')
const d = { Designation, People, ClassRoom, Subject, SubjectClassTeacherMapping }
// fs
//   .readdirSync(`${__dirname}/model`)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname + '/model', file))(db, Sequelize.DataTypes);
//     d[model.name] = model;
//   });

Object.keys(d).forEach(modelName => {
  if (d[modelName].associate) {
    d[modelName].associate(d);
  }
});
// d.sequelize = sequelize;

// add server’s connection information
server.connection({
  host: process.env.HOST,
  port,
  routes: {
    //CORS by default false we can enable while creating server or write in each routes directly with or without properties
    cors: true
  }
})

// tell your server about the defined routes
server.route(designationRoute);
server.route(peopleRoute);
server.route(classRoute);
server.route(subjectRoute);

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