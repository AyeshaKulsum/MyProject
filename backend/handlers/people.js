const Boom = require('@hapi/boom');
const Designation = require('../model/designation');
const People = require('../model/people');


exports.fetchAllPeople = async (request, reply) => {
    let people = await People.findAll({

    });
    reply(people);
}



exports.addPeople = async (request, reply) => {
    const designation = await Designation.findByPk(request.params.id);
    await People.create({
        people_first_name: request.payload.people_first_name,
        people_last_name: request.payload.people_last_name,
        people_address: request.payload.people_address,
        people_phone_number: request.payload.people_phone_number,
        designation
    }
        , {
            include: [
                {
                    model: Designation
                }
            ]
        }
    ).then(people => reply({
        'message': 'Added new record',
        'status': 'success',
        people: people
    }).code(201)).catch(err => { throw Boom.internal('Add people Failed', err); });
}
