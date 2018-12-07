const axios = require("axios")
let myCards = []

const deleteCard = (req, res, next) => {
  index = myCards.findIndex(card => card.id == req.params.id)
  myCards.splice(index, 1)
  res.status(200).json(myCards)
}
module.exports = {}
