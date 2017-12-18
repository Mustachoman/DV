const loadBarInterval = setInterval(loadBar, 1000);

const width = 1000,
    height = 500;

function loadBar() {
    if (countryCount !== undefined) {

        const countryCountValues = Object.values(countryCount).sort(compareNumbers);
        const countryCountValuesTop = countryCountValues.slice(0, 10);
        console.log(countryCountValuesTop);

        const topCountries = Object.keys(countryCount).sort((a, b) => { return countryCount[b] - countryCount[a] }).slice(0, 10);
        console.log(topCountries);

        const margin = {
            top: 15,
            right: 60,
            bottom: 15,
            left: 10
        };

        const svg = d3.select(".chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const x = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(countryCountValuesTop, function (d) {
                return d;
            })]);

        const y = d3.scale.ordinal()
            .rangeRoundBands([0, height], .1)
            .domain(Object.keys(countryCountValuesTop));

        const colorScale = d3.scale.log()
            .domain([Math.min(...countryCountValues), Math.max(...countryCountValues)])
            .range(["#efffef", "#00713D"]);

        const yAxis = d3.svg.axis()
            .scale(y)
            .tickSize(0)
            .orient("left")

        const gy = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        const bars = svg.append("g")

        Object.entries(countryCountValuesTop).forEach(([key, value]) => {
            bars.append("rect").attr("class", "bar")
                .attr("y", y(key))
                .attr("height", y.rangeBand())
                .attr("x", 0)
                .attr("width", x(value))
                .attr("fill", colorScale(value));

            bars.append("text")
                .attr("class", "label")
                .attr("y", y(key) + y.rangeBand() / 2 + 4)
                .attr("x", x(value) + 3)
                .text(value);
        })

        clearInterval(loadBarInterval);
    }
}

function compareNumbers(a, b) {
    return b - a;
}
