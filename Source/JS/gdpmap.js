let gdpMapData = {};
let lastGDPDataSet = {};

let gdpmap = new Datamap({
    element: document.getElementById('gdpmap'),
    geographyConfig: {
        popupTemplate: function (geography, data) {
            return '<div class="hoverinfo"><b>' + geography.properties.name + '</b></br>' + 'GDP (in millions)' + (lastGDPDataSet == countryGDPPerCapita ? ' (per 1.000 people)' : '') + ": " + data.amount + '</div>'
        }
    },
    fills: {
        defaultFill: '#efe5de'
    },
    projection: 'mercator'
});

function updateGDPMap(GDPdataset) {
    lastGDPDataSet = GDPdataset;

    var paletteScale = d3.scale.linear()
        .domain([Math.min(...Object.values(GDPdataset)), Math.max(...Object.values(GDPdataset))])
        .range(["#efffef", "#00713D"]);

    for (country in GDPdataset) {
        var iso = country,
            value = GDPdataset[country];
        gdpMapData[iso] = { amount: value, fillColor: paletteScale(value) };
    }

    gdpmap.updateChoropleth(gdpMapData);
    updateGDPBar(GDPdataset);
}