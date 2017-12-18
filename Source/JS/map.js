var map = new Datamap({
    element: document.getElementById('map'),
    geographyConfig: {
        popupTemplate: function (geography, data) {
            return '<div class="hoverinfo"><b>' + geography.properties.name + '</b></br>' + 'Amount of Starbucks stores:' + data.amount + '</div>'
        }
    },
    fills: {
        defaultFill: '#efe5de'
    },
    projection: 'mercator'
});

function setColours(min, max) {
    var paletteScale = d3.scale.log()
        .domain([min, max])
        .range(["#efffef", "#00713D"]);
    updateMap(paletteScale);
}

function updateMap(palette) {
    for (country in countryCount) {
        var iso = country,
            value = countryCount[country];
        dataset[iso] = { amount: value, fillColor: palette(value) };
    }
    map.updateChoropleth(dataset);
}