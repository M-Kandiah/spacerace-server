const request = require('supertest')
const mongoose = require('mongoose');
const User = require('../../models/userMon')
const app = require('../../server')

describe('user routing', () => {
    let api;
    let token;
    beforeAll(async () => {
        const url = `mongodb+srv://mathusankandiah:spaceracepassword@cluster0.kyf40.mongodb.net/test`
        await mongoose.connect(url, {useNewUrlParser: true})
        api = app.listen(5000, () => console.log('test server running on port 5000'))
        const getToken = await request(api).post('/auth/login').send({
            username: "test2",
            password: "123"
        });
        token = getToken.body.token;
    })

    afterAll(async () => {
        console.log('gracefully stopping test server')
        await api.close()
      })

    test('find all users', async () => {
        const res = await request(api).get('/users').set('authorization', token)
        expect(res.status).toBe(200)
        expect(res.body.length).toBe(1)
    });

    test('return a single user', async () => {
        const res = await request(api).get('/users/617a809253c138fb76ca79a9').set('authorization', token)
        expect(res.status).toBe(200)
        expect(res.body.username).toBe('test2')
    })

    test('update points for a single user', async () => {
        const res = await request(api).patch('/users/617a809253c138fb76ca79a9/points').set('authorization', token).send({
            points: 10
        });
        expect(res.status).toBe(200)
    })

    test('update wins for a single user', async () => {
        const res = await request(api).patch('/users/617a809253c138fb76ca79a9/wins').set('authorization', token)
        expect(res.status).toBe(200)
    })

})