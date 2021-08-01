const ClassRoom = require("../model/classroom");
const People = require("../model/people");



exports.fetchAllClass = async (request, reply) => {
    let classroom = await ClassRoom.findAll({
        where: {},
        include: [{
            model: People,

        }]
    })
    reply(classroom);
}

exports.addClass = async (request, reply) => {
    const { class_name, class_teacher } = request.payload;
    await ClassRoom.create({
        class_name, class_teacher
    }
    ).then(people => reply({
        'message': 'Added new record',
        'status': 'success',
        people: people
    }).code(201)).catch(err => { throw Boom.internal('Add class room Failed', err); })
};