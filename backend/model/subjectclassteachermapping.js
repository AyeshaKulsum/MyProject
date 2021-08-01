const Sequelize = require('sequelize')
const db = require('../config/database')


const SubjectClassTeacherMapping = db.define('SubjectClassTeacherMapping',
    {

    },
    {
        underscored: true
    })


SubjectClassTeacherMapping.associate = (models) => {
    SubjectClassTeacherMapping.belongsTo(models.ClassRoom, {
        foreignKey: 'class_id'
    })
    SubjectClassTeacherMapping.belongsTo(models.Subject, {
        foreignKey: 'subject_id'
    })
    SubjectClassTeacherMapping.belongsTo(models.People, {
        foreignKey: 'subject_teacher'
    })
};

module.exports = SubjectClassTeacherMapping;