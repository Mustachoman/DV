let compareWidth = 650,
    compareHeight = 400;

function updateCompareBar(dataset) {
    loadCompareBar(dataset);
}

function loadCompareBar(dataset) {
    d3.select('.comparebar').selectAll('svg').remove();

    let countryCompareValues = Object.values(dataset).sort(compareNumbers);
    let topCountryCompareValues = countryCompareValues.slice(0, 10);

    let topCountryCompareNames = Object.keys(dataset).sort((a, b) => { return dataset[b] - dataset[a] }).slice(0, 10);

    countryCompareKeyValue = [];

    for (let i = 0; i < 10; i++) {
        let country = { "key": topCountryCompareNames[i], "value": topCountryCompareValues[i] };
        countryCompareKeyValue.push(country);
    }

    let margin = {
        top: 15,
        right: 50,
        bottom: 15,
        left: 50
    };

    let svg = d3.select(".comparebar").append("svg")
        .attr("width", compareWidth + margin.left + margin.right)
        .attr("height", compareHeight + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let x = d3.scale.linear()
        .range([0, compareWidth])
        .domain([0, d3.max(countryCompareValues, function (d) {
            return d;
        })]);

    let y = d3.scale.ordinal()
        .rangeRoundBands([0, compareHeight], .1)
        .domain(countryCompareKeyValue.map(function (d) { return d.key; }))

    let colorScale = d3.scale.log()
        .domain([Math.min(...countryCompareValues), Math.max(...countryCompareValues)])
        .range(["#efffef", "#00713D"]);

    let yAxis = d3.svg.axis()
        .scale(y)
        .tickSize(0)
        .orient("left")

    let gy = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    let bars = svg.append("g")

    countryCompareKeyValue.forEach((country) => {
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
