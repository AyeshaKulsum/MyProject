const { fetchAllPeople, addPeople, fetchAllPeopleInfo } = require('../handlers/people')

const peopleRoute = [
    {
        method: 'GET',
        path: '/people',
        config: {
            handler: fetchAllPeople,
            description: 'Gets all people'
        }
    },
    {
        method: 'GET',
        path: '/peoples-info',
        config: {
            handler: fetchAllPeopleInfo,
            description: 'Gets all people info'
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