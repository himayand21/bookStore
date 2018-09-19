import React, { Component } from "react";
class NavBar extends Component {
  state = {
    timesClickedPrice: 0,
    timesClickedAuthor: 0,
    pageNo: 0
  };
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <div className="rows">
          <span
            className="col-sm-2"
            style={{ textAlign: "left", paddingTop: 10, fontSize: 14 }}
          >
            <i> Search Results...</i>
          </span>
          <span className="col-sm-1" />
          <span className="col-sm-8">
            <button
              className="btn btn-danger btn-sm"
              onClick={() =>
                this.props.sortByAuthor(this.state.timesClickedAuthor++)
              }
            >
              Sort by Author Name
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() =>
                this.props.sortByPrice(this.state.timesClickedPrice++)
              }
            >
              Sort by Price
            </button>
          </span>
          <span className="col-sm-4">
            {this.props.products.length === 0 ? (
              <span />
            ) : (
              <span
                style={{
                  textAlign: "right",
                  paddingTop: 10,
                  fontSize: 14
                }}
              >
                <i>
                  {" "}
                  showing {this.props.lowerLimit + 1}-{this.props.upperLimit}{" "}
                  out of {this.props.products.length} results
                </i>
              </span>
            )}
          </span>
        </div>
      </div>
    );
  }
}

export default NavBar;
