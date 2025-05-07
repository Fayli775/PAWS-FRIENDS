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

    // 读取一个mock图片文件，变成buffer
    const imagePath = path.join(__dirname, 'mock-avatar.png');
    if (!fs.existsSync(imagePath)) {
        throw new Error('mock-avatar.png not found in tests folder. Please add a dummy image file.');
    }
    avatarBuffer = fs.readFileSync(imagePath);

    // 注册
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

    // 登录
    const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
            email: newUser.email,
            password: newUser.password,
        });

    expect(loginRes.statusCode).toBe(200);
    global.testContext.token = loginRes.body.token;
});
