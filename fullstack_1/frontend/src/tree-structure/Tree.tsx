import React, {Component} from 'react';
import {Objective} from '../objective/objective.model';
import './tree.css';

const Tree = require('react-tree-graph');

interface TreeProps {
    objectives: Objective[]
}

interface Node {
    name: string;
    children: Node[];
}

class TreeComponent extends Component<TreeProps> {
    constructor(props: TreeProps) {
        super(props);
    }

    render() {
        return <div>
            <h2>Objectives: Tree Structure</h2>
            <Tree
            data={this.createTreeFromObjectives(this.props.objectives)}
            height={400}
            width={800}
            svgProps={{ className: 'custom' }}/>
        </div>
    }

    public createTreeFromObjectives(objectives: Objective[]): Node {
        let referentialMap: { [id: number]: string } = {};
        this.props.objectives.forEach((o: Objective) => referentialMap[o.id] = o.title);

        const root = this.props.objectives.find((o: Objective) => !o.parent_id);

        return !!root ?
            this.createTree(root.id, objectives, referentialMap) :
            {name: "No root objective", children: []};
    }

    private createTree(nodeId: number, objectivesRemains: Objective[], referential: { [id: number]: string }): Node {
        const childrenNode = objectivesRemains
            .filter((o: Objective) => nodeId === o.parent_id);
        const newObjectivesRemains = objectivesRemains
            .filter((o: Objective) => nodeId !== o.parent_id);

        return {
            name: referential[nodeId],
            children: childrenNode
                .map((o: Objective) => this.createTree(o.id, newObjectivesRemains, referential))
        }
    }
}

export default TreeComponent;