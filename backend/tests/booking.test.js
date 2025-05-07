// tests/booking.test.js
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

describe('Booking API', () => {
    test('should create a new booking', async () => {
        const bookingData = {
            pet_id: 1,
            sitter_id: 2,
            start_time: '2025-05-01 08:00:00',
            end_time: '2025-05-01 10:00:00',
            special_requirements: 'Needs extra care'
        };

        try {
            const response = await axios.post(`${BASE_URL}/api/bookings`, bookingData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty('bookingId');
        } catch (error) {
            console.error('Error response:', error.response?.data || error.message);
            throw error;
        }
    });
});
