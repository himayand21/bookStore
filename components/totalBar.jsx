import React, { Component } from "react";
class TotalBar extends Component {
  state = {};
  render() {
    return (
      <h6 style={{ marginTop: 30 }}>
        <hr />
        <div className="row">
          <span className="col-sm-2">
            <b>Total:</b>
          </span>
          <span className="col-sm-4" style={{ textAlign: "right" }}>
            {this.props.totalItems()}
          </span>
          <span className="col-sm-3" />
          <span className="col-sm-3" style={{ textAlign: "right" }}>
            <b>$ {this.props.totalPrice()}</b>
          </span>

          <span
            className="col-sm-12"
            style={{ textAlign: "center", marginTop: 100 }}
          >
            <button className="btn btn-danger btn-sm">
              Proceed to CheckOut
            </button>
          </span>
        </div>
      </h6>
    );
  }
}

export default TotalBar;
