const { Sequelize } = require('sequelize');
const db = require('../config/database');

const Subject = db.define('Subject', {
    subject_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subject_status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Active'
    }
}, {
    underscored: true,
})


module.exports = Subject;