'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'users',
			[
				{
					address: '0x473780deAF4a2Ac070BBbA936B0cdefe7F267dFc',
					tokenAmount: 123000,
				},
				{
					address: '0xA1a547358A9Ca8E7b320d7742729e3334Ad96546',
					tokenAmount: 63000,
				},
				{
					address: '0xDAFEA492D9c6733ae3d56b7Ed1ADB60692c98Bc5',
					tokenAmount: 0,
				},
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', null, {})
	},
}
