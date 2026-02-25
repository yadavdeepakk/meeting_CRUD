import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config/database";
import { User } from "../../users/module/user.module";

export class Meeting extends Model {
  public id!: number;
  public title!: string;
  public startTime!: Date;
  public endTime!: Date;
  public userId!: number;
}

Meeting.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    startTime: { type: DataTypes.DATE, allowNull: false },
    endTime: { type: DataTypes.DATE, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: "meetings",
  }
);

User.hasMany(Meeting, { foreignKey: "userId" });
Meeting.belongsTo(User, { foreignKey: "userId" });