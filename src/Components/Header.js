import React from "react"
import Filters from "./Filters"

const Header = props => {
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
        <p style={{
          color: "white",
          fontSize: "12px"
        }}>Filter by:</p>
        <Filters handleFilterChange={props.handleFilterChange} />
        <button className="lessCardsButton" onClick={props.getPrevious100Cards}>
          Previous Page
        </button>
        <button className="moreCardsButton" onClick={props.getNext100Cards}>
          Next Page
        </button>
      </div>
    </div>
  )
}
export default Header
