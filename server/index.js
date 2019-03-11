const express = require("express")
const { json } = require("body-parser")
const {getCards, getNewPage, getPreviousPage, getMyDeck, postCard, updateCard, deleteCard} = require("./controller/controller.js")
const port = 3001
const app = express()
app.use(json())

app.get("/api/cards", getCards)
app.get("/api/cards/getNewPage", getNewPage)
app.get("/api/cards/getPreviousPage", getPreviousPage)
app.get("/api/cards/getMyDeck", getMyDeck)
app.post("/api/cards", postCard)
app.put("/api/cards/:number", updateCard)
app.delete("/api/cards/:number", deleteCard)

app.listen(port, () => console.log(`im listening on ${port}`))
