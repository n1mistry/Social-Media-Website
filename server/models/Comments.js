module.exports = (sequelize, DataTypes) => {
//create mysql table for comments
    const Comments = sequelize.define("Comments", {
        commentBody: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
    return Comments;
};