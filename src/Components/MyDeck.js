import React, { Component } from "react"
import axios from "axios"

export default class myDeck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updatedName: ""
    }
    this.handleUpdateName = this.handleUpdateName.bind(this)
    this.handleNameChanger = this.handleNameChanger.bind(this)
  }

  componentDidMount() {
    axios.get("/api/cards/myDeck").then(res => {
      this.props.myDeck = res.data
    })
  }
  handleUpdateName = (card, e) => {
    axios
      .put(`/api/cards/${card.number}`, {
        name: this.state.updatedName
      })
      .then(res => {
        this.setState({ updatedName: res.data.name })
      })
  }
  handleNameChanger(e) {
    this.setState({
      updatedName: e.target.value
    })
  }
  render() {
    console.log(this.props.myDeck)
    let myDeckCards = this.props.myDeck.map(card => {
      return (
        <div className="card deckviewcard" key={card.number}>
          <form
            action=""
            onSubmit={e => {
              e.preventDefault()
              this.handleUpdateName(card, e, this.state.updatedName)
            }}
          >
            <input
              type="text"
              className="nameChangeBar"
              action=""
              placeholder={card.name}
              onChange={e => {
                console.log(this.state.updatedName)
                this.handleNameChanger(e)
              }}
            />
          </form>
          <img
            className="cardImg"
            src={card.imageUrl}
            alt=""
            height="350px"
            width="250px"
            onClick={this.props.deleteCardFromDeck}
          />
        </div>
      )
    })
    return <div className="card-container-myDeck">{myDeckCards}</div>
  }
}
