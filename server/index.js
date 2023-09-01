const express = require('express')
const app = express()
const port = process.env.PORT||4000
// const path =  require("path")
require("./db/db")
const http = require("http")
let cors = require("cors")
app.use(cors());
app.use(express.json())
app.use('/upload', express.static('upload'));
// const router = require("./routes/user")

// app.use(express.static(path.resolve(__dirname, 'dist')));

app.use("/" ,require("./routes/user"))
app.use("/" ,require("./routes/grievance"))
app.use("/" ,require("./routes/notice"))


const httpServer   = http.createServer(app)
httpServer.listen(port, () => {
  console.log(` server   listening on port ${port}`)
})
