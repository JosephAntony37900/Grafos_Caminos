import Graph from "../models/Graph.js";

let g = new Graph();

const vertexForm = document.getElementById('vertex-form');
const edgeForm = document.getElementById('edge-form');
const graphOutput = document.getElementById('graph-output');
const bfsButton = document.getElementById('bfs-button');
const dfsButton = document.getElementById('dfs-button');
const dijkstraButton = document.getElementById('dijkstra-button'); // Añadir este botón en el HTML
const startVertexTraverse = document.getElementById('start-vertex-traverse');
const endVertexTraverse = document.getElementById('end-vertex-traverse');
const resultsDiv = document.getElementById('results');

vertexForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const vertexName = document.getElementById('vertex-name').value;
    if (vertexName && g.addVertice(vertexName)) {
        alert(`Vertex ${vertexName} added successfully`);
        updateGraphOutput();
    } else {
        alert('Failed to add vertex. It might already exist.');
    }
});

edgeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const startVertex = document.getElementById('start-vertex').value;
    const endVertex = document.getElementById('end-vertex').value;
    const weight = parseInt(document.getElementById('weight').value);

    if (startVertex && endVertex && g.addConexion(startVertex, endVertex, weight)) {
        alert(`Edge from ${startVertex} to ${endVertex} with weight ${weight} added successfully`);
        updateGraphOutput();
    } else {
        alert('Failed to add edge. Please check the vertices.');
    }
});

bfsButton.addEventListener('click', () => {
    const startVertex = startVertexTraverse.value;
    resultsDiv.innerHTML = '';
    if (g.vertexExists(startVertex)) {
        g.bfs((n) => {
            resultsDiv.innerHTML += `<p>${n}</p>`;
        });
    } else {
        alert('Please enter a valid starting vertex.');
    }
});

dfsButton.addEventListener('click', () => {
    const startVertex = startVertexTraverse.value;
    resultsDiv.innerHTML = '';
    if (g.vertexExists(startVertex)) {
        g.dfs((n) => {
            resultsDiv.innerHTML += `<p>${n}</p>`;
        });
    } else {
        alert('Please enter a valid starting vertex.');
    }
});

dijkstraButton.addEventListener('click', () => {
    const startVertex = startVertexTraverse.value;
    const endVertex = endVertexTraverse.value;
    resultsDiv.innerHTML = '';
    if (g.vertexExists(startVertex) && g.vertexExists(endVertex)) {
        const { distance, path } = g.dijkstra(startVertex, endVertex);
        if (distance === Infinity) {
            resultsDiv.innerHTML = `Distance from ${startVertex} to ${endVertex}: Infinity<br>Path: ${endVertex}`;
        } else {
            resultsDiv.innerHTML = `Distance from ${startVertex} to ${endVertex}: ${distance}<br>Path: ${path.join(' -> ')}`;
        }
    } else {
        alert('Please enter valid start and end vertices.');
    }
});

function updateGraphOutput() {
    graphOutput.textContent = JSON.stringify({
        listaAdyacencia: g.getListaAdyacencia(),
        map: Array.from(g.getMap().entries()),
        maprev: Array.from(g.getMapRev().entries())
    }, null, 2);
}

updateGraphOutput();
