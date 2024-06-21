import { cityGraph } from "./dependencies.js";

document.addEventListener('DOMContentLoaded', () => {
    const cityNameInput = document.querySelector('.main__input--city-name');
    const addCityButton = document.querySelector('.main__button--add-city');
    const cityList = document.querySelector('.main__list--cities');

    const startCityInput = document.querySelector('.main__input--start-city');
    const endCityInput = document.querySelector('.main__input--end-city');
    const distanceInput = document.querySelector('.main__input--distance');
    const addRouteButton = document.querySelector('.main__button--add-route');

    const startDFSInput = document.querySelector('.main__input--start-dfs');
    const showCitiesButton = document.querySelector('.main__button--show-cities');

    const startRouteInput = document.querySelector('.main__input--start-route');
    const showRoutesButton = document.querySelector('.main__button--show-routes');
    const shortestRoutesList = document.querySelector('.main__list--shortest-routes');

    function updateCityList(content) {
        const li = document.createElement('li');
        li.textContent = content;
        cityList.appendChild(li);
    }

    function updateRouteList(routes) {
        shortestRoutesList.innerHTML = '';
        for (const [city, distance] of Object.entries(routes)) {
            const li = document.createElement('li');
            li.textContent = `${city} (Distance: ${distance})`;
            shortestRoutesList.appendChild(li);
        }
    }

    addCityButton.addEventListener('click', () => {
        const cityName = cityNameInput.value.trim();
        if (cityName !== '') {
            cityGraph.addCity(cityName);
            console.log(`City added: ${cityName}`);
            cityNameInput.value = '';
        }
    });

    addRouteButton.addEventListener('click', () => {
        const startCity = startCityInput.value.trim();
        const endCity = endCityInput.value.trim();
        const distance = parseFloat(distanceInput.value.trim());

        if (startCity !== '' && endCity !== '' && !isNaN(distance)) {
            cityGraph.addRoute(startCity, endCity, distance);
            console.log(`Route between ${startCity} and ${endCity} with distance: ${distance}`);
            startCityInput.value = '';
            endCityInput.value = '';
            distanceInput.value = '';
        }
    });

    showCitiesButton.addEventListener('click', () => {
        cityList.innerHTML = '';
        const callbackDFS = (result) => {
            console.log(`DFS: ${result}`);
            updateCityList(result);
        };

        const startCity = startDFSInput.value.trim();
        console.log(`Start DFS: ${startCity}`);
        
        if (!cityGraph.hasCity(startCity)) {
            alert("City does not exist in the graph");
            return;
        }
        
        cityGraph.depthFirstSearch(startCity, callbackDFS);
    });

    showRoutesButton.addEventListener('click', () => {
        shortestRoutesList.innerHTML = '';
        const startCity = startRouteInput.value.trim();
        console.log(`Start Dijkstra: ${startCity}`);

        if (!cityGraph.hasCity(startCity)) {
            alert("City does not exist in the graph");
            return;
        }

        const result = cityGraph.dijkstra(startCity);
        console.log(`Dijkstra: ${JSON.stringify(result)}`);
        updateRouteList(result);
    });
});
