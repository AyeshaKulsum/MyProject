const { fetchAllClass, addClass } = require('../handlers/class')

const classRoute = [
    {
        method: 'GET',
        path: '/class',
        config: {
            handler: fetchAllClass,
            description: 'Gets all class'
        }
    },
    {
        method: 'POST',
        path: '/class',
        config: {
            handler: addClass,
            description: 'Add class'
        }
    },
];

module.exports = classRoute