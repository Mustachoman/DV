let allStores = [];
let storeCount = {};
let storeCountPerCapita = {};

d3.csv("Data/starbucks-stores.csv", function (data) {
    allStores = data;
});

const loadInterval = setInterval(setCountryCodes, 1000);

function setCountryCodes() {
    if (allStores && population && storeCount && countryCodes) {
        for (store in allStores) {
            let oldCountryCode = allStores[store]['Country'];
            let newCountryCode = '';
            for (country in countryCodes) {
                if (countryCodes[country]['ISO3166-1-Alpha-2'] == oldCountryCode) {
                    newCountryCode = countryCodes[country]['ISO3166-1-Alpha-3'];
                }
            }
            allStores[store]['Country3'] = newCountryCode;
        }
        countStores();
        clearInterval(loadInterval);
    }
}

function countStores() {
    let max = 1;
    let min = 1;
    for (store in allStores) {
        count = storeCount[allStores[store]['Country3']];
        if (count) {
            count++;
            if (count > max) {
                max = count;
            }
            if (count < min) {
                min = count;
            }
            storeCount[allStores[store]['Country3']] = count;
        }
        else storeCount[allStores[store]['Country3']] = 1;
    }
    calcStorePerCapita();
    updateStoreMap(storeCount);
}

function calcStorePerCapita() {
    for (country in storeCount) {
        let countryPopulation;
        population.forEach((pop) => {
            if (pop['Country Code'] == country) {
                countryPopulation = pop['2016'];
            }
        });
        let perCapitaValue = storeCount[country] / countryPopulation * 100000;
        storeCountPerCapita[country] = perCapitaValue.toFixed(2);
    }
}

function switchStoreDataSet() {
    if (lastDataSet == storeCount) {
        updateStoreMap(storeCountPerCapita);
        changeStoreText(storeCountPerCapita);
    }
    else {
        updateStoreMap(storeCount);
        changeStoreText(storeCount);
    }
}

function changeStoreText(dataset) {
    let newText = "";
    if (dataset == storeCount) {
        newText = "As shown, the USA has almost 5 times as many Starbucks stores as the runner-up China. <br/> <br/> However China has a population of 1.3 billion and the USA 323 million. Try pressing the button to switch between the amount of stores and see how many stores there are per 100.000 people."
    }
    else newText = "The country with the most Starbucks stores per 100.000 inhabitants is Monaco! <br/> <br/> Making the USA the country with the second most Starbucks stores per (100.000) capita. Which is not as suprising seeing that Manaco has 38.500 people living there."

    d3.select("#storeText").html(newText);
}