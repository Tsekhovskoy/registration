/*
 * Getting a list of cities and their streets
 */

async function getData() {
    let array = await fetch(
        'https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json'
    );
    let objData = await array.json();
    let countryBuffer = [];
    let cityBuffer = [];

    for (let countryBuf in objData) {
        countryBuffer.push(countryBuf);
    }
    countryBuffer.sort();

    for (let country in countryBuffer) {
        let option = document.createElement("option");
        option.innerText = countryBuffer[country];
        countrySel.appendChild(option);
    }

    countrySel.onchange = function () {
        citySel.innerHTML = '';

        for (let cityBuf of objData[countrySel.value]) {
            cityBuffer.push(cityBuf);
        }
        cityBuffer.sort();

        for (let city in cityBuffer) {
            let option = document.createElement("option");
            option.innerText = cityBuffer[city];
            citySel.appendChild(option);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getData();
});