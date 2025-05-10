// tests/booking.test.js
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

describe('Booking API', () => {
    test('should create a new booking', async () => {
        const bookingData = {
            'owner_id':5,
            'sitter_id':1,
            'pet_type':'dog',
            'pet_id': 7,
            'service_type':'Dog Walking',
            'weekday': 'Sun',        // ⬅ 前端传入的 weekday（例如 "Mon"）
            'time_slot': '09:00-10:00',    // ⬅ 前端传入的时间段（例如 "09:00–10:00"）
            'language': 'English'
        };

        try {
            const response = await request(app)
                .post('/api/bookings/')
                .set('Authorization', `Bearer ${global.testContext.token}`)
                .send(bookingData);
            expect(response.statusCode).toBe(201);
        } catch (error) {
            console.error('Error response:', error.response?.data || error.message);
            throw error;
        }
    });
});
