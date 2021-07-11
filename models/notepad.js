// const { DataTypes } = require("sequelize/types");
// const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('notepad', {
        notes: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}