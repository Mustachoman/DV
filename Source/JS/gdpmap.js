let gdpMapData = {};

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

function setGDPColours(min, max) {
    var paletteScale = d3.scale.log()
        .domain([min, max])
        .range(["#efffef", "#00713D"]);
    updateGDPMap(paletteScale);
}

function updateGDPMap(palette) {
    for (country in storeCount) {
        var iso = country,
            value = happinesData[country];
        gdpMapData[iso] = { amount: value, fillColor: palette(value) };
    }
    gdpmap.updateChoropleth(gdpMapData);
}