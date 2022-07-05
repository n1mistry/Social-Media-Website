module.exports = (sequelize, DataTypes) => {
    //create mysql table for likes
        const Likes = sequelize.define("Likes");

        return Likes;
    };