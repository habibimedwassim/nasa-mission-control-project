import request from 'supertest';
import { app } from '../../app.js';
describe('Test GET: /launches', () => {
    test('It should respond with 200 SUCCESS', async () => {
        await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
    });
});

describe('Test POST: /launches', () => {
    const completeLaunchData = {
        mission: 'mission test',
        rocket: 'rocket test',
        target: 'target test',
        launchDate: 'February 20, 1995',
    };

    const incompleteLaunchData = {
        mission: 'mission test',
        rocket: 'rocket test',
        target: 'target test',
    };

    const invalidDateLaunchData = {
        mission: 'mission test',
        rocket: 'rocket test',
        target: 'target test',
        launchDate: 'February 32, 1995',
    };

    test('It should respond with 201 SUCCESS', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);

        Object.assign(
            incompleteLaunchData,
            new Date(completeLaunchData.launchDate)
        );
        expect(response.body).toMatchObject(incompleteLaunchData);
    });

    test('It should catch missing required properties (400) ', async () => {
        const response = await request(app)
            .post('/launches')
            .send(incompleteLaunchData)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body).toStrictEqual({
            error: 'Missing launch property !!',
        });
    });

    test('It should catch Invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(invalidDateLaunchData)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body).toStrictEqual({
            error: 'Please enter a valid date !!',
        });
    });
});
