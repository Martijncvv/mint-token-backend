'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			address: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			tokenAmount: {
				type: Sequelize.NUMERIC(78, 0),
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: new Date(),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: new Date(),
			},
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('users')
	},
}
