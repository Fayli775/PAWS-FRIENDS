// tests/review.test.js
const axios = require('axios');

const BASE_URL = 'http://localhost:8000';

let token;

beforeAll(async () => {
    const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: 'alice@example.com',
        password: 'alice123'
    });
    token = res.data.token;
});

describe('Review API', () => {
    test('should create a new review', async () => {
        const reviewData = {
            booking_id: 1,
            sitter_id: 2,
            rating: 5,
            comment: 'Excellent service!'
        };

        try {
            const response = await axios.post(`${BASE_URL}/api/reviews`, reviewData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty('reviewId');
        } catch (error) {
            console.error('Error response:', error.response?.data || error.message);
            throw error; // 让 jest 捕获到 error，而不是卡住
        }
    });
});
