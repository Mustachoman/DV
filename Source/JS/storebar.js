let countryCountValues = [];
const loadBarInterval = setInterval(loadBar, 1000);

const width = 1000,
    height = 500;

function loadBar() {
    if (storeCount !== undefined) {

        const countryCountValues = Object.values(storeCount).sort(compareNumbers);
        const topCountryValues = countryCountValues.slice(0, 10);

        const topCountryNames = Object.keys(storeCount).sort((a, b) => { return storeCount[b] - storeCount[a] }).slice(0, 10);

        countryKeyValue = [];

        for (let i = 0; i < 10; i++) {
            country = { "key": topCountryNames[i], "value": topCountryValues[i] };
            countryKeyValue.push(country);
        }

        const margin = {
            top: 15,
            right: 50,
            bottom: 15,
            left: 50
        };

        const svg = d3.select(".bar").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const x = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(topCountryValues, function (d) {
                return d;
            })]);

        const y = d3.scale.ordinal()
            .rangeRoundBands([0, height], .1)
            .domain(countryKeyValue.map(function (d) { return d.key; }))

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

        clearInterval(loadBarInterval);
    }
}

function compareNumbers(a, b) {
    return b - a;
}
