const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
connectionString = 'mongodb+srv://dbUser:dbUserPassword@cluster0.wjqhr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
MongoClient.connect(connectionString, {
	// Maybe don't need to add.
	useUnifiedTopology: true
})
	.then(client => {
		console.log('Connected to Database')
		const db = client.db('star-wars-quotes')
		const quotesCollection = db.collection('quotes')
		app.use(bodyParser.urlencoded({ extended: true }))
		app.get('/', (req, res) => {
			res.sendFile(__dirname + '/index.html')
		})
		app.post('/quotes', (req, res) => {
			quotesCollection.insertOne(req.body)
			.then(result => {
				console.log(result)
			})
			.catch(error => console.error(error))
		})
		app.listen(3000,function() {
			console.log('listening on 3000')
		})
	})
	.catch(console.error)
