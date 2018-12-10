const axios = require("axios")
let myCards = []
let myDeck = []

const getCards = (req, res, next) => {
  axios
    .get("https://api.magicthegathering.io/v1/cards")
    .then(response => {
      myCards = response.data.cards.splice(0, 100)
      res.status(200).json(myCards)
    })
    .catch(err => console.log("could not get"))

  // res.status(200).json(myCards)
}
// const getMyDeck = (req, res, next) => {
//   res.status(200).json(myDeck)
// }
const postCard = (req, res, next) => {
  myDeck.push(req.body)
  res.status(200).json(myDeck)
}
const getDeck = (req, res, next) => {
  res.status(200).json(myDeck)
}
//add this into get request to populate myDeck on front end

const updateCard = (req, res, next) => {
  console.log(req.body.name)
  myDeck = myDeck.map(card =>
    card.number == req.params.number
      ? Object.assign(card, { name: req.body.name })
      : card
  )
  return res.status(200).json(myDeck)
}
const deleteCard = (req, res, next) => {
  index = myDeck.findIndex(card => card.number == req.params.number)
  myDeck.splice(index, 1)
  res.status(200).json(myDeck)
}
module.exports = {
  deleteCard,
  getCards,
  postCard,
  updateCard
  // getMyDeck
}
