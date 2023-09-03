const express = require('express')
const app = express()
const port = process.env.PORT||4000
// const path =  require("path")
require("./db/db")
const http = require("http")
let cors = require("cors")

app.use(cors());
let bodyParser = require("body-parser")
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/upload', express.static('upload'));
// const router = require("./routes/user")

// app.use(express.static(path.resolve(__dirname, 'dist')));

app.get("/",(req,res)=>{
  res.send("hello node js")
})

app.use("/" ,require("./routes/user"))
app.use("/" ,require("./routes/grievance"))
app.use("/" ,require("./routes/notice"))


const httpServer   = http.createServer(app)
httpServer.listen(port, () => {
  console.log(` server   listening on port ${port}`)
})
