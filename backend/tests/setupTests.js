// backend/tests/setupTests.js

const request = require('supertest');
const app = require('../server');
const path = require('path');
const fs = require('fs');

let avatarBuffer;

beforeAll(async () => {
    const randomSuffix = Date.now();
    const newUser = {
        username: `TestUser_${randomSuffix}`,
        email: `testuser_${randomSuffix}@example.com`,
        password: 'Password123!',
    };

    
    const imagePath = path.join(__dirname, 'mock-avatar.png');
    if (!fs.existsSync(imagePath)) {
        throw new Error('mock-avatar.png not found in tests folder. Please add a dummy image file.');
    }
    avatarBuffer = fs.readFileSync(imagePath);

 
    const registerRes = await request(app)
        .post('/api/auth/register')
        .field('user_name', newUser.username)
        .field('email', newUser.email)
        .field('password', newUser.password)
        .attach('avatar', avatarBuffer, 'user1_avatar.png');

    expect(registerRes.statusCode).toBe(201);

    global.testContext = {
        userId: registerRes.body.user.id,
        email: newUser.email,
        password: newUser.password,
        token: '',
    };

    
    const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
            email: newUser.email,
            password: newUser.password,
        });

    expect(loginRes.statusCode).toBe(200);
    global.testContext.token = loginRes.body.token;
});

const pool = require('../config/db');

afterAll(async () => {
    const dbName = process.env.DB_NAME;
    if (dbName === 'paws_friends_test') {
        const connection = await pool.getConnection();

        const tables = [
            "user_languages",
            "user_certificates",
            "sitter_services",
            "service_pet_types",
            "service_languages",
            "services",
            "notice_info",
            "location_reviews",
            "booking_complain",
            "booking_review",
            "booking_status_log",
            "booking",
            "availability",
            "pet_info",
            "locations",
            "user_info"
        ];

        await connection.query(`SET FOREIGN_KEY_CHECKS = 0`);
        for (const table of tables) {
            await connection.query(`TRUNCATE TABLE \`${table}\``); 
        }
        await connection.query(`SET FOREIGN_KEY_CHECKS = 1`);

        connection.release();
        console.log('Test database cleanup complete.');
    } else {
        console.warn('Skipping test cleanup: Not connected to test DB');
    }

    await pool.end();
});

