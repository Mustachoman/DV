let happinessData;

d3.csv("Data/2017.csv", function (data) {
    happinessData = data;
});

// let happinessloadInterval = setInterval(setHappinessCountryCodes, 1000);

function setHappinessCountryCodes() {
    let indexesToRemove = [];
    if (happinessData !== undefined && countryCodes !== undefined && storeCount !== undefined) {
        for (country in happinessData) {
            let oldCountryCode = happinessData[country]['Country'];
            let newCountryCode = '';
            for (countryCode in countryCodes) {
                if (countryCodes[countryCode]['official_name_en'] == oldCountryCode) {
                    newCountryCode = countryCodes[countryCode]['ISO3166-1-Alpha-3'];
                    happinessData[country]['Country3'] = newCountryCode;
                    if (Object.keys(storeCount).indexOf(newCountryCode) == -1) {
                        indexesToRemove.push(country)
                    }
                }
            }
        }

        while (indexesToRemove.length) {
            happinessData.splice(indexesToRemove.pop(), 1);
        }
    }
    clearInterval(happinessloadInterval);
    // extractGDPData();
}