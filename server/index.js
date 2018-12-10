const express = require("express")
const { json } = require("body-parser")
const cm = require("./controller/controller.js")
const port = 3001

const app = express()
app.use(json())
///methods go here

//app.get('url', cm.method)
//cards have a unique number so number is used instead of id
app.get("/api/cards", cm.getCards)
app.get("/api/cards/getMyDeck", cm.getMyDeck)
app.post("/api/cards", cm.postCard)
app.put("/api/cards/:number", cm.updateCard)
app.delete("/api/cards/:number", cm.deleteCard)
//etc

app.listen(port, () => console.log("im listening on 3001"))
