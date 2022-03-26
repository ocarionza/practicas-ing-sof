const express = require("express");
const peopleRoutes = require("./person.router")
const departamentsRoutes = require('./departaments.router')

function routerApi(app){
    const routes = express.Router();
    app.use("/api/v1", routes); /* endpoint http://localhost:3000/api/v1 */
    routes.use("/people", peopleRoutes); /* Endpoint http://localhost:3000/api/v1/people */
    routes.use('/departaments', departamentsRoutes); /* Endpoint http://localhost:3000/api/v1/departaments */
}

module.exports = routerApi;