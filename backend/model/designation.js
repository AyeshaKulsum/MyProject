const { Sequelize } = require('sequelize');
const db = require('../config/database');

const Designation = db.define('Designation', {
  // Model attributes are defined here
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  designation_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  designation_status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Active'
  }
}, {
  // Other model options go here
  // tableName: 'designation',
  // createdAt: false,
  // updatedAt: false,
  underscored: true,
  //paranoid: true,
  indexes: [
    {
      unique: false,
      fields: ['designation_name']
    }
  ]
}

);
// Designation.associate = (models) => {
//   Designation.belongsTo(models.People, {
//     allowNull: false,
//   });
// };
// `sequelize.define` also returns the model
// console.log(Designation === db.models.Designation);

module.exports = Designation
