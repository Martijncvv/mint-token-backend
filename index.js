const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())

/// @title Backend User-Data API
/// @author Martijncvv
/// @notice API to store and update user data
/// @notice This is an example API
const User = require('./models').user
const PORT = 4000
app.use(express.json())

/// @notice GETs all data of stored users
/// @return All data of users in json format
app.get('/users', async (req, res) => {
	try {
		const users = await User.findAll()
		if (!users) {
			res.status(404).send('Users not found')
		} else {
			res.json(users)
		}
	} catch (e) {
		next(e)
	}
})

/// @notice GETs all data of user address
/// @param address: Address of user
/// @return All data of specified user
app.get('/user/:address', async (req, res, next) => {
	try {
		const { address } = req.params

		const users = await User.findAll()
		const user = await users.find((user) => user.dataValues.address == address)

		if (!user) {
			res.status(200).send({ message: 'NO-USER' })
		} else {
			res.status(200).send({ message: 'USER-FOUND', user })
		}
	} catch (e) {
		next(e)
	}
})

/// @notice POSTs tokendata for new user address
/// @notice Must be new user. Use PUT to update existing user
/// @param address: Address of user
/// @param tokenAmount: Token amount of user in wei format
/// @return Data of added user
app.post('/user/:address/:tokenAmount', async (req, res, next) => {
	try {
		const address = req.params.address
		const tokenAmount = Number(req.params.tokenAmount)
		console.log('address ', address)
		console.log('tokenAmount ', tokenAmount)
		if (address.length !== 42) {
			res.status(404).send({ message: 'Must provide valid address' })
			return
		}
		if (!(tokenAmount >= 0)) {
			res.status(404).send({ message: 'Must provide valid tokenAmount' })
			return
		}

		const user = await User.create({
			address,
			tokenAmount,
		})
		res.status(200).send({ message: 'user created', user })
	} catch (e) {
		next(e)
	}
})

/// @notice UPDATES tokendata of existing user address
/// @notice Must be existing user. Use POST to add new user
/// @param address: Address of user
/// @param tokenAmount: Token amount of user in wei format
/// @return Data of updated user
app.put('/user/:address/:tokenAmount', async (req, res, next) => {
	try {
		const address = req.params.address
		const tokenAmount = Number(req.params.tokenAmount)
		console.log('address ', address)
		console.log('tokenAmount ', tokenAmount)

		if (address.length !== 42) {
			res.status(404).send({ message: 'Must provide valid address' })
			return
		}
		if (!(tokenAmount >= 0)) {
			res.status(404).send({ message: 'Must provide valid tokenAmount' })
			return
		}
		const users = await User.findAll()
		const userToUpdate = await users.find(
			(user) => user.dataValues.address == address
		)
		if (!userToUpdate) {
			res.status(200).send({ message: 'USER-NOT-FOUND' })
		} else {
			const user = await userToUpdate.update({
				address,
				tokenAmount,
			})
			res.status(200).send({ message: 'User updated:', user })
		}
	} catch (e) {
		next(e)
	}
})

/// @notice DELETE all data specified user address
/// @param address: Address of user
/// @return Data of deleted user
app.delete('/user/:address', async (req, res, next) => {
	try {
		const { address } = req.params

		if (address.length !== 42) {
			res.status(404).send({ message: 'Must provide valid address' })
			return
		}

		const users = await User.findAll()
		const userToDelete = await users.find(
			(user) => user.dataValues.address == address
		)
		if (!userToDelete) {
			res.status(404).send({ message: 'USER-NOT-FOUND' })
		} else {
			const deletedUser = await userToDelete.destroy()
			console.log(deletedUser)
			return res.status(204).send({ message: 'User deleted', userToDelete })
		}
	} catch (e) {
		next(e)
	}
})

const port = process.env.PORT || PORT
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
