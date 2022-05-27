'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user,{
        as: "receiverUser",
        foreignKey: {
          name: "receiver"
        }
      })
      transaction.belongsTo(models.user,{
        as: "senderUser",
        foreignKey: {
          name: "sender"
        }
      })
    }
  }
  transaction.init({
    receiver: DataTypes.INTEGER,
    nominal: DataTypes.INTEGER,
    sender: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};