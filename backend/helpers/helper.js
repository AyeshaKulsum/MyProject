const Boom = require('@hapi/boom');
const Designation = require('../model/designation');
const client = require('../config/redis');
const People = require('../model/people');
const { QueryTypes, Sequelize } = require('sequelize');
const fetchAllDesignationsHelper = (request) => {
    let designations = null;
    try {
        let redisPromise = new Promise((resolve, reject) => {
            client.get("fetchAllDesignations", (err, value) => {
                if (err) throw err;
                if (value) {
                    console.log('Data from Redis', JSON.parse(value)[0]);
                    designations = JSON.parse(value);
                }
                else {
                    console.log('Data from postgres');
                    designations = fetchAllDesignationsPostgres();
                }
                if (designations !== null) {
                    resolve(designations)
                }
            });

        })
        return redisPromise;
    }
    catch (err) {
        throw Boom.internal('Failed to fetch all designations', err);
    }

}

const addDesignationHelper = async (request) => {
    let designations = null;
    try {
        console.log('hello', request.payload)
        let description = await Designation.create({ designation_name: request.payload.designation_name });
        let response = {
            'message': 'Added new record',
            'status': 'success',
            description
        };
        designations = fetchAllDesignationsPostgres();
        return response;
    }
    catch (err) {
        throw Boom.internal('Failed to add designations', err);
    }

}

const fetchAllDesignationsPostgres = async () => {
    try {
        let designations = await Designation.findAll(
            // { paranoid: false }
        )
            ;
        client.setex("fetchAllDesignations", 3800, JSON.stringify(designations));
        return designations;
    }
    catch (err) {
        throw Boom.internal('Failed to fetch all designations', err);
    }

}

const peopleInformation = async (request) => {
    try {
        const result = await People.sequelize.query(
            "SELECT p.people_first_name || ', ' ||p.people_last_name as full_name, p.people_address, p.people_phone_number,d.designation_name, string_agg(distinct (s.subject_name) ,',') as subjects_handled_by_teacher,string_agg(distinct (c.class_name) ,',') as classes_teacher,cl.class_name as class_teacher FROM people p inner join designations d on d.id =p.designation_id and d.designation_name ='Teacher' left join subject_class_teacher_mappings sctm on sctm.subject_teacher =p.id left join subjects s on s.id = sctm.subject_id and s.subject_status='Active' left join class_rooms c on c.id =sctm.class_id and c.class_status='Active' left join class_rooms cl on cl.class_teacher =p.id and cl.class_status='Active' group by p.people_first_name ,p.people_last_name , p.people_address, p.people_phone_number,d.designation_name,cl.class_name",
            {
                type: QueryTypes.SELECT
            }
        );
        return result;
    }
    catch (err) {
        throw Boom.internal('Failed to fetch people Info', err);
    }
}

module.exports = { fetchAllDesignationsPostgres, addDesignationHelper, fetchAllDesignationsHelper, peopleInformation }