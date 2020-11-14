import User from '@src/models/user.model';
import { Controller, Get, Post, Middleware } from '@overnightjs/core';
import { Response, Request } from 'express';
import { BaseController } from '.';
import AuthService from '@src/services/auth';
import { StatusCodes } from 'http-status-codes';
import { authMiddleware } from '@src/middlewares/auth';

@Controller('users')
export class UsersController extends BaseController {

    @Post('')
    @Middleware(authMiddleware)
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const newUser = await User.create(req.body);
            res.status(201).send(newUser);
        } catch (error) {
            this.sendCreateUpdateErrorResponse(res, error);
        }
    }


    @Get(':id')
    @Middleware(authMiddleware)
    public async getUser(req: Request, res: Response) {
        try {

            const user = await User.findByPk(req.params['id']);
            if (!user) {
                return this.sendErrorResponse(res, {
                    code: StatusCodes.NOT_FOUND,
                    message: 'User not found!',
                });
            }

            console.log(`Usuário ${user}`);

            return res.status(StatusCodes.OK).send(user);

        } catch (error) {
            return this.sendCreateUpdateErrorResponse(res, error);
        }
    }


    @Post('authenticate')
    public async authenticate(req: Request, res: Response): Promise<Response> {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).send({
                code: StatusCodes.UNAUTHORIZED,
                error: 'User not found!',
            });
        }
        if (
            !(await AuthService.comparePasswords(req.body.password, user.password))
        ) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .send({ code: StatusCodes.UNAUTHORIZED, error: 'Password does not match!' });
        }
        const token = AuthService.generateToken(user.toJSON());

        return res.send({ ...user.toJSON(), ...{ token } });
    }
}