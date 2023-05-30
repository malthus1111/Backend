module.exports = (sequelize, Sequelize) => {
    const Infos = sequelize.define("infos", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        auteur: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        acteur: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        personnage: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        saison: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        episode: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    return Infos;
};
