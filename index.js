const express = require('express')
const uuid = require('uuid')

const app = express()
app.use(express.json())

const users = []

const checkUserId = (req, res, next) => {
    const { id } = req.params

    const index = users.findIndex( user => user.id === id)

    if(index < 0) {
        return res.status(404).json({ error: "User not found"})
    }

    req.userIndex = index
    req.userId = id

    next()
}

app.get('/users', (req, res) => {   
   return res.json(users)
})

app.post('/users', (req, res) => {
    const { name, age } = req.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return res.status(201).json(user)
})

app.put('/users/:id', checkUserId, (req, res) => {  
    const { name, age } = req.body
    const index = req.userIndex
    const id = req.userId
    
    const updatedUser = { id, name, age }

    users[index] = updatedUser

    return res.json(updatedUser)
 })

 app.delete('/users/:id', checkUserId, (req, res) => {
    const index = req.userIndex
    
    users.splice(index, 1)

    return res.status(204).json()
 })

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000')
})