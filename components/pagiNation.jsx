import React, { Component } from "react";

class PagiNation extends Component {
  state = {};
  render() {
    return (
      <span>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.showPage(this.props.element)}
        >
          {this.props.element}
        </button>
      </span>
    );
  }
}
export default PagiNation;
