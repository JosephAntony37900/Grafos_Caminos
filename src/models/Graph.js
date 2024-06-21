
import { LinkedList } from "./LinkedList/LinkedList.js";

export default class Graph {
    #vertices = [];
    #cityMap = new Map();
    #adjacencyList = [];

    constructor() {}

    addCity(cityName) {
        this.#vertices.push(new LinkedList());
        this.#cityMap.set(cityName, this.#vertices.length - 1);
        this.#adjacencyList.push([]);
        return cityName;
    }

    addRoute(startCity, endCity, distance = 1) {
        if (this.#cityMap.has(startCity) && this.#cityMap.has(endCity)) {
            this.#vertices[this.#cityMap.get(startCity)].insert(endCity, distance);
            this.#vertices[this.#cityMap.get(endCity)].insert(startCity, distance);
            this.#adjacencyList[this.#cityMap.get(startCity)][this.#cityMap.get(endCity)] = distance;
            this.#adjacencyList[this.#cityMap.get(endCity)][this.#cityMap.get(startCity)] = distance;
            return true;
        }
        return false;
    }

    hasCity(cityName) {
        return this.#cityMap.has(cityName);
    }

    depthFirstSearch(startCity, callback) {
        const visited = new Set();
        this.#dfs(startCity, visited, null, 0, callback);
    }

    #dfs(city, visited, previousCity = null, previousDistance = 0, callback) {
        if (!visited.has(city)) {
            if (previousCity !== null) {
                callback(`${previousCity} -> ${city} (Distance: ${previousDistance})`);
            } else {
                callback(city);
            }
            visited.add(city);
            const cityIndex = this.#cityMap.get(city);
            const neighbors = this.#vertices[cityIndex];
            let currentNode = neighbors.getElementAt(0);
            while (currentNode !== undefined && currentNode !== null) {
                const neighborCity = currentNode.value.name;
                const distance = currentNode.value.distance;
                if (!visited.has(neighborCity)) {
                    this.#dfs(neighborCity, visited, city, distance, callback);
                }
                currentNode = currentNode.next;
            }
        }
    }

    dijkstra(startCity) {
        const distances = {};
        const visited = new Set();
        const unvisited = new Set(this.#cityMap.keys());
        
        // Inicializa distancia
        for (const city of this.#cityMap.keys()) {
            distances[city] = Infinity;
        }
        distances[startCity] = 0;

        while (unvisited.size > 0) {
            //Encuentra el nodo no visitado con la distancia más pequeña
            let currentCity = null;
            for (const city of unvisited) {
                if (currentCity === null || distances[city] < distances[currentCity]) {
                    currentCity = city;
                }
            }

            if (distances[currentCity] === Infinity) {
                break;
            }

            unvisited.delete(currentCity);
            visited.add(currentCity);

            //Actualiza distancias vecinas
            const currentIndex = this.#cityMap.get(currentCity);
            const neighbors = this.#vertices[currentIndex];
            let currentNode = neighbors.getElementAt(0);
            while (currentNode !== null) {
                const neighborCity = currentNode.value.name;
                if (!visited.has(neighborCity)) {
                    const newDistance = distances[currentCity] + currentNode.value.distance;
                    if (newDistance < distances[neighborCity]) {
                        distances[neighborCity] = newDistance;
                    }
                }
                currentNode = currentNode.next;
            }
        }

        return distances;
    }
}
