// backend/tests/user.test.js
const request = require('supertest');
const app = require('../server');
const path = require('path');

describe('User Routes', () => {
    it('should get user profile by ID', async () => {
        const res = await request(app)
            .get(`/api/users/${global.testContext.userId}`)
            .set('Authorization', `Bearer ${global.testContext.token}`);
        expect(res.statusCode).toBe(200);
    });

    it('should update user profile with new bio', async () => {
        const res = await request(app)
            .put('/api/users/me/updateProfile')
            .set('Authorization', `Bearer ${global.testContext.token}`)
            .field('bio', 'New bio from test user')
            .attach('avatar', path.join(__dirname, '../public/images/uploads/avatars/user2_avatar.png'));
        expect(res.statusCode).toBe(200);
    });

    it('should update user password', async () => {
        const res = await request(app)
            .put(`/api/users/updatePassword/${global.testContext.userId}`)
            .set('Authorization', `Bearer ${global.testContext.token}`)
            .send({
                currentPassword: global.testContext.password, 
                newPassword: 'Password456!',
            });

        expect(res.statusCode).toBe(200);

        
        global.testContext.password = 'Password456!';
    });

    it('should search sitters', async () => {
        const res = await request(app)
            .get('/api/users/sitters/search')
            .set('Authorization', `Bearer ${global.testContext.token}`);

        expect(res.statusCode).toBe(200);
    });
});
