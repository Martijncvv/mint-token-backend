'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class token extends Model {
		static associate(models) {}
	}
	token.init(
		{
			address: { type: DataTypes.STRING, allowNull: false },
			name: { type: DataTypes.STRING, allowNull: false },
			symbol: { type: DataTypes.STRING, allowNull: false },
			network: { type: DataTypes.STRING, allowNull: false },
		},
		{
			sequelize,
			modelName: 'token',
		}
	)
	return token
}
