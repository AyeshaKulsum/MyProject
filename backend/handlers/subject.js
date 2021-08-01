const Subject = require("../model/subject");

exports.fetchAllSubject = async (request, reply) => {
    let subject = await Subject.findAll()
    reply(subject);
}


exports.addSubject = async (request, reply) => {
    const { subject_name } = request.payload;
    await Subject.create({
        subject_name
    }
    ).then(people => reply({
        'message': 'Added new record',
        'status': 'success',
        people: people
    }).code(201)).catch(err => { throw Boom.internal('Add subject Failed', err); })
};