import React, { Component } from "react";
import { IconButton, CircularProgress } from "@material-ui/core";
import { Clear, HighlightOff, ShowChart } from "@material-ui/icons";

import GlobalContext from "../../lib/GlobalContext";

import "./ButtonItem.css";

const buttonStyle = {
  width: "2.5em",
  height: "2.5em",
  color: "#c00000"
};

export class ButtonItem extends Component {
  static contextType = GlobalContext;
  state = {
    loading: false
  };

  addPoint = async (value, num) => {
    this.setState({
      loading: true
    });
    await this.context.addPoint(value, num);
    this.setState({
      loading: false
    });
  };

  render() {
    const { loading } = this.state;
    const { value, points, num } = this.props;

    if (loading) {
      return <CircularProgress />;
    }
    switch (points) {
      case 0:
        return (
          <IconButton
            className="icon-button"
            onClick={() => this.addPoint(value, num)}
          />
        );
      case 1:
        return (
          <IconButton
            className="icon-button"
            onClick={() => this.addPoint(value, num)}
          >
            <ShowChart style={buttonStyle} />
          </IconButton>
        );
      case 2:
        return (
          <IconButton
            className="icon-button"
            onClick={() => this.addPoint(value, num)}
          >
            <Clear style={buttonStyle} />
          </IconButton>
        );
      case 3:
        return (
          <IconButton className="icon-button">
            <HighlightOff style={buttonStyle} />
          </IconButton>
        );
      default:
        break;
    }
    return <div></div>;
  }
}

export default ButtonItem;
