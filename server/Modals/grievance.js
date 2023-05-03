const mongoose = require("mongoose");

let Grievance_Schema = new mongoose.Schema({


  mobile: {
    type: Number,
  },

  name: {
    type: String,

  },
user_id:{
    type:String
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

  address: {
    type: String,
  },
  message:{
    type:String,

  },
  subject:{
    type:String,

  },
  status:{
    type:String
  },
  reply:{
    type:String,

  },
  date:{
    type:String,

  },
  file:{
    type:Array
  }



});
module.exports = mongoose.model("grievance", Grievance_Schema);
