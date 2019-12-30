import React from "react";
import GlobalContext from "./GlobalContext";
import {} from "./cache";

class GlobalProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      team1: [
        { id: 0, value: "20", points: 0 },
        { id: 1, value: "19", points: 0 },
        { id: 2, value: "18", points: 0 },
        { id: 3, value: "17", points: 0 },
        { id: 4, value: "16", points: 0 },
        { id: 5, value: "15", points: 0 },
        { id: 6, value: "Bull", points: 0 }
      ],
      team2: [
        { id: 0, value: "20", points: 0 },
        { id: 1, value: "19", points: 0 },
        { id: 2, value: "18", points: 0 },
        { id: 3, value: "17", points: 0 },
        { id: 4, value: "16", points: 0 },
        { id: 5, value: "15", points: 0 },
        { id: 6, value: "Bull", points: 0 }
      ],
      actionStack: []
    };
  }

  updateScore = async (value, num, add) => {
    let spots = [];
    if (num < 2) {
      spots = this.state.team1;
    } else {
      spots = this.state.team2;
    }

    let valuePair = spots.filter(vp => {
      return vp.value === value;
    })[0];
    let points = valuePair.points;

    if (add) {
      points = this.addPoint(points);
      await this.addToActionStack(value, num);
    } else {
      points = this.removePoint(points);
    }

    valuePair.points = points;
    let updated = spots.filter(vp => {
      return vp.value !== value;
    });
    updated.push(valuePair);
    updated.sort(function(a, b) {
      return a.id - b.id;
    });

    if (num < 2) {
      this.setState({
        team1: updated
      });
    } else {
      this.setState({
        team2: updated
      });
    }
  };

  addPoint = points => {
    if (points < 3) {
      points++;
    }
    return points;
  };

  removePoint = points => {
    if (points > 0) {
      points--;
    }
    return points;
  };

  addToActionStack = async (value, num) => {
    let action = `${num},${value}`;
    let actionStack = this.state.actionStack;
    actionStack.push(action);
    this.setState({
      actionStack
    });
  };

  undoLastAction = () => {
    let actionStack = this.state.actionStack;
    if (actionStack.length > 0) {
      let prevAction = actionStack.pop();
      let teamNum = prevAction.substring(0, prevAction.indexOf(","));
      let value = prevAction.substring(prevAction.indexOf(",") + 1);
      this.updateScore(value, teamNum, false);
    }
  };

  clearBoard = async () => {
    let emptyTeam1 = [
      { id: 0, value: "20", points: 0 },
      { id: 1, value: "19", points: 0 },
      { id: 2, value: "18", points: 0 },
      { id: 3, value: "17", points: 0 },
      { id: 4, value: "16", points: 0 },
      { id: 5, value: "15", points: 0 },
      { id: 6, value: "Bull", points: 0 }
    ];
    let emptyTeam2 = [
      { id: 0, value: "20", points: 0 },
      { id: 1, value: "19", points: 0 },
      { id: 2, value: "18", points: 0 },
      { id: 3, value: "17", points: 0 },
      { id: 4, value: "16", points: 0 },
      { id: 5, value: "15", points: 0 },
      { id: 6, value: "Bull", points: 0 }
    ];

    this.setState({
      team1: emptyTeam1,
      team2: emptyTeam2
    });
  };

  render() {
    const global = {
      data: this.state,

      updateScore: this.updateScore,
      undoLastAction: this.undoLastAction,
      clearBoard: this.clearBoard
    };

    return (
      <GlobalContext.Provider value={global}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export default GlobalProvider;
