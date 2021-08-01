
const Boom = require('@hapi/boom');
const Designation = require('../model/designation');
const { QueryTypes } = require('sequelize');
const client = require('../config/redis')
const { fetchAllDesignationsHelper, addDesignationHelper, fetchAllDesignationsPostgres } = require('../helpers/helper')

exports.fetchAllDesignations = async (request, reply) => {
  try {
    let designations = await fetchAllDesignationsHelper(request);
    reply(designations);
  }
  catch (err) {
    throw Boom.internal('Failed to fetch all designations', err);
  }
}

exports.fetchDesignationById = async (request, reply) => {
  const designation = await Designation.findByPk(request.params.id);
  reply(designation);
}

exports.addDesignation = async (request, reply) => {
  try {
    let response = await addDesignationHelper(request);
    reply(response).code(201);
  }
  catch (err) {
    throw Boom.internal('Failed to add designation', err);
  }
}

exports.updateDesignationById = async (request, reply) => {
  await Designation.update({ designation_name: request.payload.designation_name }, {
    where: {
      id: request.query.id
    }
  }).then(des => {
    if (des[0] == 0) {
      throw Boom.badRequest('Designation Not found');
    }
    else {
      designations = fetchAllDesignationsPostgres();
      reply({
        'message': 'Updated Sucessfully',
        'status': 'success'
      })
    }
  }).catch(err => {
    throw Boom.internal('Updated Failed', err);
  }

  );
}

exports.deleteDesignationById = async (request, reply) => {
  console.log('deletebackend', request.params.id);
  Designation.destroy({
    where: {
      id: request.params.id
    }
  }).then(d => { designations = fetchAllDesignationsPostgres(); reply(d) }).catch(e => reply(e))
}
exports.fileTest = (request, reply) => {
  // let buf = new Buffer(png, 'binary');
  // return 
  // reply(request.payload.thumbnail)
  //     .encoding('binary')
  //     .type('application/octet-stream')
  //     .header('content-disposition', `attachment; filename=test-${new Date().toISOString()}.png;`);
  return reply({
    'message': 'File Uploaded',
    'status': 'success',
    file: request.payload.thumbnail
  })
}




exports.searchDesignation = async (request, reply) => {
  // const designation = await Designation.findAll({ where: { designation_name: request.params.name } });
  // reply(designation);

  const designation = await Designation.sequelize.query(
    'SELECT * FROM "Designations" WHERE designation_name ILIKE :search_name',
    {
      replacements: { search_name: `%${request.params.name}%` },
      type: QueryTypes.SELECT
    }
  );
  reply(designation)
}
