const bcrypt = require("bcryptjs");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { ELEMENT_TYPES } = require("../../constants/enums");

const ChartElement = sequelize.define(
    "chartElements",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        text: DataTypes.STRING,
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        chartId: DataTypes.INTEGER,
    },
    {
        indexes: [],
    }
);

module.exports = ChartElement;
