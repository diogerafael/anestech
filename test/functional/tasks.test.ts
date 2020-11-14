import User, { UserI } from '@src/models/user.model';
import Task from "@src/models/task.model";

describe('Task functional tests', () => {
    let defaultUser: any = {
        name: 'Fulano da Silva',
        email: 'fulano@gmail.com',
        password: '1234'
    };


    beforeEach(async () => {

        await Task.destroy({
            where: {},
        });

        await User.destroy({
            where: {},
        });
    });


    afterEach(async () => {
        await Task.destroy({
            where: {},
        });

        await User.destroy({
            where: {},
        });
    });

    it('should creating a new task', async () => {
        const newTask = {
            description: 'New Task',
            startDate: new Date(),
            endDate: new Date(),
            userId: defaultUser?.id
        };

        const response = await global.testRequest.post('/tasks').send(newTask);

        expect(response.status).toBe(201);

    });


    it('should create a new task without description', async () => {
        const newTask = {
            startDate: new Date(),
            endDate: new Date(),
            userId: defaultUser?.id
        };

        const response = await global.testRequest.post('/tasks').send(newTask);

        expect(response.status).toBe(422)
    });

});