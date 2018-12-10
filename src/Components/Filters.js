import React, { Component } from "react"

class Filters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nameSearchInput: "",
      colorValue: "",
      rarityValue: "",
      formatValue: "",
      myDeckSelected: false
    }
    this.handleUpdateName = this.handleUpdateName.bind(this)
    // this.handleUpdateColor = this.handleUpdateColor.bind(this)
    // this.handleUpdateRarity = this.handleUpdateSet.bind(this)
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

  render() {
    var pstyle = {
      color: "white",
      fontSize: "12px"
    }
    return (
      <div className="filterInputs">
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
        <br />
        <input type="checkbox" text="show multiple" />
        <p style={pstyle}>Show Multiple</p>
      </div>
    )
  }
}
export default Filters
