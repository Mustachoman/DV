let compareData = {};

let comparemap = new Datamap({
    element: document.getElementById('comparemap'),
    geographyConfig: {
        popupTemplate: function (geography, data) {
            return '<div class="hoverinfo"><b>' + geography.properties.name + '</b><br/>' + 'Starbucks score: ' + data.amount + '</div>'
        }
    },
    fills: {
        defaultFill: '#efe5de'
    },
    projection: 'mercator'
});

function updatecompareMap() {
    let starbucksScore = {};

    let storeModifier = d3.select("#nudStores").property("value");
    let gdpModifier = d3.select("#nudGDP").property("value");

    let storeScoreArray = Object.keys(storeCount).sort((a, b) => { return storeCount[b] - storeCount[a] }).reverse();
    let gdpScoreArray = Object.keys(countryGDP).sort((a, b) => { return countryGDP[b] - countryGDP[a] }).reverse();

    allStores.forEach((store) => {
        countryName = store['Country3'];
        let storeScore = storeScoreArray.indexOf(countryName) * storeModifier;
        let gdpScore = gdpScoreArray.indexOf(countryName) * gdpModifier;
        let countryScore = storeScore + gdpScore
        starbucksScore[countryName] = countryScore.toFixed(2);
    });

    var paletteScale = d3.scale.linear()
        .domain([Math.min(...Object.values(starbucksScore)), Math.max(...Object.values(starbucksScore))])
        .range(["#efffef", "#00713D"]);

    for (country in starbucksScore) {
        var iso = country,
            value = starbucksScore[country];
        compareData[iso] = { amount: value, fillColor: paletteScale(value) };
    }

    comparemap.updateChoropleth(compareData);
}