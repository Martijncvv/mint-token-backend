const express = require('express')
const User = require('./models').user
const Token = require('./models').token
const app = express()
const PORT = 4000

const cors = require('cors')
app.use(cors())

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

app.get('/users/:address', async (req, res, next) => {
	try {
		const address = parseInt(req.params.address)
		const users = await User.findAll()
		const user = await users.find((user) => user.address == address)

		if (!user) {
			res.status(404).send('User not found')
		} else {
			res.json(user)
		}
	} catch (e) {
		next(e)
	}
})

app.put('/users/:address', async (req, res, next) => {
	try {
		const address = req.body.address
		const tokenAmount = req.body.tokenAmount

		if (address.length !== 64) {
			res.status(404).send('Must provide valid address')
			return
		}
		if (tokenAmount === null || tokenAmount === undefined || tokenAmount < 0) {
			res.status(404).send('Must provide valid tokenAmount')
			return
		}
		const users = await User.findAll()
		const userToUpdate = await users.find((user) => user.address == address)

		const updatedUser = await userToUpdate.update(req.body)
		res.json(updatedUser)
	} catch (e) {
		next(e)
	}
})

app.delete('/users/:address', async (req, res, next) => {
	try {
		const users = await User.findAll()
		const userToDelete = await users.find((user) => user.address == address)
		if (!userToDelete) {
			res.status(404).send('User not found')
		} else {
			await userToDelete.destroy()
			console.log(userToDelete)
			res.status(204).send(`User ${userToDelete} deleted`)
		}
	} catch (e) {
		next(e)
	}
})

const port = process.env.PORT || PORT
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
