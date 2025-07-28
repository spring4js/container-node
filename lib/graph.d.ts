export interface Node {
    name: string;
    incoming: {
        [key: string]: number;
    };
    outgoing: {
        [key: string]: number;
    };
}
export declare class Graph {
    private _nodes;
    constructor();
    getLeafList(): string[];
    insertEdge(from: string, to: string): void;
    removeNode(name: string): void;
    lookupOrInsertNode(name: string): Node;
    lookup(data: string): Node;
    isEmpty(): boolean;
    toString(): string;
}
