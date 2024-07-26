import Node from "../LinkedList/Node.js"
import City from "../Vertex.js";

export class LinkedList {
    #count;
    #head;

    constructor() {
        this.#count = 0;
        this.#head = null;
    }

    insert(name, distance) {
        let city = new City(name, distance);
        const node = new Node(city);
        let current;
        if (this.#head == null) {
            this.#head = node;
        } else {
            current = this.#head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.#count++;
    }

    getElementAt(index) {
        if (index >= 0 && index < this.#count) {
            let currentNode = this.#head;
            for (let i = 0; i < index && currentNode != null; i++) {
                currentNode = currentNode.next;
            }
            return currentNode;
        }
        return undefined;
    }
}