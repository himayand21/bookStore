import React, { Component } from "react";
class Cart extends Component {
  render() {
    return (
      <div>
        <div className="row" style={{ fontSize: 15 }}>
          <span
            className="col-sm-4"
            style={{ fontSize: 15, marginBottom: 5, paddingTop: 8 }}
          >
            {this.props.counter.name}
          </span>

          <span className="col-sm-6">
            <button
              style={{ fontSize: 12 }}
              onClick={() => this.props.handleAddEvent(this.props.counter)}
              className="btn btn-danger btn-sm"
            >
              {" "}
              +{" "}
            </button>
            <button
              style={{ fontSize: 12 }}
              onClick={() => this.props.handleSubtractEvent(this.props.counter)}
              className="btn btn-danger btn-sm"
            >
              {" "}
              -{" "}
            </button>
            <button
              style={{ fontSize: 12 }}
              onClick={() => this.props.onDelete(this.props.counter.id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
            <b style={{ fontSize: 12 }}>
              {"      (×"}
              {this.props.counter.value}
              {") "}
            </b>
          </span>
          <span
            className="col-sm-2"
            style={{
              textAlign: "right",
              fontSize: 15,
              marginBottom: 5,
              paddingTop: 8
            }}
          >
            ${this.props.counter.price}
          </span>
        </div>
      </div>
    );
  }
}

export default Cart;
