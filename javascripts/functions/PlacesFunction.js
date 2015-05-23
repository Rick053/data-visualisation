function drawPlaces(dataset, map) {

    // get any existing circles
    var places = map.selectAll("circle").data(dataset)
    
    var radius = d3.scale.linear()
        .range(range(2, 10))
        .domain([0, 1000000]);

    var colourScale = d3.scale.linear()
        .range([0, 1])
        .domain([0, 1000000]);

    var fillOpacity = d3.scale.linear()
        .range([0, .75])
        .domain([0, 5000]);
                    
    var colourInterpolator = d3.interpolateHsl("#49BCEF", "#1E6787");
                   //colours can be specified as any CSS colour string

    places.enter()
        .append("circle")
        .attr("cx", function(d) {
            return xy(d.geometry.coordinates)[0]
        })
        .attr("cy", function(d) {
            return xy(d.geometry.coordinates)[1]
        })
        .attr("r", function(d) {
            return 0;
        })
        .style("fill", function(d) {
            return colourInterpolator(colourScale(Math.abs(d.properties.population)));
        })
        .style("fill-opacity", 0)
        // .style("stroke", "blue")
        // .style("stroke-width", "0.5px")
        // .style("stroke-opacity", 1)
        .transition()
        .delay(function(d, i) {
            return i / dataset.length * 1000;
        })
        .duration(1000)
        .attr("r", function(d) {
            return radius(Math.abs(d.properties.population));
        })
        .style("fill-opacity", function(d) {
            return fillOpacity(Math.abs(d.properties.population));
        });

    // remove circles for old earthquakes no longer in data
    places.exit()
        .transition()
        .attr("r", 0)
        .style("fill-opacity", 0)
        .remove();
}