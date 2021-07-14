const Boom = require('@hapi/boom');
const Designation = require('../model/designation');
const client = require('../config/redis')

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
        let designations = await Designation.findAll({ paranoid: false });
        client.setex("fetchAllDesignations", 3800, JSON.stringify(designations));
        return designations;
    }
    catch (err) {
        throw Boom.internal('Failed to fetch all designations', err);
    }

}



module.exports = { fetchAllDesignationsPostgres, addDesignationHelper, fetchAllDesignationsHelper }