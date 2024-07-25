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
                callback(`${previousCity} -> ${city} (Distancia: ${previousDistance})`);
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

    dijkstra(verticeInit) {
        //Inicialización de estructuras
        let conjuntoVertices = []; //Conjunto de vértices del grafo
        let verticesRestantes = []; //Conjunto de los vértices restantes
        let vertices = []; //Vértice
        let distancias = []; //Matriz unidimensional de distancias
        let distanciasProvisorias = [];// Matriz unidimensional para guardar datos temporales
        let indiceInicial; //Indice del vértice inicial

        // Configurar valores iniciales en la matriz de adyacencia
        for (let i = 0; i < this.#adjacencyList.length; i++) {
            for (let j = 0; j < this.#adjacencyList.length; j++) {
                if (this.#adjacencyList[i][j] === undefined) {
                    this.#adjacencyList[i][j] = 10000; // Infinito
                }
            }
        }

        // Inicializar distancias y conjuntos de vértices
        for (let i = 0; i < this.#adjacencyList.length; i++) {
            vertices[i] = i; // v1 => 0, v2 => 1, v3 => 2, etc.
            verticesRestantes[i] = vertices[i]; // Todos los vértices se encuentran aquí
            distancias[i] = 10000; // Todas las distancias inician en infinito
        }

        // Configuración del vértice inicial
        indiceInicial = this.#cityMap.get(verticeInit);
        distancias[indiceInicial] = 0;
        distanciasProvisorias = [...distancias];

        // Algoritmo de Dijkstra
        while (conjuntoVertices.length !== this.#adjacencyList.length) {
            let minimo = Math.min(...distanciasProvisorias.filter(value => value !== null));
            let indice = distanciasProvisorias.indexOf(minimo);
            conjuntoVertices.push(minimo);

            for (let i = 0; i < distancias.length; i++) {
                if (this.#adjacencyList[indice][i] !== 10000) {
                    let suma = distancias[indice] + this.#adjacencyList[indice][i];
                    if (distancias[i] > suma) {
                        distancias[i] = suma;
                    }
                }
            }

            distanciasProvisorias[indice] = null;
        }

        //Conversión de indices a nombres de ciudades
        let resultado = {};
        this.#cityMap.forEach((index, vertex) => {
            resultado[vertex] = distancias[index];
        });

        return resultado;
    }
}
