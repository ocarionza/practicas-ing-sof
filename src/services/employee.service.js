const Boom = require('@hapi/boom');
const employee_info_model = require('../models/employee.model');

class Employee_info_Service {
  async createEmployee_info(new_employee_info) {
    new_employee_info.save();
    return new_employee_info;
  }
  async listEmployee_info() {
    return employee_info_model.find();
  }
  async showEmployee_info(employee_infoId) {
    return employee_info_model
      .findById({ _id: employee_infoId })
      .then((employee_info) => {
        if (!employee_info) throw Boom.notFound('Recurso no encontrado');
        return employee_info;
      });
  }
  async updateEmployee_info(
    employee_infoId,
    name,
    lastname,
    address,
    department,
    name_departament
  ) {
    return employee_info_model.findById({ _id: employee_infoId }).then((employee_infoFind) => {
      if (!employee_infoFind) throw Boom.notFound('Recurso no encontrado');
      return employee_info_model.updateOne(
        { employee_infoId },
        { name, lastname, address, department, name_departament }
      );
    });
  }
  async removeEmployee_info(employee_infoId) {
    return employee_info_model.findById({ _id: employee_infoId }).then((employee_info) => {
      if (!employee_info) throw Boom.notFound('Recurso no encontrado');
      return employee_info_model.deleteOne(employee_info);
    });
  }
}

module.exports = Employee_info_Service;
