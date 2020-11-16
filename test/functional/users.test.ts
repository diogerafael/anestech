import Task from "@src/models/task.model";
import User from "@src/models/user.model"
import AuthService from "@src/services/auth";
import { create } from "domain";
import { response } from "express";
import { StatusCodes } from "http-status-codes";

describe('Users functional tests', () => {

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


        token = AuthService.generateToken(userForToken.toJSON());

    });


    afterEach(async () => {
        await Task.destroy({
            where: {},
        });

        await User.destroy({
            where: {},
        });
    });

    describe('When creating a new user', () => {

        it('should create a new user encrypted password', async () => {
            const newUser = {
                name: 'Fulano da Silva',
                email: 'fulano@mail.com',
                password: '1234'
            };

            const response = await global.testRequest.post('/users').send(newUser)
                .set({ 'x-access-token': token });;


            expect(response.status).toBe(201);
            expect(AuthService.comparePasswords(newUser.password, response.body.password)).resolves.toBeTruthy();
        });


        // it('should return 422 when there is a validation error', async () => {
        //     const newUser = {
        //         email: 'fulano@gmail.com',
        //         password: '1234'
        //     }

        //     const response = await global.testRequest.post('/users').send(newUser);
        //     expect(response.status).toBe(422);
        //     expect(response.body).toEqual({
        //         error: 'notNull Violation: User.name cannot be null',
        //     });
        // });



        // it('Should return 409 when the email already exists', async () => {
        //     const newUser = {
        //         name: 'Fulano da Silva',
        //         email: 'fulano@gmail.com',
        //         password: '1234',
        //     };
        //     await global.testRequest.post('/users').send(newUser);
        //     const response = await global.testRequest.post('/users').send(newUser);

        //     expect(response.status).toBe(409);
        //     expect(response.body).toEqual({
        //         code: 409,
        //         error: 'Conflict',
        //         message:
        //             'User validation failed: email: already exists in the database.',
        //     });

        // });







    });


    describe('when searching for user', () => {


        it('should get user with a valid id ', async () => {

            const createdUser = await User.create({
                name: 'Temp User da Silva',
                email: 'temp@mail.com',
                password: '1234'
            });


            const response = await global.testRequest.get(`/users/${createdUser.id}`)
                .set({ 'x-access-token': token });


            expect(response.status).toBe(200);
        });


        it('should  get user with invalid id', async () => {
            const createdUser = await User.create({
                name: 'Temp User da Silva',
                email: 'temp2@mail.com',
                password: '1234'
            });


            const token = AuthService.generateToken(createdUser.toJSON());
            const response = await global.testRequest.get(`/users/0`)
                .set({ 'x-access-token': token });

            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        });



        it('should  get users ', async () => {

            const response = await global.testRequest.get(`/users/`)
                .set({ 'x-access-token': token });


            console.log(response.body);

            expect(response.status).toBe(StatusCodes.OK);
        });


    });





    describe('When auth a user', () => {

        it('should generate a token for valid user', async () => {
            const newUser = {
                name: 'Fulano da Silva',
                email: 'fulano@gmail.com',
                password: '1234'
            }


            await User.create(newUser);
            const response = await global.testRequest.post('/users/authenticate').send({ email: newUser.email, password: newUser.password });


            expect(response.body).toEqual(
                expect.objectContaining({ token: expect.any(String) })
            )

        });


        it('should return unauthorized if the password is dows match', async () => {
            const newUser = {
                name: 'Ciclano da Silva',
                email: 'ciclano@gmail.com',
                password: '1234'
            }


            await User.create(newUser);
            const response = await global.testRequest.post('/users/authenticate').send({ email: newUser.email, password: `invalida password` });


            expect(response.status).toBe(401);

        });

    });

});