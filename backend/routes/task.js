 const {hello} = require('../handlers/task')
  
  const taskRoute = [  
    {
        method: 'GET',
        path: '/',
        handler: hello 
    }
  ];

  module.exports = taskRoute