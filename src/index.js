import React from "react";
import ReactDOM from "react-dom";

import ControlBar from "./ControlBar";
import KochSnowflake from "./KochSnowflake";

import "./styles.css";

class App extends React.PureComponent {
  state = {
    zoom: 1,
    width: 800,
    height: 600,
    invertX: false,
    invertY: false
  };

  onZoomChange = zoom => {
    this.setState({ zoom });
  };

  onInvertX = invertX => {
    this.setState({ invertX });
  };

  onInvertY = invertY => {
    this.setState({ invertY });
  };

  render() {
    const { onZoomChange, onInvertX, onInvertY } = this;
    const { zoom, width, height, invertX, invertY } = this.state;

    return (
      <div className="App">
        <h1>KochSnowflake.js</h1>

        <ControlBar
          {...{ zoom, invertX, invertY, onZoomChange, onInvertX, onInvertY }}
        />

        <KochSnowflake {...{ zoom, width, height, invertX, invertY }} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
