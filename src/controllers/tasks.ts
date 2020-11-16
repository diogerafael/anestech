import { StatusCodes } from 'http-status-codes';
import { Controller, Middleware, Post } from "@overnightjs/core";
import { Response, Request } from 'express';
import Task from '../models/task.model';
import { BaseController } from ".";
import { authMiddleware } from "@src/middlewares/auth";


@Controller('tasks')
export class TasksController extends BaseController {

    @Post('')
    @Middleware(authMiddleware)
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const newTask = await Task.create(req.body);
            res.status(StatusCodes.CREATED).send(newTask);
        } catch (error) {
            console.log(error);
            this.sendCreateUpdateErrorResponse(res, error);
        }
    }
}