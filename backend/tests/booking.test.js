// tests/booking.test.js
const request = require('supertest');
const app = require('../server');

let token;

beforeAll(async () => {
  token = global.testContext.token;
  if (!token) {
    throw new Error('No token found in global.testContext');
  }
});

describe('Booking API', () => {
  test('should create a new booking', async () => {
    const bookingData = {
      owner_id: global.testContext.userId, // Use the registered user's ID 
      sitter_id: global.testContext.userId, 
      pet_type: 'dog',
      pet_id: 1, 
      service_type: 'Dog Walking',
      weekday: 'Sun',
      time_slot: '10:00-11:00',
      language: 'English',
    };

    try {
      const response = await request(app)
        .post('/api/bookings/')
        .set('Authorization', `Bearer ${token}`)
        .send(bookingData);

      console.log('Booking response:', response.body);
      expect(response.statusCode).toBe(201);
    } catch (error) {
      console.error('Error response:', error.response?.data || error.message);
      throw error;
    }
  });
});
