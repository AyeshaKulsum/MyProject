 const {fetchAllDesignations,fetchDesignationById,addDesignation,updateDesignationById,fileTest} = require('../handlers/designation')
  
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
  {
    method: 'POST',
    path: '/designation',
    config: addDesignation
},
{
  method: 'PUT',
  path: '/designation',
  config: updateDesignationById
},

{
  method: 'POST',
  path: '/file',
  config: fileTest
},
  ];

  module.exports = designationRoute