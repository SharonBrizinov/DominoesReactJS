import React, { Component } from "react";
import LogoImage from "./es6-Logo.jpeg";
import theme from "./theme.css";

class Example extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  render() {
    return (
      <div>
        <p>Hello worlf from react 16 </p>
        <img src={LogoImage} />
      </div>
    );
  }
}
export default Example;