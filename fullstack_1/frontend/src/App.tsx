import React, { Component } from 'react';
import {Objective} from './objective/objective.model';
import OBJECTIVES from './objective/objectives.sample';
import CurveObjective from "./curve-objective/CurveObjective";
import TreeComponent from "./tree-structure/Tree";

interface AppState {
  objectives: Objective[],
  today: Date
}

class App extends Component<{}, AppState> {

  constructor() {
    super({});
    const objectivesSample: Objective[] = OBJECTIVES;
    const TODAY = "2018-02-20";
    this.state = {
      objectives: objectivesSample,
      today: new Date(TODAY)
    }
  }

  render() {
    return <div>
      <h1>CHALLENGE JAVELO</h1>
      <h2>{this.numberOfObjectivesOverTheirTarget()} objectives have their current value over their target</h2>
        {
          this.state.objectives.map((o: Objective) =>
              <CurveObjective objective={o}
                              today={this.state.today}
                              incrementCurrent={(objectiveId: number) => this.incrementCurrent(objectiveId)}/>)
        }
      <tr/>

      <TreeComponent objectives={this.state.objectives}/>
    </div>;
  }

  private numberOfObjectivesOverTheirTarget(): number {
    return this.state.objectives
        .filter((objective: Objective) => objective.current > objective.target)
        .length
  }

  private incrementCurrent(objectiveId: number) {
    const newObjectives: Objective[] = this.state.objectives
        .map((obj: Objective) =>
            (obj.id === objectiveId) ?
                { ...obj, current: obj.current + 1 } : obj
        );

    this.setState({
      objectives: newObjectives,
    })
  }
}

export default App;
