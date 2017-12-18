d3.csv("Data/starbucks-stores.csv", function(data) {
    allStores = data;
});

d3.csv("Data/country-codes.csv", function(data) {
    countryCodes = data;
});

var loadInterval = setInterval(setCountryCodes, 1000);

function setCountryCodes(){
    if (allStores !== undefined && countryCodes !== undefined){
        for(store in allStores){
            var oldCountryCode = allStores[store]['Country'];
            var newCountryCode = '';
            for(country in countryCodes){
                if (countryCodes[country]['ISO3166-1-Alpha-2'] == oldCountryCode){
                    newCountryCode = countryCodes[country]['ISO3166-1-Alpha-3'];
                }
            }
            allStores[store]['Country3'] = newCountryCode;
        }
        countStores();
        clearInterval(loadInterval);
    }
}

function countStores(){
    var max = 1;
    var min = 1;
    for(store in allStores){
        count = countryCount[allStores[store]['Country3']];
        if(count){
            count++;
            if(count > max){
                max = count;
            }
            if (count < min){
                min = count;
            }
            countryCount[allStores[store]['Country3']] = count;
        }
        else countryCount[allStores[store]['Country3']] = 1;
    }
    setColours(min,max);
}