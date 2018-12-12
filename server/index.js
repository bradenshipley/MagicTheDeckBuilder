const express = require("express")
const { json } = require("body-parser")
const cm = require("./controller/controller.js")
const port = 3001

//setting up methods to always invoke express methods
const app = express()
//making sure all requests are sent as JSON files
app.use(json())

//setting endpoints that listen for requests from the front end
app.get("/api/cards", cm.getCards)
app.get("/api/cards/getNewPage", cm.getNewPage)
app.get("/api/cards/getPreviousPage", cm.getPreviousPage)
app.get("/api/cards/getMyDeck", cm.getMyDeck)
app.post("/api/cards", cm.postCard)
app.put("/api/cards/:number", cm.updateCard)
app.delete("/api/cards/:number", cm.deleteCard)

//setting port. The front end uses Proxy in package.json to redirect to http://localhost:3001/
app.listen(port, () => console.log("im listening on 3001"))
