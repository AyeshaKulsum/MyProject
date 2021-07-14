const { fetchAllDesignations, fetchDesignationById, addDesignation, updateDesignationById, deleteDesignationById, fileTest, searchDesignation } = require('../handlers/designation')
const { fetchDesignationByIdValidation, addDesignationValidation, updateDesignationByIdValidation, fileTestValidation } = require('../validations/designation')

const designationRoute = [
  {
    method: 'GET',
    path: '/designation',
    config: {
      handler: fetchAllDesignations,
      description: 'Gets all designations'
    }
  },

  {
    method: 'GET',
    path: '/designation/{id}',
    config: {
      handler: fetchDesignationById,
      description: 'Gets designation by id',
      validate: fetchDesignationByIdValidation,
    }
  },

  {
    method: 'POST',
    path: '/designation',
    config: {
      handler: addDesignation,
      description: 'Add designation',
      validate: addDesignationValidation
    }
  },

  {
    method: 'PUT',
    path: '/designation',
    config: {
      handler: updateDesignationById,
      description: 'Update designation',
      validate: updateDesignationByIdValidation
    }

  },

  {
    method: 'DELETE',
    path: '/designation/{id}',
    config: {
      handler: deleteDesignationById,
      description: 'Delete designation by id',
      validate: fetchDesignationByIdValidation
    }
  },

  {
    method: 'GET',
    path: '/search-designation/{name}',
    config: {
      handler: searchDesignation,
      description: 'Search Designation'
    }
  },

  {
    method: 'POST',
    path: '/file',
    config: {
      handler: fileTest,
      payload: {
        parse: true,
        maxBytes: 10,
        output: "stream",
        timeout: 300,
        // multipart: true,
        allow: 'multipart/form-data',
      },
      validate: fileTestValidation
    },

  },
];

module.exports = designationRoute