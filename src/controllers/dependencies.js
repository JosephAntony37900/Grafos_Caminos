import Graph from "../models/Graph.mjs";
const g = new Graph(); 


g.addVertices("A", "B", "C", "D", "E", "F", "G", "H", "I");
g.addConexion("A", "B");
g.addConexion("A", "C");
g.addConexion("A", "D", 8);
g.addConexion("B", "E", 9);
g.addConexion("B", "F", 10);
g.addConexion("D", "F", 11);
g.addConexion("E", "G", 12);
g.addConexion("G", "H");
g.addConexion("G", "I");


function performBFS() {
    const startVertex = document.getElementById('startVertex').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; 

    if (startVertex && g.addVertice(startVertex)) {
        g.bfs((n) => {
            resultsDiv.innerHTML += `<p>${n}</p>`;
        });
    } else {
        alert('Please enter a valid starting vertex.');
    }
}

function performDFS() {
    const startVertex = document.getElementById('startVertex').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; 

    if (startVertex && g.addVertice(startVertex)) {
        g.dfs((n) => {
            resultsDiv.innerHTML += `<p>${n}</p>`;
        });
    } else {
        alert('Please enter a valid starting vertex.');
    }
}

