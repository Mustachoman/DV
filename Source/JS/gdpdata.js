let gdpdata = [];
let countryGDP = {};
let countryGDPPerCapita = {};

d3.csv("Data/GDP.csv", function (data) {
    gdpdata = data;
});

const loadGDP = setInterval(setGDPs, 1000);

function setGDPs() {
    if (gdpdata && countryGDP && countryGDPPerCapita && storeCount) {
        for (country in gdpdata) {
            if (Object.keys(storeCount).indexOf(gdpdata[country]['Country Code']) > -1)
                countryGDP[gdpdata[country]['Country Code']] = gdpdata[country]['GDP']
        }
        calcGDPPerCapita();
        updateGDPMap(countryGDP);
        clearInterval(loadGDP);
    }
}

function calcGDPPerCapita() {
    for (country in countryGDP) {
        let countryPopulation;
        population.forEach((pop) => {
            if (pop['Country Code'] == country) {
                countryPopulation = pop['2016'];
            }
        });
        let perCapitaValue = countryGDP[country] / countryPopulation * 1000;
        countryGDPPerCapita[country] = perCapitaValue.toFixed(2);
    }
}

function switchGDPDataSet() {
    if (lastGDPDataSet == countryGDP) {
        updateGDPMap(countryGDPPerCapita);
        // changeStoreText(storeCountPerCapita);
    }
    else {
        updateGDPMap(countryGDP);
        // changeStoreText(storeCount);
    }
}