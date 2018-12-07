import React, { Component } from "react"
import Header from "./Components/Header"
import "./App.css"
import axios from "axios"
import MyDeck from "./Components/MyDeck"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      nameSearchInput: "",
      colorValue: "",
      rarityValue: "",
      formatValue: "",
      myDeckSelected: false
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }
  componentDidMount() {
    axios
      .get(`https://api.magicthegathering.io/v1/cards`)
      .then(res => this.setState({ cards: res.data.cards }))
  }
  //this is going to handle updating each state value, without having multiple 'updateWhatever' methods

  handleFilterChange(name, value) {
    this.setState({
      [name]: value
    })
  }
  // handlePatchName(){
  //   axios.put('URLHERE', "name":e.target.value)
  // }

  render() {
    const card = this.state.cards.map(card => {
      return (
        <div className="card" key={card.number}>
          {/* <span className="cardName">{card.name}</span> */}
          <img
            className="cardImg"
            src={card.imageUrl}
            alt=""
            height="350px"
            width="250px"
          />
          <input placeholder={card.name} />
          {
            // ^^^^i need to make this span editable so that I can have a .patch() request
          }
          <button className="addButton">Add To Deck</button>
        </div>
      )
    })
    if (this.state.myDeckSelected === false) {
      return (
        <div className="App">
          <Header
            nameSearchInput={this.state.nameSearchInput}
            colorValue={this.state.colorValue}
            rarityValue={this.state.rarityValue}
            formatValue={this.state.formatValue}
            handleFilterChange={this.handleFilterChange}
          />

          <div className="card-container">{card}</div>
        </div>
      )
    } else {
      return (
        <div className="App">
          <Header
            nameSearchInput={this.state.nameSearchInput}
            colorValue={this.state.colorValue}
            rarityValue={this.state.rarityValue}
            formatValue={this.state.formatValue}
            handleFilterChange={this.handleFilterChange}
          />
          <MyDeck />
          <div className="card-container">{card}</div>
        </div>
      )
    }
  }
}

export default App
