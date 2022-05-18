const bcrypt = require("bcryptjs");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const ElementRelation = sequelize.define(
    "elementRelations",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        inputElementId: DataTypes.INTEGER,
        outputElementId: DataTypes.INTEGER,
        inputElementType: DataTypes.STRING,
        outputElementType: DataTypes.STRING,
    },
    {
        indexes: [],
    }
);

module.exports = ElementRelation;
