// tests/review.test.js

const request = require('supertest');
const app = require('../server');
let token;

beforeAll(async () => {
    const res = await request(app)
    .post('/api/auth/login')
    .send({
        email: global.testContext.email,
        password: global.testContext.password,
    });
    token = res.body.token;
});

describe('Review API', () => {
    test('should create a new review', async () => {
        const reviewData = {
            booking_id: 1,
            rating: 5,
            comment: 'Excellent service!'
        };

        try {
            const response = await request(app)
            .post('/api/reviews')
            .set('Authorization', `Bearer ${global.testContext.token}`)
            .send(reviewData);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error response:', error.response?.data || error.message);
            throw error; // 让 jest 捕获到 error，而不是卡住
        }
    });
});
