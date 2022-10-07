"use strict";
module.exports = (sequel, DataTypes) => {
    const Tutorial = sequel.define('tutorial', {
        title : {
            type: DataTypes.STRING
        },
        description : {
            type: DataTypes.STRING
        },
        published: {
            type: DataTypes.BOOLEAN
        }
    });
    return Tutorial;
};