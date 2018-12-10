import React, { Component } from "react"
import Header from "./Components/Header"
import "./App.css"
import axios from "axios"
import MyDeck from "./Components/MyDeck"
import LoadingSpinner from "./Components/LoadingSpinner"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      myDeck: [],
      myDeckSelected: false,
      showAll: true,
      loading: true
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleDeckChange = this.handleDeckChange.bind(this)
    this.showAllCards = this.showAllCards.bind(this)
    this.addCardToDeck = this.addCardToDeck.bind(this)
    this.deleteCardFromDeck = this.deleteCardFromDeck.bind(this)
  }
  componentDidMount() {
    axios.get(`/api/cards`).then(res => {
      this.setState({ cards: res.data, loading: false })
    })
  }
  //this is going to handle updating each state value, without having multiple 'updateWhatever' methods

  handleFilterChange(name, value) {
    this.setState({
      [name]: value
    })
  }
  handleDeckChange(e) {
    this.setState({
      myDeckSelected: true,
      showAll: false
    })
    if (this.state.myDeck.length == 0) {
      alert("Deck is empty. Please add cards")
    }
  }
  showAllCards(e) {
    this.setState({
      myDeckSelected: false,
      showAll: true
    })
  }
  addCardToDeck = card => {
    console.log(card)
    axios.post("/api/cards", card).then(response => {
      this.setState({
        myDeck: response.data,
        myDeckSelected: true,
        showAll: false
      })
    })
  }
  deleteCardFromDeck(card) {
    axios.delete(`/api/cards/${card.number}`).then(response => {
      this.setState({
        myDeck: response.data
      })
    })
  }
  // handlePatchName(){
  //   axios.put('URLHERE', "name":e.target.value)
  // }

  render() {
    const card = this.state.cards.map((card, index) => {
      return (
        <div className="card" key={index}>
          {/* <span className="cardName">{card.name}</span> */}
          <img
            className="cardImg"
            src={card.imageUrl}
            alt=""
            height="350px"
            width="250px"
            onClick={() => this.addCardToDeck(card)}
          />

          {
            // ^^^^i need to make this span editable so that I can have a .patch() request
          }
        </div>
      )
    })
    const { loading } = this.state

    if (this.state.loading) {
      return (
        <div className="App">
          <Header
            handleFilterChange={this.handleFilterChange}
            handleDeckChange={this.handleDeckChange}
            handleShowAll={this.showAllCards}
          />
          <div className="loading-spinner">
            <LoadingSpinner />
          </div>
        </div>
      )
    } else if (
      this.state.myDeck.length == 0 ||
      (this.state.myDeckSelected === false && this.state.showAll === true)
    ) {
      return (
        <div className="App">
          <Header
            handleFilterChange={this.handleFilterChange}
            handleDeckChange={this.handleDeckChange}
            handleShowAll={this.showAllCards}
          />

          <div className="card-container-showAll">{card}</div>
        </div>
      )
    } else if (
      this.state.myDeckSelected === true &&
      this.state.showAll === false
    ) {
      return (
        <div className="App">
          <Header
            handleFilterChange={this.handleFilterChange}
            handleDeckChange={this.handleDeckChange}
            showAllCards={this.showAllCards}
          />

          <MyDeck
            myDeck={this.state.myDeck}
            deleteCardFromDeck={this.deleteCardFromDeck}
          />
          <div className="card-container-pairedview">{card}</div>
        </div>
      )
    }
  }
}

export default App
