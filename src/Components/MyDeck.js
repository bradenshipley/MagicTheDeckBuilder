import React, { Component } from "react"


export default class myDeck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updatedName: ""
    }

  }
  //if our previous state is different, it makes sure to display our current deck by using the passed in deck view method
  ComponentDidUpdate(prevProps, prevState) {
    if (prevState.updatedName !== this.state.updatedName) {
      this.props.handleDeckChange()
    }
  }
  //these two methods handle the onChange and onSubmit methods
  invokeUpdateName = (card, updatedName) => {
    this.props.handleUpdateName(card, updatedName)
    this.setState({
      updatedName: this.state.currentInput
    })
  }
  //sets current state of name to the e.target.value being put into the input field below
  handleNameChanger = (e) => {
    this.setState({
      updatedName: e.target.value
    })
  }
  render() {
    //mapping across our myDeck arr and displaying a card for each, no filters are applied. The ability to toggle between
    //sorting your own deck or not to be added later
    let myDeckCards = this.props.myDeck.map(card => {
      return (
        <div className="card deckviewcard" key={card.number}>
          <form
            action=""
            onSubmit={e => {
              this.invokeUpdateName(card, this.state.updatedName)
            }}
          >
            <input
              type="text"
              className="nameChangeBar"
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
            //onClick this card will be removed from our deck
            onClick={this.props.deleteCardFromDeck}
          />
        </div>
      )
    })
    return <div className="card-container-myDeck">{myDeckCards}</div>
  }
}
