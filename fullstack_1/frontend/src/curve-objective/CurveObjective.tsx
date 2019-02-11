import React, {Component} from 'react';
import {Objective} from '../objective/objective.model';
import {AreaChart} from 'react-easy-chart';
import dateFormatter from 'dateformat';

interface CurveObjectiveProps {
    objective: Objective,
    today: Date,
    incrementCurrent: (objectiveId: number) => void
}

interface CurveObjectiveState {
    increment: number
}

class CurveObjectiveComponent extends Component<CurveObjectiveProps, CurveObjectiveState> {
    constructor(props: CurveObjectiveProps) {
        super(props);
        this.state = { increment: 0 };
    }

    render() {
        return <div>
            <h3>{this.props.objective.title}</h3>
            <AreaChart
                axes
                xType={'time'}
                margin={{top: 30, right: 30, bottom: 60, left: 60}}
                axisLabels={{x: 'Number of days', y: 'Progress'}}
                width={600}
                height={300}
                interpolate={'cardinal'}
                data={[
                    this.createSetOfPoints()
                ]}
            />
            <button onClick={() => this.handleClick()}>
                Up Current { this.state.increment > 0 && `(+ ${this.state.increment})`}
            </button>
        </div>;
    }

    public createSetOfPoints(): {x: string, y: number}[] {
        const objective = this.props.objective;
        const startPoint = {
            x: this.formatDate(new Date(objective.start_date)),
            y: objective.start
        };
        const currentPoint = {
            x: this.formatDate(this.props.today),
            y: objective.current
        };
        const endPoint = {
            x: this.formatDate(new Date(objective.end_date)),
            y: objective.target
        };

        return [startPoint, currentPoint, endPoint];
    }

    private formatDate(date: Date): string {
        return dateFormatter(date, 'd-mmm-yy');
    }

    private handleClick() {
        this.props.incrementCurrent(this.props.objective.id);
        this.setState({ increment: this.state.increment + 1})
    }
}

export default CurveObjectiveComponent;