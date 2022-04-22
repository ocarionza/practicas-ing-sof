const express = require('express');
const employee_info_model = require('../models/employee.model');
const employee_info_route = express.Router();
const Employee_info_Service = require('../services/employee.service');
const _service_employee_info = new Employee_info_Service();

employee_info_route.post('/employee_info', async (req, res) => {
  try {
    const new_employee_info = employee_info_model(req.body);
    const data_service = await _service_employee_info.createEmployee_info(new_employee_info);
    res.status(201).json(data_service);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

employee_info_route.get('/', async (req, res) => {
  try {
    const data_service = await _service_employee_info.listEmployee_info();
    res.status(200).json(data_service);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});
employee_info_route.get('/:employee_infoId', async (req, res, next) => {
  try {
    const { employee_infoId } = req.params;
    const data_service = await _service_employee_info.showEmployee_info(
      employee_infoId
    );
    res.status(200).json(data_service);
  } catch (error) {
    next(error);
  }
});
employee_info_route.put('/:employee_infoId', async (req, res, next) => {
  try {
    const { employee_infoId } = req.params;
    const { name, lastname, address, department, name_departament } = req.body;
    const data_service = await _service_employee_info.updateEmployee_info(
      employee_infoId,
      name,
      lastname,
      address,
      department,
      name_departament
    );
    res.status(200).json(data_service);
  } catch (error) {
    next(error);
  }
});
employee_info_route.delete('/:employee_infoId', async (req, res, next) => {
  try {
    const { employee_infoId } = req.params;
    const data_service = await _service_employee_info.removeEmployee_info(employee_infoId);
    res.status(200).json(data_service);
  } catch (error) {
    next(error);
  }
});

module.exports = employee_info_route;
