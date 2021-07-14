const { Sequelize } = require('sequelize');
const db = require('../config/database');
const Designation = require('./designation');

const People = db.define('People', {
    // people_id: {
    //     type: Sequelize.BIGINT,
    //     allowNull: false,
    //     primaryKey: true,
    //     autoIncrement: true
    // },
    people_first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    people_last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    people_address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    people_phone_number: {
        type: Sequelize.BIGINT,
        allowNull: false
    }
}, {
    instanceMethods: {
        getFullname: function () {
            return [this.people_first_name, this.people_last_name].join(' ')
        }
    },
    // timestamps: false,
    // tableName: 'people',
    underscored: true,
    //     deletedAt: 'destroyTime',
    //   paranoid: true
    // paranoid: true,
})
// People.hasOne(Designation, { foreignKey: 'people_designation_id' })
People.associate = (models) => {
    People.hasOne(models.Designation, {
        // foreignKey: 'people_designation_id',
    })
    // People.hasOne(Designation, {
    //     foreignKey: 'people_designation_id',
    //     targetKey: 'designation_id'
    // });
};

module.exports = People;
