let loadGDPBarInterval = setInterval(loadGDPBar, 1000);

function loadGDPBar() {
    if (happinessData !== undefined) {

        let GDPData = [];
        let GDPValues = [];
        let GDPCountries = [];

        for (country in happinessData) {
            let iso = happinessData[country]["Country3"],
                value = happinessData[country]["Economy..GDP.per.Capita."];
            GDPValues.push(value);
            GDPCountries.push(iso);
            GDPData.push({ "key": iso, "value": value });
        }

        GDPData = GDPData.sort(compareValueNumbers).slice(0, 10);

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
            .domain([0, d3.max(GDPValues, function (d) {
                return d;
            })]);

        let y = d3.scale.ordinal()
            .rangeRoundBands([0, height], .1)
            .domain(GDPData.map(function (d) { return d.key; }))

        let colorScale = d3.scale.linear()
            .domain([Math.min(...GDPValues), Math.max(...GDPValues)])
            .range(["#efffef", "#00713D"]);

        let yAxis = d3.svg.axis()
            .scale(y)
            .tickSize(0)
            .orient("left")

        let gy = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        let bars = svg.append("g")

        GDPData.forEach((country) => {
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

        clearInterval(loadGDPBarInterval);
    }
}

function compareValueNumbers(a, b) {
    return b.value - a.value;
}
