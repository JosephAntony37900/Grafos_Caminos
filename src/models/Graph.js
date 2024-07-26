import { LinkedList } from "./LinkedList/LinkedList.js";

export default class Graph {
    #vertices = [];
    #ciudadMap = new Map();
    #listaDeAdyacencia = [];

    constructor() {}

    addCity(cityName) {
        this.#vertices.push(new LinkedList());
        this.#ciudadMap.set(cityName, this.#vertices.length - 1);
        this.#listaDeAdyacencia.push([]);
        return cityName;
    }

    addRoute(startCity, endCity, distance = 1) {
        if (this.#ciudadMap.has(startCity) && this.#ciudadMap.has(endCity)) {
            this.#vertices[this.#ciudadMap.get(startCity)].insert(endCity, distance);
            this.#vertices[this.#ciudadMap.get(endCity)].insert(startCity, distance);
            this.#listaDeAdyacencia[this.#ciudadMap.get(startCity)][this.#ciudadMap.get(endCity)] = distance;
            this.#listaDeAdyacencia[this.#ciudadMap.get(endCity)][this.#ciudadMap.get(startCity)] = distance;
            return true;
        }
        return false;
    }

    hasCity(cityName) {
        return this.#ciudadMap.has(cityName);
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
            const cityIndex = this.#ciudadMap.get(city);
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
        for (let i = 0; i < this.#listaDeAdyacencia.length; i++) {
            for (let j = 0; j < this.#listaDeAdyacencia.length; j++) {
                if (this.#listaDeAdyacencia[i][j] === undefined) {
                    this.#listaDeAdyacencia[i][j] = 10000; 
                }
            }
        }

        // Inicializar distancias y conjuntos de vértices
        for (let i = 0; i < this.#listaDeAdyacencia.length; i++) {
            vertices[i] = i; // v1 => 0, v2 => 1, v3 => 2, etc..
            verticesRestantes[i] = vertices[i]; // Todos los vértices se encuentran aquí
            distancias[i] = 10000; 
        }

        // Configuración del vértice inicial
        indiceInicial = this.#ciudadMap.get(verticeInit);
        distancias[indiceInicial] = 0;
        distanciasProvisorias = [...distancias];

        // Algoritmo de Dijkstra
        while (conjuntoVertices.length !== this.#listaDeAdyacencia.length) {
            let minimo = Math.min(...distanciasProvisorias.filter(value => value !== null));
            let indice = distanciasProvisorias.indexOf(minimo);
            conjuntoVertices.push(minimo);

            for (let i = 0; i < distancias.length; i++) {
                if (this.#listaDeAdyacencia[indice][i] !== 10000) {
                    let suma = distancias[indice] + this.#listaDeAdyacencia[indice][i];
                    if (distancias[i] > suma) {
                        distancias[i] = suma;
                    }
                }
            }

            distanciasProvisorias[indice] = null;
        }

        //Conversión de indices a nombres de ciudades
        let resultado = {};
        this.#ciudadMap.forEach((index, vertex) => {
            resultado[vertex] = distancias[index];
        });

        return resultado;
    }
}