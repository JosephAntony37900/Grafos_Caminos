class Node {
    #value;
    #next;

    constructor(value) {
        this.#value = value;
        this.#next = null;
    }

    get value() {
        return this.#value;
    }

    set next(node) {
        this.#next = node;
    }

    get next() {
        return this.#next;
    }
}

export default Node;