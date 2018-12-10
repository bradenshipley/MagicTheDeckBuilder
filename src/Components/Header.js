import React from "react"
import Filters from "./Filters"

const Header = props => {
  //setting a variable to use in inline styling below
  var pstyle = {
    color: "white",
    fontSize: "12px"
  }
  return (
    <div className="headerComponent">
      <div className="App-header">
        <h1>Magic The Gathering: Deck Builder</h1>
      </div>
      <div className="DeckButtons">
        <button className="myDeckButton" onClick={props.handleDeckChange}>
          My Deck
        </button>
        <button className="allCardsButton" onClick={props.showAllCards}>
          Show All Cards
        </button>
        <p style={pstyle}>Filter by:</p>
        <Filters handleFilterChange={props.handleFilterChange} />
      </div>
    </div>
  )
}
export default Header
