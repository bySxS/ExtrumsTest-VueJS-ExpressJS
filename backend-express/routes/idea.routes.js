const {Router} = require('express')
const ideaController = require("../controllers/ideaController.js");


const ideaRouter = Router();

ideaRouter.post('/uploadFreshList', ideaController.uploadIdeaList)
ideaRouter.post('/downloadFreshList', ideaController.downloadIdeaList)


module.exports = ideaRouter