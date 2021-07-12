const Joi = require('joi');

exports.fetchDesignationByIdValidation={
        params: {
           id: Joi.number().min(1).required()
        }
},

exports.addDesignationValidation={
      payload: {
        designation_name: Joi.string().min(3).max(100).required()
      }
},

exports.updateDesignationByIdValidation={
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

  exports.fileTestValidation= {
    payload: Joi.object({
      thumbnail: Joi.any().optional().meta({ swaggerType: "file" }).required().description('image file'),
      name:Joi.string().required(),
    }),
  }