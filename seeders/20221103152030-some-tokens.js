'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'tokens',
			[
				{
					address: '0x473780deAF4a2Ac070BBbA936B0cdefe7F267dFc',
					name: 'TestToken',
					symbol: 'TT',
					network: 'Ethereum',
				},
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('tokens', null, {})
	},
}
