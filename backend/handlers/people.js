const Boom = require('@hapi/boom');
const Designation = require('../model/designation');
const People = require('../model/people');
const { peopleInformation } = require('../helpers/helper')

exports.fetchAllPeople = async (request, reply) => {
    let people = await People.findAll({
        where: {},
        //raw: true,
        // nest: true,
        include: [{
            model: Designation,

        }]
    })
    reply(people);
}

exports.fetchAllPeopleInfo = async (request, reply) => {
    try {
        let peopleInfos = await peopleInformation(request);
        reply(peopleInfos);
    }
    catch (err) {
        reply({ error_message: 'Failed to fetch all designations', err }).code(500);
    }
}



exports.addPeople = async (request, reply) => {
    //   const designation = await Designation.findByPk(request.payload.designation_id);
    const { people_first_name, people_last_name, people_address, people_phone_number, designation_id } = request.payload;
    await People.create({
        people_first_name,
        people_last_name,
        people_address,
        people_phone_number,
        designation_id
    }
        // , {
        //     include: [
        //         {
        //             model: Designation
        //         }
        //     ]
        // }
    ).then(people => reply({
        'message': 'Added new record',
        'status': 'success',
        people: people
    }).code(201)).catch(err => { throw Boom.internal('Add people Failed', err); });
}
