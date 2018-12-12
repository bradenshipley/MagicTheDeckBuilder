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
    //binding our many methods to use this state
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleDeckChange = this.handleDeckChange.bind(this)
    this.showAllCards = this.showAllCards.bind(this)
    this.addCardToDeck = this.addCardToDeck.bind(this)
    this.deleteCardFromDeck = this.deleteCardFromDeck.bind(this)
    this.handleUpdateName = this.handleUpdateName.bind(this)
    this.getNext100Cards = this.getNext100Cards.bind(this)
    this.getPrevious100Cards = this.getPrevious100Cards.bind(this)
  }
  //on componentDidMount we are getting the up to date list of cards for all cards and myDeck, pairing together
  //two .get requests in one function
  componentDidMount() {
    axios.get(`/api/cards`).then(res => {
      this.setState({ cards: res.data, loading: false })
    })

    axios.get("/api/cards/getMyDeck").then(res => {
      this.setState({ myDeck: res.data })
    })
  }

  //this is going to handle updating each state value, without having multiple 'updateXY' methods

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
      alert("Deck is empty. Please add cards")
    }
  }
  //updates state which will affect the conditional rendering below
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
  //get request for the next 100 cards
  getNext100Cards() {
    axios
      .get("/api/cards/getNewPage")
      .then(response => this.setState({ cards: response.data }))
  }
  //get request for the previous 100 cards
  getPrevious100Cards() {
    axios
      .get("/api/cards/getPreviousPage")
      .then(response => this.setState({ cards: response.data }))
  }
  //.delete request from our myDeck arr server side, using card.number as the unique key
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
    console.log(this.state.cards)
    const card = this.state.cards
      //filter cards by name
      .filter(card =>
        card.name.toLowerCase().includes(this.state.nameSearchInput)
      )
      //filter cards by color
      .filter(card => {
        //checking to see if there is no color filter applied, or if there is no card.color prop (some cards dont have a color value)
        if (!this.state.colorValue || !card.colors) {
          return true
        } else {
          return (
            this.state.colorValue && card.colors.includes(this.state.colorValue)
          )
        }
      })
      //filter card by rarity value
      .filter(card => {
        //if there is no rarity filter selected, disregard filter by returning true
        if (!this.state.rarityValue) {
          return true
        } else {
          return (
            this.state.rarityValue &&
            card.rarity.toLowerCase().includes(this.state.rarityValue)
          )
        }
      })
      //and finally map over our filtered arr to render each card that is left
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
    //if the api hasn't returned a response and mounted the component we are going to display the loading animation
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
            getNext100Cards={this.getNext100Cards}
            getPrevious100Cards={this.getPrevious100Cards}
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
            getNext100Cards={this.getNext100Cards}
            getPrevious100Cards={this.getPrevious100Cards}
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
