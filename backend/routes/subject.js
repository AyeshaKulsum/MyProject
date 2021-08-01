const { fetchAllSubject, addSubject } = require('../handlers/subject')

const subjectRoute = [
    {
        method: 'GET',
        path: '/subject',
        config: {
            handler: fetchAllSubject,
            description: 'Gets all subject'
        }
    },
    {
        method: 'POST',
        path: '/subject',
        config: {
            handler: addSubject,
            description: 'Add subject'
        }
    },
];

module.exports = subjectRoute