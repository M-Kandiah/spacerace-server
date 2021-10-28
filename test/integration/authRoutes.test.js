const request = require('supertest')
const mongoose = require('mongoose');
const User = require('../../models/userMon')
const app = require('../../server')

describe('auth endpoints', () => {
    let api;

     beforeAll(async () => {
        const url = `mongodb+srv://mathusankandiah:spaceracepassword@cluster0.kyf40.mongodb.net/test`
        await mongoose.connect(url, {useNewUrlParser: true})
        api = app.listen(5000, () => console.log('test server running on port 5000'))
     })

    afterAll(async () => {
        console.log('gracefully stopping test server')
        await User.deleteOne({username: 'test3'}, function(err, result) {
            if (err) {
              console.log(err);
            }
        })
        await api.close()
      });

    test('can create a new user', async () => {
        const res = await request(api).post('/auth/register').send({
            username: 'test3',
            password: "abc"
        });
        expect(res.status).toEqual(201);
        expect(res.body.message).toBe("User has been created successfully");
    })

    test('can login', async () => {
        const res = await request(api).post('/auth/login').send({
            username: "test2",
            password: "123"
        })
        expect(res.status).toEqual(200);
        expect(res.body.success).toBe(true)
    })
})