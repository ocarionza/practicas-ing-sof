const express = require("express");
const employee_info_routes = require('./employee.routes');

function routerApi(app){
    const dynamic_routes = express.Router();
    app.use("/api/v2", dynamic_routes); /* endpoint http://localhost:3000/api/v2 */
    dynamic_routes.use('/employee_info', employee_info_routes);
}

module.exports = routerApi;