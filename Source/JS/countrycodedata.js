let countryCodes = [];

d3.csv("Data/country-codes.csv", function (data) {
    countryCodes = data;
});