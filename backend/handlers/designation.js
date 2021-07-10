
const Boom = require('boom');
const Designation = require('../model/designation');
var Joi = require('joi')

const DesignationHandler = {
  fetchAllDesignations: {
      handler: function (request, reply) {
         Designation.findAll().then(des=>reply(des)).catch(err=>console.log(err));
      }
    },
    fetchDesignationById:{
      handler: function (request, reply) {
        Designation.findByPk(request.params.id).then(des=>reply(des)).catch(err=>console.log(err));
     },
     validate: {
      params: {
         id: Joi.number().min(1).required()
       }
     }
    },
    addDesignation:{
      handler: function (request, reply) {
        Designation.create({designation_name:request.payload.designation_name}).then(des=>reply({
          'message':'Added new record',
          'status':'success',
          description:des
        })).catch(err=>console.log(err));
     }
    },updateDesignationById:{
      handler: function (request, reply) {
        Designation.update({designation_name:request.payload.designation_name},{
          where:{
            designation_id:request.query.id
          }
        }).then(des=>reply({
          'message':'Updated Sucessfully',
          'status':'success'
        })).catch(err=>reply({
          'message':'Updated Failed',
          'status':'failed'
        }));
     },
          validate: {
            query: {
              id: Joi.number().min(1).required()
            },
            payload: {
              designation_name: Joi.string().min(3).max(100).required()
            },headers: {
              username: Joi.string().required(),
            },
            options: {
              allowUnknown: true,
              abortEarly: false
            }
          }
    },

    fileTest:{
      handler: function (request, reply) {
        // let buf = new Buffer(png, 'binary');

// return 
// reply(request.payload.thumbnail)
//     .encoding('binary')
//     .type('application/octet-stream')
//     .header('content-disposition', `attachment; filename=test-${new Date().toISOString()}.png;`);
       return reply({
          'message':'File Uploaded',
          'status':'success',
          file:request.payload.thumbnail
        })
     },
  //    headers: {
  //     "content-disposition": "form-data; name=\"thumbnail\"; filename=\"PhotosStorageExtension\"",
  //     "content-type": "application/octet-stream"
  // },
     payload: {
      parse: true,
      maxBytes: 10,
      output: "stream",
      timeout: 300,
      // multipart: true,
       allow: 'multipart/form-data',
    },
    validate: {
      payload: Joi.object({
        thumbnail: Joi.any().optional().meta({ swaggerType: "file" }).required().description('image file'),
        name:Joi.string().required(),
      }),
    }
      }
  }
  
  module.exports = DesignationHandler
  