module.exports = app => {

    const citation = require("../controllers/citation.controller.js");

    var router = require("express").Router();

    // Create a new citation
    /**
     * @swagger
     * /api/citation/:
     *   post:
     *     summary: Create a new citation
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               citation:
     *                 type: string
     *                 description: The citation text
     *               auteur:
     *                 type: string
     *                 description: The author of the citation
     *               acteur:
     *                 type: string
     *                 description: The actor associated with the citation
     *               personnage:
     *                 type: string
     *                 description: The associated character of the citation
     *               saison:
     *                 type: string
     *                 description: The season of the citation
     *               episode:
     *                 type: string
     *                 description: The episode of the citation
     *     responses:
     *       '200':
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: number
     *                   description: Status code indicating the success of the request (1 for success, 0 for failure)
     *                 code:
     *                   type: number
     *                   description: HTTP status code of the response (e.g., 200 for OK)
     *                 message:
     *                   type: string
     *                   description: A message indicating the result of the request
    */
    router.post("/", citation.create);

    // update citation
    /**
     * @swagger
     * /api/citation/{id}:
     *   put:
     *     summary: Update a citation
     *     parameters:
     *       - in: path
     *         name: id
     *         description: ID of the citation to update
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               citation:
     *                 type: string
     *                 description: The updated citation text
     *               auteur:
     *                 type: string
     *                 description: The updated author of the citation
     *               acteur:
     *                 type: string
     *                 description: The updated actor associated with the citation
     *               personnage:
     *                 type: string
     *                 description: The updated associated character of the citation
     *               saison:
     *                 type: string
     *                 description: The updated season of the citation
     *               episode:
     *                 type: string
     *                 description: The updated episode of the citation
     *     responses:
     *       '200':
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: number
     *                   description: Status code indicating the success of the request (1 for success, 0 for failure)
     *                 code:
     *                   type: number
     *                   description: HTTP status code indicating the success of the request (200 for success)
     *                 message:
     *                   type: string
     *                   description: Message indicating the success of the operation
     */
    router.put("/:id", citation.update);

    // get random citation
    /**
     * @swagger
     * /api/citation/random:
     *   get:
     *     summary: Get a random citation
     *     responses:
     *       '200':
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: number
     *                   description: Status code indicating the success of the request (1 for success, 0 for failure)
     *                 citation:
     *                   type: object
     *                   properties:
     *                     citation:
     *                       type: string
     *                       description: The citation text
     *                     infos:
     *                       type: object
     *                       properties:
     *                         auteur:
     *                           type: string
     *                           description: The author of the citation
     *                         acteur:
     *                           type: string
     *                           description: The actor associated with the citation
     *                         personnage:
     *                           type: string
     *                           description: The associated character of the citation
     *                         saison:
     *                           type: string
     *                           description: The season of the citation
     *                         episode:
     *                           type: string
     *                           description: The episode of the citation
    */
    router.get("/random", citation.findOneRandomly);

    // get random citation from external api
    /**
     * @swagger
     * /api/citation/random-external:
     *   get:
     *     summary: Get a random external citation
     *     responses:
     *       '200':
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: number
     *                   description: Status code indicating the success of the request (1 for success, 0 for failure)
     *                 citation:
     *                   type: object
     *                   properties:
     *                     citation:
     *                       type: string
     *                       description: The citation text
     *                     infos:
     *                       type: object
     *                       properties:
     *                         auteur:
     *                           type: string
     *                           description: The author of the citation
     *                         acteur:
     *                           type: string
     *                           description: The actor associated with the citation
     *                         personnage:
     *                           type: string
     *                           description: The associated character of the citation
     *                         saison:
     *                           type: string
     *                           description: The season of the citation
     *                         episode:
     *                           type: string
     *                           description: The episode of the citation
    */
    router.get("/random-external", citation.randomCitationFromExternal);

    // delete citation
    /**
     * @swagger
     * /api/citation/{id}:
     *   delete:
     *     summary: Delete a citation by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the citation to delete
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: number
     *                   description: Status code indicating the success of the request (1 for success, 0 for failure)
     *                 code:
     *                   type: number
     *                   description: The HTTP status code of the response (200 for success)
     *                 message:
     *                   type: string
     *                   description: A message indicating the result of the operation
     */
    router.delete("/:id", citation.delete)

    // get all citations
    /**
     * @swagger
     * /api/citation/all:
     *   get:
     *     summary: Get all citations
     *     responses:
     *       '200':
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: number
     *                   description: Status code indicating the success of the request (1 for success, 0 for failure)
     *                 citation:
     *                   type: array
     *                   description: List of citations
     *                   items:
     *                     type: object
     *                     properties:
     *                       id:
     *                         type: number
     *                         description: The ID of the citation
     *                       citation:
     *                         type: string
     *                         description: The citation text
     *                       infos:
     *                         type: object
     *                         properties:
     *                           auteur:
     *                             type: string
     *                             description: The author of the citation
     *                           acteur:
     *                             type: string
     *                             description: The actor associated with the citation
     *                           personnage:
     *                             type: string
     *                             description: The associated character of the citation
     *                           saison:
     *                             type: string
     *                             description: The season of the citation
     *                           episode:
     *                             type: string
     *                             description: The episode of the citation
     */
    router.get("/all", citation.findAll);

    // add favourite
    /**
     * @swagger
     * /api/citation/favourite:
     *   post:
     *     summary: Add a citation to favorites
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               citation:
     *                 type: string
     *                 description: The citation text
     *               personnage:
     *                 type: string
     *                 description: The associated character of the citation
     *               episode:
     *                 type: string
     *                 description: The episode of the citation
     *     responses:
     *       '200':
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: number
     *                   description: Status code indicating the success of the request (1 for success, 0 for failure)
     *                 code:
     *                   type: number
     *                   description: The HTTP status code (200 for success)
     *                 message:
     *                   type: string
     *                   description: A message indicating the success of the operation
     */
    router.post("/favourite", citation.addFavourite)

    // get favourites
    /**
     * @swagger
     * /api/citation/favourites:
     *   get:
     *     summary: Get favourites
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: number
     *                   description: Status code indicating the success of the request (1 for success, 0 for failure)
     *                 citation:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       citation:
     *                         type: string
     *                         description: The citation text
     *                       infos:
     *                         type: object
     *                         properties:
     *                           personnage:
     *                             type: string
     *                             description: The associated character of the citation
     *                           episode:
     *                             type: string
     *                             description: The episode of the citation
     */
    router.get("/favourites", citation.getFavourites)

    //search citation
    /**
     * @swagger
     * /api/citation/search:
     *   get:
     *     summary: Search citations by name
     *     parameters:
     *       - in: query
     *         name: name
     *         schema:
     *           type: string
     *         required: true
     *         description: Name to search for
     *     responses:
     *       '200':
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: number
     *                   description: Status code indicating the success of the request (1 for success, 0 for failure)
     *                 citations:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       id:
     *                         type: number
     *                         description: The citation ID
     *                       citation:
     *                         type: string
     *                         description: The citation text
     *                       infos:
     *                         type: number
     *                         description: The ID of the associated info
     *                       createdAt:
     *                         type: string
     *                         format: date-time
     *                         description: The creation date of the citation
     *                       updatedAt:
     *                         type: string
     *                         format: date-time
     *                         description: The last update date of the citation
     *                       infoId:
     *                         type: number
     *                         description: The ID of the associated info
     *                       informations:
     *                         type: object
     *                         properties:
     *                           id:
     *                             type: number
     *                             description: The info ID
     *                           auteur:
     *                             type: string
     *                             description: The author of the citation
     *                           acteur:
     *                             type: string
     *                             description: The actor associated with the citation
     *                           personnage:
     *                             type: string
     *                             description: The associated character of the citation
     *                           saison:
     *                             type: string
     *                             description: The season of the citation
     *                           episode:
     *                             type: string
     *                             description: The episode of the citation
     *                           createdAt:
     *                             type: string
     *                             format: date-time
     *                             description: The creation date of the info
     *                           updatedAt:
     *                             type: string
     *                             format: date-time
     *                             description: The last update date of the info
     */
    router.get("/search", citation.searchCitations)

    app.use('/api/citation', router);
};
