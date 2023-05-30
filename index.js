const express = require('express')
const app = express()
const port = 3000
const { connectToDb, getDb, findUser } = require('./db')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

// db connection
let db

connectToDb(async (err) => {
    if(!err){
        const users = await findUser();
        app.listen(3001, () => console.log(users))
    }
    db = getDb()
})

app.get('/', (req, res) => {
    res.send(`<h1>teste</h1>`)
})

app.get('/users', (req, res) => {
    res.json('Rodando!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})