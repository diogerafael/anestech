import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Index,
    IsUUID,
    Model,
    NotEmpty,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import User from "./user.model";

export interface TaskI {
    description: string;
}

@Table({ tableName: "task" })
export default class Task extends Model implements TaskI {


    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @AllowNull(false)
    @NotEmpty
    @Column(DataType.TEXT)
    description!: string;

    @ForeignKey(() => User)
    @Column
    userId!: number;


    @BelongsTo(() => User)
    user?: User;

    @AllowNull(false)
    @Column
    startDate: Date;

    @AllowNull(false)
    @Column
    endDate: Date;


}