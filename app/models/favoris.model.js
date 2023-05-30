module.exports = (sequelize, Sequelize) => {
    const Favoris = sequelize.define("favoris", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        citation: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        personnage: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        episode: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    return Favoris;
};
