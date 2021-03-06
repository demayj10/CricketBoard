import React, { Component } from "react";
import { Paper, TextField, List, ListItem } from "@material-ui/core";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import "./ScoreCard.css";
import ButtonItem from "../ButtonItem/index";

const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      input: {
        textAlign: "center"
      }
    }
  }
});

export class ScoreCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamName: ""
    };
  }

  componentDidMount = async () => {
    this.setState({
      teamName: `Team ${this.props.num}`
    });
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { teamName } = this.state;
    const { spots, num } = this.props;

    return (
      <Paper elevation={18} square={true} className="scorecard">
        <ThemeProvider theme={theme}>
          <div>
            <TextField
              value={teamName}
              className="team-name"
              onChange={this.handleChange("teamName")}
            ></TextField>

            <List className="button-list">
              {spots.map(s => (
                <ListItem key={`${num}${s.value}`} className="list-item">
                  <ButtonItem value={s.value} points={s.points} num={num} />
                </ListItem>
              ))}
            </List>
          </div>
        </ThemeProvider>
      </Paper>
    );
  }
}

export default ScoreCard;
