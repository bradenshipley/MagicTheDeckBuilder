const express = require("express")
const axios = require("axios")
const { json } = require("body-parser")
const cors = require("cors")
const ct = require("./controller/controller.js")
const port =  3001,

const app = express()
///methods go here
//app.get('url', controller.method)

//etc

app.listen(port, () => console.log("im listening on 3001"))
