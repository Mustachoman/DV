let countMapData = {};
let lastDataSet = {};

let map = new Datamap({
    element: document.getElementById('storemap'),
    geographyConfig: {
        popupTemplate: function (geography, data) {
            return '<div class="hoverinfo"><b>' + geography.properties.name + '</b></br>' + 'Amount of Starbucks stores ' + (lastDataSet == storeCountPerCapita ? '(per 100.000 people):' : '') + data.amount + '</div>'
        }
    },
    fills: {
        defaultFill: '#efe5de'
    },
    projection: 'mercator'
});

function updateStoreMap(dataset) {
    lastDataSet = dataset;

    var paletteScale = d3.scale.log()
        .domain([Math.min(...Object.values(dataset)), Math.max(...Object.values(dataset))])
        .range(["#efffef", "#00713D"]);

    for (country in dataset) {
        var iso = country,
            value = dataset[country];
        countMapData[iso] = { amount: value, fillColor: paletteScale(value) };
    }

    map.updateChoropleth(countMapData);
    updateStoreBar(dataset);
}