const mongoose = require("mongoose");

let usersSchema = new mongoose.Schema({
  email: {
    type: String,

  },

  mobile: {
    type: Number,
  },

  name: {
    type: String,

  },
  is_active: {
    type: Boolean,

  },

  u_type: {
    type: String,
  },
  gender: {
    type: String,
  },
  Class: {
    type: String,
  },
  semester: {
    type: String,
  },
  registration: {
    type: String,
  },
  guardian: {
    type: String,
  },
  address: {
    type: String,
  },
  password:{
    type: String,
  },
  employee_id:{
    type: String,
  },
  designation:{
    type: String,
  },
  department:{
    type: String,
  },
  date:{
    type:String,

  },
  otp:{
    type:String
  }

});
module.exports = mongoose.model("users", usersSchema);

