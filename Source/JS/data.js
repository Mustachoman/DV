let population = [];
let allStores = [];
let gdpdata = [];
let countryCodes = [];

d3.queue()
    .defer(d3.csv, "Data/country-codes.csv")
    .defer(d3.csv, "Data/GDP.csv")
    // .defer(d3.csv, "Data/2017.csv")
    .defer(d3.csv, "Data/WorldPopulation.csv")
    .defer(d3.csv, "Data/starbucks-stores.csv")
    .await(ready);

function ready(error, countrycodes, GDP, WorldPopulation, starbucksstores) {
    allStores = starbucksstores;
    population = WorldPopulation;
    gdpdata = GDP;
    countryCodes = countrycodes;

    setCountryCodes();
    setGDPs();
    loadStoreGDPScatter();
}