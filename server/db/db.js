const mongoose = require("mongoose")
let env = require("dotenv")
env.config()

mongoose.connect(process.env.REACT_DB_URL ).then(()=>console.log('db connected'))