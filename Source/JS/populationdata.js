let population = [];

d3.csv("Data/WorldPopulation.csv", function (data) {
    population = data;

    //population['Country Code'] == Country3
    //population['2016'] is population count
});