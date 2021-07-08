
const Boom = require('boom');
const Designation = require('../model/designation');

const DesignationHandler = {
  fetchAllDesignations: {
      handler: function (request, reply) {
         Designation.findAll().then(des=>reply(des)).catch(err=>console.log(err));
      }
    },
    fetchDesignationById:{
      handler: function (request, reply) {
        Designation.findByPk(request.params.id).then(des=>reply(des)).catch(err=>console.log(err));
     }
    }
  }
  
  module.exports = DesignationHandler
  