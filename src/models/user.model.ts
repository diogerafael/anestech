import AuthService from '../services/auth';
import { Column, Table, Model, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, IsEmail, Unique, AllowNull, NotEmpty, BeforeCreate, HasMany, IsUUID } from "sequelize-typescript";
import Task from './task.model';

export interface UserI {
    id: number
    name: string
    email: string
    password: string
}


@Table({ tableName: "user" })
export default class User extends Model implements UserI {

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    name!: string;

    @IsEmail
    @Unique
    @Column
    public email!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    public password!: string;

    @HasMany(() => Task) tasks: Task[];

    @CreatedAt
    public readonly createdAt!: Date;

    @UpdatedAt
    public readonly updatedAt!: Date;


    @BeforeCreate
    static async hashPassword(instance: User) {
        instance.password = await AuthService.hashPassword(instance.password);
    }

}


