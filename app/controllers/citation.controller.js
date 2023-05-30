const db = require("../models");
const Citation = db.citation;
const Infos = db.infos;
const Favoris = db.favoris;
const Op = db.Sequelize.Op;
const axios = require('axios');

const kaamelottApiUrl = 'https://kaamelott.chaudie.re/api'

// Fonction de validation des données
async function validateData(data, schema) {
    try {
        await schema.validateAsync(data);
        return true;
    } catch (error) {
        console.error('Erreur de validation :', error);
        return false;
    }
}


// Verifiez les valeurs non nulles
async function isValidAsData(body) {

    Object.values(body).forEach((value) => {

        if (value === null) {
            return false;
        }

    });

    return true;
}


// Create and Save a new citation
exports.create = (req, res) => {

    body = req.body

    if (!isValidAsData(body)) {

        res.status(400).send({
            status: 0,
            error: "Tous les champs doivent être non nuls",
            code: 400
        });

        return;
    }

    const infosData = {
        auteur: req.body.auteur,
        acteur: req.body.acteur,
        personnage: req.body.personnage,
        saison: req.body.saison,
        episode: req.body.episode
    };


    // Save citation in the database
    Infos.create(infosData)
        .then(info => {

            Citation.create({
                citation: req.body.citation,
                infos: info.id
            })
                .then(citation => {
                    console.log("Citation crée: ", citation);
                })
                .catch(error => {
                    throw new Error("Erreur lors la creation de la citation: ", error);
                });

            res.status(200).send({
                status: 1,
                code: 200,
                message:
                    "Nouvelle citation créee"
            });

        })
        .catch(error => {
            console.error("Erreur lors de la creation de la citation" + error.message);

            res.status(500).send({
                status: 0,
                code: 500,
                error: "Erreurs lors de la creation de la citation."
            });
        });

};

// Retrieve all citations from the database.
exports.findAll = (req, res) => {

    Citation.findAll({
        include: ["informations"]
    })
        .then((data) => {
            const result = data.map((citations) => {
                return {
                    id: citations.id,
                    citation: citations.citation,
                    infos: {
                        auteur: citations.informations.auteur,
                        acteur: citations.informations.acteur,
                        personnage: citations.informations.personnage,
                        saison: citations.informations.saison,
                        episode: citations.informations.episode
                    }
                };
            });

            res.status(200).send({
                status: 1,
                citation: result
            });
        })
        .catch(error => {
            console.error("Erreur lors de la recuperation des citations: " + error.message)

            res.status(500).send({
                status: 0,
                code: 500,
                error: "Erreur lors de la recuperation des citations"
            });
        });

};

// Find a single citation with an id
exports.findOneRandomly = (req, res) => {

    Citation.findAll()
        .then(data => {

            const result = data.map((citations) => {
                return citations.id
            });

            const index = Math.floor(Math.random() * result.length);
            console.log("size: " + result.length);
            console.log(index);
            console.log("ids: " + result + "; indice choisie: " + index + "; Valeur choisie: " + result[index]);

            const randomId = result[index]

            Citation.findByPk(randomId, {
                include: ["informations"]
            })
                .then((data) => {
                    const result = {
                        citation: data.dataValues.citation,
                        infos: {
                            auteur: data.informations.dataValues.auteur,
                            acteur: data.informations.dataValues.acteur,
                            personnage: data.informations.dataValues.personnage,
                            saison: data.informations.dataValues.saison,
                            episode: data.informations.dataValues.episode
                        }
                    };

                    res.status(200).send({
                        status: 1,
                        citation: result
                    });

                })
                .catch(error => {
                    console.error("Erreur lors de la recuperation aleatoire d'une citation" + error.message);

                    res.status(500).send({
                        status: 0,
                        error: "Impossible de recuperer la citation",
                        code: 500
                    });
                });

        })  
        .catch(error => {
            console.error("Erreur lors de la recuperation aleatoire d'une citation" + error.message);

            res.status(500).send({
                status: 0,
                error: "Impossible de recuperer la citation",
                code: 500
            });
        });
};

