const axios = require("axios")
let myCards = []
let myDeck = []
let count = 1
//get all cards
const getCards = (req, res, next) => {
  axios
    .get("https://api.magicthegathering.io/v1/cards")
    .then(response => {
      myCards = response.data.cards
      res.status(200).json(myCards)
    })
    .catch(err => console.log("could not get API"))
}
const getNewPage = (req, res, next) => {
  axios
    .get(`https://api.magicthegathering.io/v1/cards/?page=${count + 1}`)
    .then(response => {
      myCards = response.data.cards
      res.status(200).json(myCards)
    })
  count++
}
const getPreviousPage = (req, res, next) => {
  axios
    .get(`https://api.magicthegathering.io/v1/cards/?page=${count - 1}`)
    .then(response => {
      myCards = response.data.cards
      res.status(200).json(myCards)
    })
    .catch(err => alert("you are at the first page"))
  count--
}

//get the cards currently added to my deck
const getMyDeck = (req, res, next) => {
  res.status(200).json(myDeck)
}
//add a card to my deck
const postCard = (req, res, next) => {
  myDeck.push(req.body)
  res.status(200).json(myDeck)
}
//update the listed name on a card
const updateCard = (req, res, next) => {
  console.log(req.body)
  myDeck = myDeck.map(card =>
    card.number == req.params.number
      ? Object.assign(card, {
          name: req.body.name
        })
      : card
  )
  return res.status(200).json(myDeck)
}
//delete a card from my deck
const deleteCard = (req, res, next) => {
  index = myDeck.findIndex(card => card.number == req.params.number)
  myDeck.splice(index, 1)
  res.status(200).json(myDeck)
}
module.exports = {
  deleteCard,
  getCards,
  postCard,
  updateCard,
  getMyDeck,
  getNewPage,
  getPreviousPage
}
