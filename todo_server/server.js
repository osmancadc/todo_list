const express = require('express')

const app = express()
const port = 4200

const accessController = require('./controller/accessController.js');
const taskController = require('./controller/taskController.js');

app.use('/access', accessController)
app.use('/task', taskController)

app.listen(process.env.PORT || port, () => {
    console.log("Servidor esperando en el puerto " + port)
})

module.exports = app