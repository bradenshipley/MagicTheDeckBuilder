import React, { Component } from "react"
import Header from "./Header"

class Filters extends Component {
  constructor(props) {
    super(props)

    // this.handleUpdateName = this.handleUpdateName.bind(this)
    // this.handleUpdateColor = this.handleUpdateColor.bind(this)
    // this.handleUpdateRarity = this.handleUpdateSet.bind(this)
    // this.handleUpdateCost = this.handleUpdateCost.bind(this)
    // this.handleUpdateFormat = this.handleUpdateFormate.bind(this)
  }
  handleUpdateName(e) {
    this.props.handleFilterChange("nameSearchInput", e.target.value)
  }
  handleUpdateColor(e) {
    this.props.handleFilterChange("colorValue", e.target.value)
  }
  handleUpdateRarity(e) {
    this.props.handleFilterChange("setValue", e.target.value)
  }

  // handleUpdateFormat(e) {
  //   this.props.handleFilterChange("formatValue", e.target.value)
  // }
  render() {
    return (
      <div className="filterInputs">
        {
          //use this component again in the myDeck page. could this component hold the state of the forms? That would solve one of the requirements easy
        }
        <input placeholder="Name" />
        <select placeholder="Color">
          <option value="">color</option>
          <option value="red">red</option>
          <option value="blue">blue</option>
          <option value="green">green</option>
          <option value="white">white</option>
          <option value="black">black</option>
        </select>
        <select placeholder="Rarity">
          <option value="">rarity</option>
          <option value="common">common</option>
          <option value="uncommon">uncommon</option>
          <option value="rare">rare</option>
          <option value="mythic">mythic</option>
        </select>

        {/* <select placeholder="Format" /> */}
      </div>
    )
  }
}
export default Filters
