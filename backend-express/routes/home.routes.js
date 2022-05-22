const {Router} = require('express')
const homeController = require("../controllers/homeController.js");

const homeRouter = Router();

homeRouter.use("/", homeController.index)


module.exports = homeRouter