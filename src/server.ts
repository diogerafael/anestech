import './util/module-alias';
import { Server } from "@overnightjs/core/lib/Server";
import bodyParser from "body-parser";
import { Application } from "express";
import { TasksController } from "./controllers/tasks";
import { UsersController } from "./controllers/users";
import { sequelize } from './database';

export class SetupServer extends Server {


    constructor(private port = 3000) {
        super();
    }

    public async init(): Promise<void> {
        this.setupExpress();
        this.setupControllers();
        await this.databaseSetup();
    }


    private setupExpress(): void {
        this.app.use(bodyParser.json());
        this.setupControllers();
    }


    private setupControllers(): void {
        const usersController = new UsersController();
        const tasksController = new TasksController();
        // const forecastController = new ForecastController();
        // const beachesController = new BeachesController();
        // const usersController = new UsersController();
        this.addControllers([
            usersController,
            tasksController
        ]);
    }

    public start(): void {
        this.app.listen(this.port, () => {
            //logger.info('Server listening on port: ' + this.port);
        });
    }


    private async databaseSetup(): Promise<void> {
        await sequelize.authenticate();
        //await sequelize.sync({ force: true });
    }


    public getApp(): Application {
        return this.app;
    }
}