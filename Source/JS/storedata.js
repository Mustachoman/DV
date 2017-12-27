let allStores;
let storeCount = {};

d3.csv("Data/starbucks-stores.csv", function (data) {
    allStores = data;
});

const loadInterval = setInterval(setCountryCodes, 1000);

function setCountryCodes() {
    if (allStores !== undefined && countryCodes !== undefined) {
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
    setColours(min, max);
}