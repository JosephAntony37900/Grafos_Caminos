import Node from "./Node.js";

class LinkedList {
    #head
    size

    constructor() {
        this.#head = null;
        this.size = 0;
    }

    addList(key, weight = 1) {
        let node = new Node(key, weight);
        if (this.#head == null) {
            this.#head = node;
        } else {
            let current = this.#head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }

    run(callback) {
        let current = this.#head;
        if (this.#head == null) {
            console.log("vacio");
        } else {
            while (current != null) {
                callback(current.getKey(), current.weigh);
                current = current.next;
            }
        }
    }
}

export default LinkedList;
