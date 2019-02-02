import React, { Component } from "react";
import logo from "./logo.svg";

class App extends Component {

  state = {
    text: "Edit src/App.js and save to reload.",
    image_url: logo
  }

  //This is once the program mounts, what is below will show up on the program.
  componentDidMount() {
    this.setState({ text: "This is going to be fresh mango" })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={this.state.image_url} className="App-logo" alt="logo" />
          <p>
            {this.state.text}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

