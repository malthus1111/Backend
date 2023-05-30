const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db = {};
    
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.citation = require("./citation.model.js")(sequelize, Sequelize);
db.infos = require("./infos.model.js")(sequelize, Sequelize);

db.infos.hasMany(db.citation, { as: "citation" })
db.citation.belongsTo(db.infos, {
    foreignKey: "infos",
    as: "informations"
})

db.favoris = require("./favoris.model.js")(sequelize, Sequelize);

module.exports = db;
