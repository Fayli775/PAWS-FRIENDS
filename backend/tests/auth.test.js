// backend/tests/auth.test.js

const request = require('supertest');
const app = require('../server');

describe('Auth Routes', () => {
    it('should login the newly registered user again', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: global.testContext.email,
                password: global.testContext.password,
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should check if email exists and return not unique', async () => {
        const res = await request(app)
            .get(`/api/auth/checkEmail?email=${global.testContext.email}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('isUnique', false);
    });
});
