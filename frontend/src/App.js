import React, { useState, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Stripecheckout from "react-stripe-checkout";
import axios from "axios";

class App extends Component {
  render() {
    const product = {
      name: "React from FB",
      price: 10,
      productBy: "facebook",
    };

    const key =
      "pk_test_51GxBpJIKGrlJ4qLwK7VZrSES10EiC1Nq4P7flKFzKWNS0lawLrGkAnuWJ7QIyGQ5EFZCruYVPoiH35x5jcL6uM7000SpeZkHo4";
    const makePaymentHandler = (token) => {
      const body = {
        token,
        product,
      };
      const headers = {
        "Content-Type": "application/json",
      };

      // return axios
      //   .post("http://localhost:8282/payment/", body)
      //   .then((res) => {
      //     console.log(res);
      //     const { status } = res;
      //     console.log("Status", status);
      //   })
      //   .catch((err) => console.log(`Error ${err}`));

      return fetch("http://localhost:8282/payment/", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(`Error ${err}`));
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Stripecheckout
            stripeKey={key}
            token={makePaymentHandler}
            amount={product.price * 100}
            name="Buy React"
          >
            <button className="btn-large blue">
              {" "}
              Buy react in Just {product.price} $
            </button>
          </Stripecheckout>
        </header>
      </div>
    );
  }
}

export default App;
