let width = 700,
    height = 475;

function updateStoreBar(dataset) {
    loadBar(dataset);
}

function loadBar(dataset) {
    d3.select('.storebar').selectAll('svg').remove();

    let countryCountValues = Object.values(dataset).sort(compareNumbers);
    let topCountryValues = countryCountValues.slice(0, 10);

    let topCountryNames = Object.keys(dataset).sort((a, b) => { return dataset[b] - dataset[a] }).slice(0, 10);

    countryKeyValue = [];

    for (let i = 0; i < 10; i++) {
        let country = { "key": topCountryNames[i], "value": topCountryValues[i] };
        countryKeyValue.push(country);
    }

    let margin = {
        top: 15,
        right: 50,
        bottom: 15,
        left: 50
    };

    let svg = d3.select(".storebar").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let x = d3.scale.linear()
        .range([0, width])
        .domain([0, d3.max(countryCountValues, function (d) {
            return d;
        })]);

    let y = d3.scale.ordinal()
        .rangeRoundBands([0, height], .1)
        .domain(countryKeyValue.map(function (d) { return d.key; }))

    let colorScale = d3.scale.log()
        .domain([Math.min(...countryCountValues), Math.max(...countryCountValues)])
        .range(["#efffef", "#00713D"]);

    let yAxis = d3.svg.axis()
        .scale(y)
        .tickSize(0)
        .orient("left")

    let gy = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    let bars = svg.append("g")

    countryKeyValue.forEach((country) => {
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
            .text(country.value);
    })
}

function compareNumbers(a, b) {
    return b - a;
}
