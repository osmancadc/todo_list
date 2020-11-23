const config = require('../config/config')
const router = require('express').Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const cors = require('cors')

router.use(bodyParser.json())

router.use(cors())
router.options('*', cors());


router.get("/get/:id", (req, res) => {
    if(Object.keys(req.params).length<1){
        res.sendStatus(400)
        return
    }   
    try {   
        let decoded = jwt.verify(req.headers.authorization.split(" ")[1], config.security.key);
        res.status(200).send({
            data: config.tasks[`${req.params.id}`]
        })
    } catch (err) {
        res.sendStatus(403)
    }
});

router.get("/get/:id/:text", (req, res) => {
    if(Object.keys(req.params).length<2){
        res.sendStatus(400)
        return
    }     
    try {
        let {
            id,
            text
        } = req.params
        let decoded = jwt.verify(req.headers.authorization.split(" ")[1], config.security.key);
        res.status(200).send({
            data: config.tasks[id].filter(t => t.description.indexOf(text)!=-1)
        })
    } catch (err) {
        res.sendStatus(403)
    }
});

router.post('/add', (req, res) => {
    if(Object.keys(req.body).length<1){
        res.sendStatus(400)
        return
    }   
    try {
        let decoded = jwt.verify(req.headers.authorization.split(" ")[1], config.security.key);
        let {
            user
        } = req.body
        config.tasks[user].unshift({
            title: 'Insert title',
            description: 'Insert description here',
            id: Math.round(Math.random() * 1e10),
            status: 0
        })
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(403)
    }
})

router.put('/put/:user/:task/:data', (req, res) => {
    if(Object.keys(req.params).length<3){
        res.sendStatus(400)
        return
    }   
    try {
        let decoded = jwt.verify(req.headers.authorization.split(" ")[1], config.security.key);
        let {
            user,
            task,
            data
        } = req.params
        let task_template = config.tasks[user].find(t => t.id == task)
        data = JSON.parse(data)
        for (k of Object.keys(data))
            task_template[k] = data[k]
        for (let i = 0; i < config.tasks[user]; i++) {
            if (config.tasks[user][i].id == task)
                config.tasks[user].splice(i, 1, task_template)
        }
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(403)
    }
})

router.delete('/delete', (req, res) => {
    if(Object.keys(req.body).length<2){
        res.sendStatus(400)
        return
    }   
    try {
        let decoded = jwt.verify(req.headers.authorization.split(" ")[1], config.security.key);
        let {
            user,
            task
        } = req.body
        config.tasks[user] = config.tasks[user].filter(t => t.id != task)
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(403)
    }
})


module.exports = router