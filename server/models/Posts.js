module.exports = (sequelize, DataTypes) => {
//create mysql table for posts
    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
//associate comments table with posts table
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",
        });
        Posts.hasMany(models.Likes, {
            onDelete: "cascade",
        });
    };

    return Posts
}