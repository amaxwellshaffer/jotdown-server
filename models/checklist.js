// const { DataTypes } = require("sequelize/types");
// const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('checklist', {
        isDone: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

    })
};