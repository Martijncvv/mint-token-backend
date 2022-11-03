'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'tokens',
			[
				{
					address: '0x927DFb9e957526e4D40448d6D05A39ea39a2ee6B',
					name: 'TestToken',
					symbol: 'TTK',
					network: 'Goerli',
				},
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('tokens', null, {})
	},
}