// Update a citation by the id in the request
exports.update = (req, res) => {

    const id = Number(req.params.id)
    const body = req.body

    if (!isValidAsData(body)) {

        res.status(400).send({
            status: 0,
            error: "Tous les champs doivent être non nuls",
            code: 400
        });

        return;
    }


    Infos.update(req.body, {
        where: { id: id }
    })
        .then(number => { // number est le nombre d'infos mis à jour

            if (number) {
                Citation.update(req.body, {
                    where: { id: id }
                })
                    .then(number => { // number est le nombre de citations mis à jour

                        if (number == 1) {
                            res.status(200).send({
                                status: 1,
                                code: 200,
                                message: "Citation mise à jour avec succès"
                            });
                        }
                        else {

                            res.status(500).send({
                                status: 0,
                                error: "Impossible de mettre à jour la citation " + id,
                                code: 500
                            });
                        }
                    })
            }
            else {
                res.status(500).send({
                    status: 0,
                    error: "Impossible de mettre à jour la citation " + id,
                    code: 500
                });
            }
        })
        .catch(error => {
            console.error("Mise à jour de la citation " + id + " avec erreurs: " + error.message);

            res.status(500).send({
                status: 0,
                error: "Impossible de mettre à jour la citation " + id,
                code: 500
            });
        });

};

// Delete a citation with the specified id in the request
exports.delete = (req, res) => {

    const id = Number(req.params.id) // Number() permet de convertir le parametre en nombre

    Citation.destroy({ 
        where: { id: id }
    })
        .then(number => { // number est le nombre de citations supprimées

            if (number) {
                Infos.destroy({
                    where: { id: id }
                })
                    .then(number => {

                        if (number == 1) {
                            res.status(200).send({
                                status: 1,
                                code: 200,
                                message: "Citation supprimée avec succès"
                            });
                        }
                        else {
                            res.status(500).send({
                                status: 0,
                                error: "Impossible de supprimer la citation " + id,
                                code: 500
                            });
                        }
                    })
            }
            else {
                console.error("Suppression de la citation " + id + " avec erreurs: " + error.message);
                res.status(500).send({
                    status: 0,
                    error: "Impossible de supprimer la citation " + id,
                    code: 500
                });
            }

        })
        .catch(error => {
            console.error("Suppression de la citation " + id + " avec erreurs: " + error.message);

            res.status(500).send({
                status: 0,
                error: "Impossible de supprimer la citation " + id,
                code: 500
            });
        });
};


// random citation from external api
exports.randomCitationFromExternal = (req, res) => {
    axios.get(kaamelottApiUrl + "/random")
        .then(response => {
            console.log(response.data);
            res.status(200).send(response.data);
        })
        .catch(error => {
            console.error("Impossible de recuperer une citation depuis l'api externe " + error.message);
            res.status(500).send({
                status: 0,
                error: "Impossible d'afficher la citation ",
                code: 500
            });
        });
};


// Add citation to favourite
exports.addFavourite = (req, res) => {

    body = req.body

    if (!isValidAsData(body)) {

        res.status(400).send({
            status: 0,
            error: "Tous les champs doivent être non nuls",
            code: 400
        });

        return;
    }

    const favouriteData = {
        citation: req.body.citation,
        personnage: req.body.personnage,
        episode: req.body.episode,
    };


    // Save favourites in the database
    Favoris.create(favouriteData)
        .then(info => {

            res.status(200).send({
                status: 1,
                code: 200,
                message:
                    "Citation ajoutée aux favoris"
            });

        })
        .catch(error => {
            console.error("Erreur lors de l'ajout d'une citation aux favoris: " + error.message);

            res.status(500).send({
                status: 1,
                code: 500,
                error:
                    error.message || "Erreur lors de l'ajout de la citation aux favoris."
            });
        });

};

// get favourites
exports.getFavourites = (req, res) => {
    Favoris.findAll()
        .then((data) => {
            console.log(data);
            const result = data.map((favoris) => {
                return {
                    citation: favoris.citation,
                    infos: {
                        personnage: favoris.personnage,
                        episode: favoris.episode
                    }
                };
            });

            res.status(200).send({
                status: 1,
                citation: result
            });
        })
        .catch(error => {
            console.error("Creation d'une citation avec erreurs: " + error.message)

            res.status(500).send({
                status: 1,
                code: 500,
                error:
                    error.message || "Some error occurred while retrieving Citation."
            });
        });
};

// search citations

exports.searchCitations = (req, res) => {
    const name = req.query.name;

    Citation.findAll({
        where: {
            citation: {
                [Op.like]: `%${name}%`
            }
        },
        include: ["informations"]
    })
        .then(citations => {
            res.status(200).json({
                status: 1,
                citations
            });
        })
        .catch(error => {
            console.error("Recherche d'une citation avec erreurs: " + error.message)
            res.status(500).json({
                status: 0,
                error: 'Erreur lors de la recherche de la citation',
                code: 500
            });
        });
};