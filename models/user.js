'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class user extends Model {
		static associate(models) {}
	}
	user.init(
		{
			address: { type: DataTypes.STRING, allowNull: false, unique: true },
			tokenAmount: { type: DataTypes.INTEGER, allowNull: false },
		},
		{
			sequelize,
			modelName: 'user',
		}
	)
	return user
}
