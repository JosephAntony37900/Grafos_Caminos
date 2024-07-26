import { cityGraph } from "./dependencies.js";

document.addEventListener('DOMContentLoaded', () => {
    const ciudadNombreInput = document.querySelector('.main__input--city-name');
    const agregarCiudadBoton = document.querySelector('.main__button--add-city');
    const listaCiudades = document.querySelector('.main__list--cities');

    const iniciarCiudadInput = document.querySelector('.main__input--start-city');
    const finCiudadInput = document.querySelector('.main__input--end-city');
    const distanciaInput = document.querySelector('.main__input--distance');
    const agregarRutaBoton = document.querySelector('.main__button--add-route');

    const iniciarDFSInput = document.querySelector('.main__input--start-dfs');
    const mostratCiudadesBoton = document.querySelector('.main__button--show-cities');

    const iniciarRutaInput = document.querySelector('.main__input--start-route');
    const mostrarRutaBoton = document.querySelector('.main__button--show-routes');
    const listaDeRutas = document.querySelector('.main__list--shortest-routes');

    function actualizarListaCiudades(content) {
        const li = document.createElement('li');
        li.textContent = content;
        listaCiudades.appendChild(li);
    }

    function actualizarListaDeLasRutas(routes) {
        listaDeRutas.innerHTML = '';
        for (const [city, distance] of Object.entries(routes)) {
            const li = document.createElement('li');
            li.textContent = `${city} (Distancia: ${distance})`;
            listaDeRutas.appendChild(li);
        }
    }

    agregarCiudadBoton.addEventListener('click', () => {
        const cityName = ciudadNombreInput.value.trim();
        if (cityName !== '') {
            cityGraph.addCity(cityName);
            console.log(`Ciudad agregada: ${cityName}`);
            ciudadNombreInput.value = '';
        }
    });

    agregarRutaBoton.addEventListener('click', () => {
        const startCity = iniciarCiudadInput.value.trim();
        const endCity = finCiudadInput.value.trim();
        const distance = parseFloat(distanciaInput.value.trim());

        if (startCity !== '' && endCity !== '' && !isNaN(distance)) {
            cityGraph.addRoute(startCity, endCity, distance);
            console.log(`Ruta entre ${startCity} y ${endCity} con distancia de: ${distance}`);
            iniciarCiudadInput.value = '';
            finCiudadInput.value = '';
            distanciaInput.value = '';
        }
    });

    mostratCiudadesBoton.addEventListener('click', () => {
        listaCiudades.innerHTML = '';
        const callbackDFS = (result) => {
            console.log(`DFS: ${result}`);
            actualizarListaCiudades(result);
        };

        const startCity = iniciarDFSInput.value.trim();
        console.log(`Iniciando DFS: ${startCity}`);
        
        if (!cityGraph.hasCity(startCity)) {
            alert("La ciudad no existe");
            return;
        }
        
        cityGraph.depthFirstSearch(startCity, callbackDFS);
    });

    mostrarRutaBoton.addEventListener('click', () => {
        listaDeRutas.innerHTML = '';
        const startCity = iniciarRutaInput.value.trim();
        console.log(`Iniciando Dijkstra: ${startCity}`);

        if (!cityGraph.hasCity(startCity)) {
            alert("La ciudad no existe");
            return;
        }

        const result = cityGraph.dijkstra(startCity);
        console.log(`Dijkstra: ${JSON.stringify(result)}`);
        actualizarListaDeLasRutas(result);
    });
});