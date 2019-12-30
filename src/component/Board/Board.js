import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  BottomNavigation,
  BottomNavigationAction,
  ListItem,
  CircularProgress
} from "@material-ui/core";
import { Replay, Cancel } from "@material-ui/icons";
import GlobalContext from "../../lib/GlobalContext";

import ScoreCard from "../ScoreCard/index";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import "./Board.css";

const spots = [
  { id: 0, value: "20" },
  { id: 1, value: "19" },
  { id: 2, value: "18" },
  { id: 3, value: "17" },
  { id: 4, value: "16" },
  { id: 5, value: "15" },
  { id: 6, value: "Bull" }
];

const theme = createMuiTheme({
  overrides: {
    MuiListItem: {
      root: {
        display: "block"
      }
    }
  }
});

export class Board extends Component {
  static contextType = GlobalContext;
  render() {
    const { team1, team2 } = this.context.data;
    const { undoLastAction, clearBoard } = this.context;

    if (team1 === null || team2 === null) {
      return <CircularProgress />;
    }

    return (
      <div id="board-background">
        <AppBar position="static" id="topBar">
          <div>
            <Toolbar>
              <div id="title-container">
                <Typography id="title">Cricket Board</Typography>
              </div>
            </Toolbar>
          </div>
        </AppBar>

        <div id="score-container">
          <ScoreCard spots={team1} num={1} />

          <div id="numbers-list">
            <List className="values-list">
              <ThemeProvider theme={theme}>
                {spots.map(s => (
                  <ListItem key={s.value} className="value-text-container">
                    <Typography className="value-text">{s.value}</Typography>
                  </ListItem>
                ))}
              </ThemeProvider>
            </List>
          </div>

          <ScoreCard spots={team2} num={2} />
        </div>

        <BottomNavigation showLabels id="bottomBar">
          <BottomNavigationAction
            label="Undo"
            icon={<Replay />}
            onClick={undoLastAction}
            className="bottom-buttons"
          />
          <BottomNavigationAction
            label="Reset"
            icon={<Cancel />}
            onClick={clearBoard}
            className="bottom-buttons"
          />
        </BottomNavigation>
      </div>
    );
  }
}

export default Board;
