import React, { Component } from "react"
import Filters from "./Filters"
const Header = props => {
  return (
    <div className="App-header">
      <h1>Magic The Gathering: Deck Builder</h1>
      <Filters />
    </div>
  )
}
export default Header
