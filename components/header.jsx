import React, { Component } from "react";
class Header extends Component {
  state = {
    inputText: ""
  };
  render() {
    return (
      <div
        className="row"
        style={{
          height: 180,
          backgroundColor: "#c9302c",
          marginBottom: 10,
          paddingTop: 30
        }}
      >
        <span
          className="col-sm-1"
          style={{
            textAlign: "center",
            marginTop: 20
          }}
        >
          <a href="https://imgbb.com/">
            <img
              src="https://image.ibb.co/ma3eep/open_book.png"
              alt="open_book"
              border="0"
            />
          </a>
        </span>
        <span
          className="col-sm-2"
          style={{ textAlign: "center", color: "white", paddingTop: 7 }}
        >
          <span style={{ fontSize: 30 }}>Planet Delta</span>
          <br />
          <br />
          <p>all the books you need...</p>
        </span>
        <span>
          <input
            type="text"
            name="inputText"
            value={this.state.inputText}
            onChange={this.handleChange}
            placeholder="find your book right here..."
            style={{
              textAlign: "center",
              height: 30,
              width: 300,
              borderRadius: 4,
              borderStyle: "none",
              outline: "none",
              marginTop: 30,
              marginLeft: 30
            }}
          />
          <button
            className="button1"
            style={{}}
            onClick={() => this.props.searchProduct(this.state.inputText)}
          >
            Go!
          </button>
        </span>

        <hr />
      </div>
    );
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
}
export default Header;
