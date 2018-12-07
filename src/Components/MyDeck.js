import React, { Component } from "react"

export default class myDeck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updatedName: ""
    }
  }

  handleUpdateName = e => {
    console.log(e.target.value)
    this.setState({
      updatedName: e.target.value
    })
  }

  render() {
    let myDeckCards = this.props.myDeck.map(card => {
      return (
        <div className="card" key={card.number}>
          <img
            className="cardImg"
            src={card.imageUrl}
            alt=""
            height="350px"
            width="250px"
          />
          <form
            action=""
            onSubmit={event =>
              this.props.handleUpdateName(
                card.number,
                this.state.updatedName,
                event
              )
            }
          >
            <input placeholder={card.name} onChange={this.handleUpdateName} />
          </form>

          <button className="removeButton">Remove from Deck</button>
        </div>
      )
    })
    return <div className="card-container-myDeck">{myDeckCards}</div>
  }
}
