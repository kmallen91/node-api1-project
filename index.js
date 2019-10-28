const express = require('express')

const db = require('./data/db.js')

server.use(express.json())

server.post('/api/users', (req, res) => {
    const user = req.body

    db.insert(user)
        .then(user => res.status(201).json(user))
        .catch(err => {
            console.log(err, 'err')
            res.status(500).json({ response: "ERROR"})
        })
})

server.get('/api/users' , (req, res) => {
    db.find()
        .then(users => res.status(200).json(users))
        .catch(err => {
            res.status(500).json( {response: 'Unable to fetch users'})
        })
})

server.get('api/users/:id', (req, res) => {
    const { id } = req.params
    console.log(id)
    db.findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            }
            else {
                res.status(400).json({response: 'user not found'})
            }
        })
        .catch(err => {
            res.status(500).json({response: 'GET ERROR'})
        })

})