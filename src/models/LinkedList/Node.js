class Node {
    #key
    #next
    #weight

    constructor(key,weight){
        this.#key=key;
        this.#next=null;
        this.#weight=weight;
    }
    
    getKey(){
        return this.#key;
    }
    
    set next(node) {
        this.#next = node;
    }

    get next() {
        return this.#next;
    }
}

export default Node