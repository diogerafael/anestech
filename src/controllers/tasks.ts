import { Controller, Post } from "@overnightjs/core";
import { Response, Request } from 'express';
import Task from '../models/task.model';
import { BaseController } from ".";


@Controller('tasks')
export class TasksController extends BaseController {

    @Post('')
    public async create(req: Request, res: Response): Promise<void> {
        try {
            console.log(`Body Task ${req.body}`);
            const newTask = await Task.create(req.body);
            res.status(201).send(newTask);
        } catch (error) {
            this.sendCreateUpdateErrorResponse(res, error);
        }
    }
}