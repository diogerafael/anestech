import config, { IConfig } from 'config';
import { Sequelize } from "sequelize-typescript";


const dbConfig: IConfig = config.get('App.database');


export const sequelize = new Sequelize(
    dbConfig.get('database'),
    dbConfig.get('username'),
    dbConfig.get('password'),
    {
        dialect: dbConfig.get('dialect'),
        port: dbConfig.get('port'),
        host: dbConfig.get('host'),
        models: [__dirname + '/models']
    }
);