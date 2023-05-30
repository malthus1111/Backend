module.exports = (sequelize, Sequelize) => {
    const Citation = sequelize.define("citation", {
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
        infos: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }); 

    return Citation;
};
