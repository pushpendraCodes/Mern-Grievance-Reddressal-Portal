const mongoose = require("mongoose");

let Notice_Schema = new mongoose.Schema({


  subject: {
    type: String,
  },

  regarding: {
    type: String,
  },

  file: {
    type: Array,
  },

  // notice: {
  //   type: String,
  // },
  date:{
    type:String
  },
  notice_no:{
    type:String
  }



});
module.exports = mongoose.model("notice", Notice_Schema);
