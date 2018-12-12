import React, { Component } from "react"

class Filters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //this is redundant
      myDeckSelected: false
    }
    //binding our three filter methods
    this.handleUpdateName = this.handleUpdateName.bind(this)
    this.handleUpdateColor = this.handleUpdateColor.bind(this)
    this.handleUpdateRarity = this.handleUpdateRarity.bind(this)
  }
  //these methods simply invoke the main function in app.js which is passed down as a prop to reduce rewriting
  handleUpdateName(e) {
    this.props.handleFilterChange("nameSearchInput", e.target.value)
  }
  handleUpdateColor(e) {
    this.props.handleFilterChange("colorValue", e.target.value)
  }
  handleUpdateRarity(e) {
    this.props.handleFilterChange("rarityValue", e.target.value)
  }

  render() {
    //setting a variable to use in inline styling below
    var pstyle = {
      color: "white",
      fontSize: "12px"
    }
    return (
      //setting filter options which will pass up the info into our main filter method in app.js
      <div className="filterInputs">
        <input placeholder="Name" onChange={this.handleUpdateName} />
        <select placeholder="Color" onChange={this.handleUpdateColor}>
          <option value="">color</option>
          <option value="Red">red</option>
          <option value="Blue">blue</option>
          <option value="Green">green</option>
          <option value="White">white</option>
          <option value="Black">black</option>
        </select>
        <select placeholder="Rarity" onChange={this.handleUpdateRarity}>
          <option value="">rarity</option>
          <option value="common">common</option>
          <option value="uncommon">uncommon</option>
          <option value="rare">rare</option>
          <option value="mythic">mythic</option>
        </select>
      </div>
    )
  }
}
export default Filters
