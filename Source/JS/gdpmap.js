let gdpMapData = {};
let gdps = [];

let gdpmap = new Datamap({
    element: document.getElementById('gdpmap'),
    geographyConfig: {
        popupTemplate: function (geography, data) {
            return '<div class="hoverinfo"><b>' + geography.properties.name + '</b></br>' + 'GDP per capita:' + data.amount + '</div>'
        }
    },
    fills: {
        defaultFill: '#efe5de'
    },
    projection: 'mercator'
});

function extractGDPData() {
    for (country in happinessData) {
        gdps.push(happinessData[country]["Economy..GDP.per.Capita."])
    }
    setGDPColours(Math.min(...gdps), Math.max(...gdps));
}

function setGDPColours(min, max) {
    var paletteScale = d3.scale.linear()
        .domain([min, max])
        .range(["#efffef", "#00713D"]);
    updateGDPMap(paletteScale);
}

function updateGDPMap(palette) {
    for (country in happinessData) {
        var iso = happinessData[country]["Country3"],
            value = happinessData[country]["Economy..GDP.per.Capita."];
        gdpMapData[iso] = { amount: value, fillColor: palette(value) };
    }
    gdpmap.updateChoropleth(gdpMapData);
}