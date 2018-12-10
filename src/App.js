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
      loading: true,
      nameSearchInput: "",
      colorValue: "",
      rarityValue: ""
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleDeckChange = this.handleDeckChange.bind(this)
    this.showAllCards = this.showAllCards.bind(this)
    this.addCardToDeck = this.addCardToDeck.bind(this)
    this.deleteCardFromDeck = this.deleteCardFromDeck.bind(this)
    this.handleUpdateName = this.handleUpdateName.bind(this)
  }
  //on componentDidMount we are getting the up to date list of cards for all cards and myDeck
  componentDidMount() {
    axios.get(`/api/cards`).then(res => {
      this.setState({ cards: res.data, loading: false })
    })
    axios.get("/api/cards/getMyDeck").then(res => {
      this.setState({ myDeck: res.data })
    })
  }

  //this is going to handle updating each state value, without having multiple 'updateWhatever' methods

  handleFilterChange(name, value) {
    this.setState({
      [name]: value
    })
  }
  // these two change the view setting
  handleDeckChange(e) {
    this.setState({
      myDeckSelected: true,
      showAll: false
    })
    if (this.state.myDeck.length == 0) {
      console.log(this.state.myDeck)
      alert("Deck is empty. Please add cards")
    }
  }
  showAllCards(e) {
    this.setState({
      myDeckSelected: false,
      showAll: true
    })
  }
  //.post request to our myDeck arr server side
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
  //.delete request from our myDeck arr server side
  deleteCardFromDeck(card) {
    axios.delete(`/api/cards/${card.number}`).then(response => {
      this.setState({
        myDeck: response.data
      })
    })
  }
  //.put request to change the listed name for the card
  handleUpdateName = (card, name, previousName) => {
    axios.put(`/api/cards/${card.number}`, {
      name: name
    })
  }

  render() {
    //map to show all cards after applying the currently set filter parameters
    const card = this.state.cards
      .filter(card =>
        card.name.toLowerCase().includes(this.state.nameSearchInput)
      )
      .filter(card => {
        if (!this.state.colorValue) {
          return true
        } else {
          return (
            this.state.colorValue && card.colors.includes(this.state.colorValue)
          )
        }
      })
      .filter(card => {
        if (!this.state.rarityValue) {
          return true
        } else {
          return (
            this.state.rarityValue &&
            card.rarity.toLowerCase().includes(this.state.rarityValue)
          )
        }
      })

      .map((card, index) => {
        return (
          <div className="card" key={index}>
            <img
              className="cardImg"
              src={card.imageUrl}
              alt=""
              height="350px"
              width="250px"
              onClick={() => this.addCardToDeck(card)}
            />
          </div>
        )
      })
    //if the api hasn't returned and mounted the component we are going to display the loading animation
    const { loading } = this.state

    if (loading) {
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
      //deciding whether to display all card or the split deck view based on current state
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
            handleDeckChange={this.handleDeckChange}
            deleteCardFromDeck={this.deleteCardFromDeck}
            handleUpdateName={this.handleUpdateName}
          />
          <div className="card-container-pairedview">{card}</div>
        </div>
      )
    }
  }
}

export default App
