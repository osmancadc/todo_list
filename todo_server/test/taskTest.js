const assert = require('assert')
const request = require('supertest')
const app = require('../server')

const data=JSON.stringify({status:0})

describe('Task module test', () => {
    it('.../get all task stored for a user', done => {
        request(app)
            .post('/access/login')
            .send({
                username: 'osmancadc',
                password: '1234'
            })
            .end((err, res) => {
                request(app)
                    .get(`/task/get/${res.body.id}`)
                    .set('Authorization', 'Brearer ' + res.body.token)
                    .end((err, res) => {
                        assert(res.status == 200)
                        done()
                    })
            })
    });

    it('.../get all task stored for a user with specific text', done => {
        request(app)
            .post('/access/login')
            .send({
                username: 'osmancadc',
                password: '1234'
            })
            .end((err, res) => {
                request(app)
                    .get(`/task/get/${res.body.id}/lorem`)
                    .set('Authorization', 'Brearer ' + res.body.token)
                    .end((err, res) => {
                        assert(res.status == 200)
                        done()
                    })
            })
    });

    it('.../get all task stored for a user (Without id)', done => {
        request(app)
            .post('/access/login')
            .send({
                username: 'osmancadc',
                password: '1234'
            })
            .end((err, res) => {
                request(app)
                    .get(`/task/get`)
                    .set('Authorization', 'Brearer ' + res.body.token)
                    .end((err, res) => {
                        assert(res.status == 404)
                        done()
                    })
            })
    });

    it('.../add a new task to a user', done => {
        request(app)
            .post('/access/login')
            .send({
                username: 'osmancadc',
                password: '1234'
            })
            .end((err, res) => {
                request(app)
                    .post(`/task/add`)
                    .send({
                        user: res.body.id
                    })
                    .set('Authorization', 'Brearer ' + res.body.token)
                    .end((err, res) => {
                        assert(res.status == 200)
                        done()
                    })
            })
    });

    it('.../add a new task to a user (Without user id)', done => {
        request(app)
            .post('/access/login')
            .send({
                username: 'osmancadc',
                password: '1234'
            })
            .end((err, res) => {
                request(app)
                    .post(`/task/add`)
                    .set('Authorization', 'Brearer ' + res.body.token)
                    .end((err, res) => {
                        assert(res.status == 400)
                        done()
                    })
            })
    });

    it('.../put a new item to a specific task ', done => {
        request(app)
            .post('/access/login')
            .send({
                username: 'osmancadc',
                password: '1234'
            })
            .end((err, res) => {
                request(app)
                    .put(`/task/put/${res.body.id}/177227/${data}`)
                    .set('Authorization', 'Brearer ' + res.body.token)
                    .end((err, res) => {
                        assert(res.status == 200)
                        done()
                    })
            })
    });

    it('.../put a new item to a specific task (Without data)', done => {
        request(app)
            .post('/access/login')
            .send({
                username: 'osmancadc',
                password: '1234'
            })
            .end((err, res) => {
                request(app)
                    .put(`/task/put/${res.body.id}/177227`)
                    .set('Authorization', 'Brearer ' + res.body.token)
                    .end((err, res) => {
                        assert(res.status == 404)
                        done()
                    })
            })
    });

    it('.../put a new item to a specific task (Without data)', done => {
        request(app)
            .post('/access/login')
            .send({
                username: 'osmancadc',
                password: '1234'
            })
            .end((err, res) => {
                request(app)
                    .delete(`/task/delete`)
                    .send({
                        user:res.body.id,
                        task:177227
                    })
                    .set('Authorization', 'Brearer ' + res.body.token)
                    .end((err, res) => {
                        assert(res.status == 200)
                        done()
                    })
            })
    });

    it('.../put a new item to a specific task (Without data)', done => {
        request(app)
            .post('/access/login')
            .send({
                username: 'osmancadc',
                password: '1234'
            })
            .end((err, res) => {
                request(app)
                    .delete(`/task/delete`)
                    .set('Authorization', 'Brearer ' + res.body.token)
                    .end((err, res) => {
                        assert(res.status == 400)
                        done()
                    })
            })
    });


})