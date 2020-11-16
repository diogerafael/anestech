import User, { UserI } from '@src/models/user.model';
import Task from "@src/models/task.model";
import AuthService from '@src/services/auth';

describe('Task functional tests', () => {
    let defaultUser: any = {
        name: 'Fulano da Silva',
        email: 'fulano@gmail.com',
        password: '1234'
    };

    let token = '';

    beforeEach(async () => {

        await Task.destroy({
            where: {},
        });

        await User.destroy({
            where: {},
        });


        const userForToken = await User.create({
            name: 'Temp User da Silva',
            email: 'token@mail.com',
            password: '1234'
        });


        token = AuthService.generateToken(userForToken.toJSON())

    });


    afterEach(async () => {
        await Task.destroy({
            where: {},
        });

        await User.destroy({
            where: {},
        });
    });


    describe('Create a new Task', () => {
        it('should creating a new task', async () => {
            const newTask = {
                description: 'New Task',
                startDate: new Date(),
                endDate: new Date(),
                userId: defaultUser?.id
            };

            const response = await global.testRequest.post('/tasks').send(newTask).set({ 'x-access-token': token });

            expect(response.status).toBe(201);
        });





        it('should create a new task without description', async () => {
            const newTask = {
                startDate: new Date(),
                endDate: new Date(),
                userId: defaultUser?.id
            };

            const response = await global.testRequest.post('/tasks').send(newTask).set({ 'x-access-token': token });

            expect(response.status).toBe(422)
        });


        it('should create a new task without start date', async () => {
            const newTask = {
                description: 'Descrição de uma vaga',
                endDate: new Date(),
                userId: defaultUser?.id
            };

            const response = await global.testRequest.post('/tasks').send(newTask).set({ 'x-access-token': token });

            expect(response.status).toBe(422)
        });


    });




});