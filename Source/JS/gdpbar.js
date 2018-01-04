function updateGDPBar(GDPdataset) {
    loadGDPBar(GDPdataset);
}

function loadGDPBar(GDPdataset) {
    d3.select('.gdpbar').selectAll('svg').remove();

    let countryGDPValues = Object.values(GDPdataset).sort(compareNumbers);
    let topCountryGDPValues = countryGDPValues.slice(0, 10);

    let topCountryGDPNames = Object.keys(GDPdataset).sort((a, b) => { return GDPdataset[b] - GDPdataset[a] }).slice(0, 10);

    countryGDPKeyValue = [];

    for (let i = 0; i < 10; i++) {
        let countryGDP = { "key": topCountryGDPNames[i], "value": topCountryGDPValues[i] };
        countryGDPKeyValue.push(countryGDP);
    }

    let margin = {
        top: 15,
        right: 50,
        bottom: 15,
        left: 50
    };

    let svg = d3.select(".gdpbar").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let x = d3.scale.linear()
        .range([0, width])
        .domain([0, Math.max(...countryGDPValues), function (d) {
            return d;
        }]);

    let y = d3.scale.ordinal()
        .rangeRoundBands([0, height], .1)
        .domain(countryGDPKeyValue.map(function (d) { return d.key; }))

    let colorScale = d3.scale.log()
        .domain([Math.min(...countryGDPValues), Math.max(...countryGDPValues)])
        .range(["#efffef", "#00713D"]);

    let yAxis = d3.svg.axis()
        .scale(y)
        .tickSize(0)
        .orient("left")

    let gy = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    let bars = svg.append("g")

    countryGDPKeyValue.forEach((country) => {
        bars.append("rect").attr("class", "bar")
            .attr("y", y(country.key))
            .attr("height", y.rangeBand())
            .attr("x", 0)
            .attr("width", x(country.value))
            .attr("fill", colorScale(country.value));

        bars.append("text")
            .attr("class", "label")
            .attr("y", y(country.key) + y.rangeBand() / 2 + 4)
            .attr("x", x(country.value) + 3)
            .text(country.value)
            .attr("title", country.value);
    })
}

function compareValueNumbers(a, b) {
    return b.value - a.value;
}