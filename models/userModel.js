'use strict';
module.exports = (sequelize, DataTypes) => {
      var model = sequelize.define('user', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        mobile: {
            type: DataTypes.BIGINT
        },
        email: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.BIGINT
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
        created_by: {
            type: DataTypes.BIGINT,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }

    }, {
        tableName: 'user',
        timestamps: false
    });

    return model;
};