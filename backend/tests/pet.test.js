// backend/tests/pet.test.js

const request = require('supertest');
const app = require('../server');
const path = require('path');

let petId = '';

describe('Pet Routes', () => {
    it('should add a new pet', async () => {
        const res = await request(app)
            .post('/api/pets/addNewPet')
            .set('Authorization', `Bearer ${global.testContext.token}`)
            .field('name', 'Fluffy')
            .field('type', 'dog')
            .field('age', 2)
            .attach('petPhoto', path.join(__dirname, '../public/images/uploads/avatars/user3_avatar.png'));

        expect(res.statusCode).toBe(201);
        petId = res.body.petId;
    });

    it('should get my pets', async () => {
        const res = await request(app)
            .get('/api/pets/get/my')
            .set('Authorization', `Bearer ${global.testContext.token}`);
        expect(res.statusCode).toBe(200);
    });

    it('should update pet info', async () => {
        const res = await request(app)
            .put(`/api/pets/updatePet/${petId}`)
            .set('Authorization', `Bearer ${global.testContext.token}`)
            .send({ name: 'Fluffy Updated' });

        expect(res.statusCode).toBe(200);
    });

    it('should delete pet', async () => {
        const res = await request(app)
            .delete(`/api/pets/deletePet/${petId}`)
            .set('Authorization', `Bearer ${global.testContext.token}`);

        expect(res.statusCode).toBe(200);
    });
});
