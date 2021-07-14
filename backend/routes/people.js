const { fetchAllPeople, addPeople } = require('../handlers/people')

const peopleRoute = [
    {
        method: 'GET',
        path: '/people',
        config: {
            handler: fetchAllPeople,
            description: 'Gets all designations'
        }
    },

    {
        method: 'POST',
        path: '/people',
        config: {
            handler: addPeople,
            description: 'Add people'
        }
    },
];

module.exports = peopleRoute