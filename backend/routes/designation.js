 const {fetchAllDesignations,fetchDesignationById} = require('../handlers/designation')
  
  const designationRoute = [  
    {
        method: 'GET',
        path: '/designation',
        config: fetchAllDesignations
    },
    {
      method: 'GET',
      path: '/designation/{id}',
      config: fetchDesignationById
  },
  ];

  module.exports = designationRoute