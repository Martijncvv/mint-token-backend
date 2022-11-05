const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())

const User = require('./models').user
const PORT = 4000

app.use(express.json())

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
		console.log('userToUpdate ', userToUpdate)
		const user = await userToUpdate.update({
			address,
			tokenAmount,
		})
		res.status(200).send({ message: 'User updated:', user })
	} catch (e) {
		next(e)
	}
})

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
			res.status(404).send('User not found')
		} else {
			const deletedUser = await userToDelete.destroy()
			console.log(deletedUser)
			return res.status(204).send({ message: 'User deleted', deletedUser })
		}
	} catch (e) {
		next(e)
	}
})

const port = process.env.PORT || PORT
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
