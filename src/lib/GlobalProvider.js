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
      ]
    };
  }

  addPoint = async (value, num) => {
    let spots = [];
    if (num === 1) {
      spots = this.state.team1;
    } else {
      spots = this.state.team2;
    }

    let valuePair = spots.filter(vp => {
      return vp.value === value;
    })[0];
    let points = valuePair.points;
    if (points < 3) {
      points++;
    }
    valuePair.points = points;
    let updated = spots.filter(vp => {
      return vp.value !== value;
    });
    updated.push(valuePair);
    updated.sort(function(a, b) {
      return a.id - b.id;
    });

    if (num === 1) {
      this.setState({
        team1: updated
      });
    } else {
      this.setState({
        team2: updated
      });
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

      addPoint: this.addPoint,
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
