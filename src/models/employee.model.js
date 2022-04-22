const mongoose = require('mongoose');
const { object } = require('webidl-conversions');
const employee_infoSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  address: {
    geo: {
      lat: {
        type: Number,
        require: true,
      },
      ing: {
        type: Number,
        require: true,
      },
    },
    city: {
      type: String,
      require: true,
    },
    code_zip: {
      type: String,
      require: true,
    },
  },
  department: {
    type: Number,
    require: true,
  },
  name_departament: {
    type: String,
    require: true,
  },
});
const employee_info_model = mongoose.model(
  'employee_info_collection',
  employee_infoSchema
);
module.exports = employee_info_model;
