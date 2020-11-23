const router = require('express').Router()
const bodyParser = require('body-parser')
const config = require('../config/config')
const jwt = require('jsonwebtoken')
const cors = require('cors')

router.use(bodyParser.json())

router.use(cors())
router.options('*', cors());

router.post("/login", (req, res) => {
    const {
        username,
        password
    } = req.body

    let user = config.users[username]
    if (user!=undefined && user.password === password) {
        var token = jwt.sign({
            userID: username.id,
        }, config.security.key, {
            expiresIn: 3600
        })
        res.status(200).send({
            "message": "successfully authenticated user",
            "token": token,
            "id":user.id
        })
        return 1;
    }

    res.status(401).send({
        "message": "incorrect username or password"
    });

});

router.post('/register', (req, res) => {
    if (Object.keys(req.body).length < 4) {
        res.status(400).send({
            "message": "Parameters missing"
        })
        return;
    }
    let {username,password,name,email}=req.body
    try{
        let id=Math.round(Math.random()*1e10)
        config.users[username] = {
            "name":name,
            "id":id,
            "email":email,
            "password":password
        }
        config.tasks[id]=[]    
        res.status(200).send({
            "message": "user created successfully"
        })
    }
    catch(e){
        res.status(500)
    }
});

module.exports = router