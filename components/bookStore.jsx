import React, { Component } from "react";
import Product from "./product";
import Cart from "./cart";
import Header from "./header";
import NavBar from "./navigationBar";
import PagiNation from "./pagiNation";
import TotalBar from "./totalBar";
import "./styleSheet.css";
class BookStore extends Component {
  state = {
    products: [],
    items: [],
    noOfPages: [],
    lowerLimit: 0,
    upperLimit: 6
  };
  render() {
    return (
      <div>
        <div className="row">
          <span className="col-sm-12">
            <Header searchProduct={this.searchProduct} />
          </span>
          <span className="col-sm-12">
            <NavBar
              noOfPages={this.noOfPages}
              sortByAuthor={this.sortByAuthor}
              sortByPrice={this.sortByPrice}
              products={this.state.products}
              lowerLimit={this.state.lowerLimit}
              upperLimit={this.state.upperLimit}
            />
          </span>
          <span className="col-sm-8" style={{ textAlign: "center" }}>
            <hr />
            {this.state.products
              .slice(this.state.lowerLimit, this.state.upperLimit)
              .map(eachProduct => (
                <Product
                  key={eachProduct.id}
                  product={eachProduct}
                  addProduct={this.addProduct}
                />
              ))}
          </span>
          <span
            className="col-sm-4"
            style={{ position: "fixed", right: 0, top: 200 }}
          >
            <div className="row">
              <span
                className="col-sm-12"
                style={{
                  textAlign: "right",
                  fontWeight: "Bold"
                }}
              >
                Your Cart
                <hr />
              </span>
              {this.state.items.length === 0 ? (
                <span
                  className="col-sm-12"
                  style={{
                    textAlign: "center",
                    fontWeight: "lighter",
                    fontSize: 30,
                    paddingRight: 50
                  }}
                >
                  Nothing yet....
                </span>
              ) : (
                <span className="col-sm-12">
                  {this.state.items.map(counter => (
                    <Cart
                      key={counter.id}
                      onDelete={this.handleDelete}
                      handleAddEvent={this.handleAddEvent}
                      handleSubtractEvent={this.handleSubtractEvent}
                      counter={counter}
                    />
                  ))}
                </span>
              )}
            </div>

            <TotalBar
              totalItems={this.totalItems}
              totalPrice={this.totalPrice}
            />
          </span>
          <span
            className="col-sm-8"
            style={{ textAlign: "center", marginBottom: 30 }}
          >
            {this.state.noOfPages.map(element => (
              <PagiNation
                key={element}
                element={element}
                showPage={this.showPage}
              />
            ))}
          </span>
        </div>
      </div>
    );
  }
  showPage = index => {
    var lowerLimit = 0;
    var upperLimit = 6;
    lowerLimit = lowerLimit + (index - 1) * 6;
    upperLimit = upperLimit + (index - 1) * 6;
    if (upperLimit > this.state.products.length)
      upperLimit = this.state.products.length;
    this.setState({ lowerLimit });
    this.setState({ upperLimit });
    console.log(this.state.lowerLimit);
  };
  searchProduct = queryText => {
    var lowerLimit = 0;
    var upperLimit = 6;
    this.setState({ lowerLimit });
    this.setState({ upperLimit });
    var products = [];
    fetch(
      "https://www.googleapis.com/books/v1/volumes/?q=" +
        queryText +
        "&maxResults=40"
    )
      .then(response => {
        return response.json();
      })
      .then(result => {
        for (let i = 0; i < result.items.length; i++) {
          if (result.items[i].saleInfo.saleability === "FOR_SALE") {
            var tempId = result.items[i].id;
            var tempName = result.items[i].volumeInfo.title;
            var tempPrice =
              (result.items[i].saleInfo.listPrice.amount * 100) / 100;
            var tempAuthor = result.items[i].volumeInfo.authors.join(", ");
            var imageUrl = result.items[i].volumeInfo.imageLinks.smallThumbnail;
            var description = result.items[i].volumeInfo.description;
            var newObj = {
              id: tempId,
              name: tempName,
              price: tempPrice,
              author: tempAuthor,
              url: imageUrl,
              desc: description
            };
            products = [...products, newObj];
          }
        }
        return products;
      })
      .then(products => {
        var pageNo = 0;
        if (products.length / 6 > 0) pageNo = Math.ceil(products.length / 6);

        var noOfPages = new Array(pageNo);
        for (let i = 0; i < pageNo; i++) {
          noOfPages[i] = i + 1;
        }
        this.setState({ products });
        this.setState({ noOfPages });
        console.log(this.state.noOfPages);
      });
  };

  handleDelete = counterId => {
    const items = this.state.items.filter(c => c.id !== counterId);
    this.setState({ items });
  };
  handleAddEvent = counter => {
    const items = [...this.state.items];
    const index = items.indexOf(counter);
    items[index] = { ...counter };
    items[index].price =
      Math.round(
        (items[index].price / items[index].value) *
          (items[index].value + 1) *
          100
      ) / 100;
    items[index].value++;
    this.setState({ items });
  };
  handleSubtractEvent = counter => {
    const items = [...this.state.items];
    const index = items.indexOf(counter);
    if (items[index].value === 1) this.handleDelete(items[index].id);
    else {
      items[index].price =
        Math.round(
          (items[index].price - items[index].price / items[index].value) * 100
        ) / 100;
      items[index].value--;
      this.setState({ items });
    }
  };
  totalItems = () => {
    var total = 0;
    this.state.items.forEach(element => {
      total = total + element.value;
    });
    return total;
  };
  totalPrice = () => {
    var total = 0;
    this.state.items.forEach(element => {
      total = total + element.price;
    });
    return Math.round(total * 100) / 100;
  };

  addProduct = product => {
    var flag = 0;
    for (let i = 0; i < this.state.items.length; i++) {
      if (product.id === this.state.items[i].id) {
        this.handleAddEvent(this.state.items[i]);
        flag++;
      }
    }
    if (flag === 0) {
      product = { ...product, value: 1 };
      const items = [...this.state.items, product];
      this.setState({ items });
    }
  };
  sortByAuthor = flag => {
    var sortedProducts = [...this.state.products];
    sortedProducts.sort(function(a, b) {
      var x = a.author.toLowerCase();
      var y = b.author.toLowerCase();
      if (flag % 2 !== 0) {
        if (x < y) return -1;
        else return 1;
      } else {
        if (x < y) return 1;
        else return -1;
      }
    });
    this.setState({ products: sortedProducts });
  };
  sortByPrice = flag => {
    var sortedProducts = [...this.state.products];
    if (flag % 2 !== 0) {
      sortedProducts.sort(function(a, b) {
        return a.price - b.price;
      });
    } else {
      sortedProducts.sort(function(a, b) {
        return b.price - a.price;
      });
    }
    this.setState({ products: sortedProducts });
  };
}
export default BookStore;
