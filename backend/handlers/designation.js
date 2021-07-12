
const Boom = require('@hapi/boom');
const Designation = require('../model/designation');


exports.fetchAllDesignations = async (request, reply) => {
  await Designation.findAll().then(des => reply(des)).catch(err => { throw Boom.internal('Failed to fetch all designations', err); });
}

exports.fetchDesignationById = async (request, reply) => {
  await Designation.findByPk(request.params.id).then(des => reply(des)).catch(err => { throw Boom.internal('Failed to fetch designation by id', err); });
}

exports.addDesignation = async (request, reply) => {
  await Designation.create({ designation_name: request.payload.designation_name }).then(des => reply({
    'message': 'Added new record',
    'status': 'success',
    description: des
  })).catch(err => { throw Boom.internal('Add designation Failed', err); });
}

exports.updateDesignationById = async (request, reply) => {
  await Designation.update({ designation_name: request.payload.designation_name }, {
    where: {
      designation_id: request.query.id
    }
  }).then(des => {
    if (des[0] == 0) {
      throw Boom.badRequest('Designation Not found');
    }
    else {
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
