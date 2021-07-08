 const {fetchAllDesignations,fetchDesignationById} = require('../handlers/designation')
  
  const designationRoute = [  
    {
        method: 'GET',
        path: '/',
        config: fetchAllDesignations
    },
    {
      method: 'GET',
      path: '/{id}',
      config: fetchDesignationById
  },
  ];

  module.exports = designationRoute