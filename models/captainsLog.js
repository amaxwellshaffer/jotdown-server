// const { DataTypes, Sequelize } = require("sequelize/types");
// const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('captainslog', {
        date:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        entry:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        }
    })
}