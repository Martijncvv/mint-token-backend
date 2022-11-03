'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class token extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
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
