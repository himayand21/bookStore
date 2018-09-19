import React, { Component } from "react";

class Product extends Component {
  render() {
    return (
      <div className="row" style={{ marginTop: 40 }}>
        <span
          className="col-sm-1"
          style={{
            margin: "0px 30px 30px 40px"
          }}
        >
          <a href="https://imgbb.com/">
            <img src={this.props.product.url} alt="open_book" border="0" />
          </a>
        </span>
        <span
          className="col-sm-9"
          style={{
            textAlign: "justify  ",
            paddingLeft: 50,
            paddingBottom: 30,
            paddingRight: 50
          }}
        >
          <b style={{ fontSize: 24 }}>{this.props.product.name}</b>
          <p />
          <i style={{ fontSize: 18 }}> ~ {this.props.product.author}</i>
          <p />
          {this.props.product.desc}
        </span>

        <span className="col-sm-1" style={{ textAlign: "center" }}>
          <b style={{ fontSize: 13 }}>${" " + this.props.product.price}</b>
          <p />
          <button
            style={{
              fontSize: 12
            }}
            className="btn btn-danger btn-sm"
            onClick={() => this.props.addProduct(this.props.product)}
          >
            Add to Cart
          </button>
        </span>
        <span className="col-sm-12" style={{ marginTop: 40 }}>
          <hr />
        </span>
      </div>
    );
  }
}

export default Product;
