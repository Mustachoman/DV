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
        let perCapitaValue = countryGDP[country] / countryPopulation * 100000;
        countryGDPPerCapita[country] = perCapitaValue.toFixed(2);
    }
}

function switchGDPDataSet() {
    if (lastGDPDataSet == countryGDP) {
        updateGDPMap(countryGDPPerCapita);
        changeGDPText(storeCountPerCapita);
    }
    else {
        updateGDPMap(countryGDP);
        changeGDPText(countryGDP);
    }
}

function changeGDPText(GDPDataset) {
    let newText = "";
    if (GDPDataset == countryGDP) {
        newText = "Here you can see the USA is also leading in their GDP, scoring around 18.5 trillion USD. With China again coming in second with 11.2 trillion USD. <br/><br/> So again, the USA and China are leading! <br/><br/> Let's try changing to GDP per capita en see what changes.";
    }
    else newText = "Luxemburg might be a small country but it has the most GDP per 100.000 capita. Switzerland coming in second.<br/><br/> USA, leading in amount of Starbucks and in GDP actually is placed 6th.";

    d3.select("#gdpText").html(newText);
}