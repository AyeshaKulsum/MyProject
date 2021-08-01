const { Sequelize } = require('sequelize');
const db = require('../config/database');

const ClassRoom = db.define('ClassRoom', {
    class_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    class_status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Active'
    }
}, {
    underscored: true,
})

ClassRoom.associate = (models) => {
    ClassRoom.belongsTo(models.People, {
        foreignKey: 'class_teacher'
    })
};

module.exports = ClassRoom;