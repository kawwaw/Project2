d3.select(window).on('load', init);

function init() {
   //Width and height
    var w2 = 500;
    var h2 = 500;
    var padding2 = 30;

    d3.tsv('hands.txt',
        function(error, data) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(data);
            }
            ;


            var svg2 = d3.select('#hand_outline')
                .append('svg')
                .attr("width", w2)
                .attr("height", h2);

            var xmax = d3.max(data, function(d){return d.x;});
            var xmin = d3.min(data, function(d){return d.x;});
            var ymax = d3.max(data, function(d){return d.y;});
            var ymin = d3.min(data, function(d){return d.y;});


            var xScale = d3.scaleTime()
                .domain([ 0, 1.3 ])
                .range([padding2, w2 - padding2]);


            var yScale = d3.scaleLinear()
                .domain([0 , 1.3 ])
                .range([h2 - padding2, padding2])
            ;

            //Define line generator
            lineKW = d3.line()
                .defined(function(d) { return d.id == "id4"; })
                .x(function(d) { return xScale(d.x); })
                .y(function(d) { return yScale(d.y); })
                .curve(d3.curveCatmullRom)
            ;


            //Create line
            svg2.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", lineKW)
                .attr("stroke" , "grey")
                .attr("fill", "none")


        });



}



/*

//   var xmax = d3.max(data, function(d){return d.dates1;});
//    var xmin = d3.min(data, function(d){return d.dates1;});

-----------------------------------------------








            var xAxis = d3.axisBottom()
                .scale(xScale)
                .ticks(5)
            ;

            var yAxis = d3.axisLeft()
                .scale(yScale)
                .ticks(5)
            ;


            circles = svg2.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d){return xScale(d.dates1);})
                .attr("cy", function(d){return yScale(d.value);})
                .attr("r", 1)
                .attr("fill" , "grey")
                .attr("stroke" , "grey")
            ;

            //Create line
            svg2.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", lineKW)
                .attr("stroke" , "grey")
                .attr("fill", "none")

            ;

            //Create X axis
            svg2.append("g")
                .attr("class", "axis")
                .call(xAxis)
                .attr("transform","translate(0," + (h2 - padding2) + ")")
            ;
            //Create Y axis
            svg2.append("g")
                .attr("class", "axis")
                .call(yAxis)
                .attr("transform","translate(" +  padding2 + ",0)")
            ;

        }
    );




    //Dynamic, random dataset
    var datasets = [];											//Initialize empty array
    var numDataPoints = 30;										//Number of dummy data points to create
    var maxRange = Math.random() * 1000;						//Max range of new values
    for (var i = 0; i < numDataPoints; i++) {					//Loop numDataPoints times
        var newNumber1 = Math.floor(Math.random() * maxRange);	//New random integer
        var newNumber2 = Math.floor(Math.random() * maxRange);	//New random integer
        datasets.push([newNumber1, newNumber2]);					//Add new number to array
    }
    //Create scale functions
    var xScales = d3.scaleLinear()
        .domain([0, d3.max(datasets, function (d) {
            return d[0];
        })])
        .range([paddings, ws - paddings * 2]);

    var yScales = d3.scaleLinear()
        .domain([0, d3.max(datasets, function (d) {
            return d[1];
        })])
        .range([hs - paddings, paddings]);

    console.log(datasets);
    console.log(xScales(20));
    console.log(yScales(20));
    console.log(maxRange);

    //Define X axis
    var xAxis = d3.axisBottom()
        .scale(xScales)
        .ticks(5);

    //Define Y axis
    var yAxis = d3.axisLeft()
        .scale(yScales)
        .ticks(5);

    //Create SVG element
    var svgs = d3.select("#scatter")
        .append("svg")
        .attr("width", ws)
        .attr("height", hs);


    // define clipping pad
    svgs.append("clipPath")
        .attr("id", "chart-area")
        .append("rect")
        .attr("x", paddings)
        .attr("y", paddings)
        .attr("width", ws - paddings * 3) // skal være 3, da der allerede er 2*padding til højre
        .attr("height", hs - paddings * 2)

    ;

    //Create circles
    svgs.append("g")
        .attr("id", "gruppe_cirkler")
        .attr("clip-path", "url(#chart-area")
        .selectAll("circle")
        .data(datasets)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScales(d[0]);
        })
        .attr("cy", function (d) {
            return yScales(d[1]);
        })
        .attr("r", 5)
        .attr("fill", "blue");

    svgs.append("circle")  // tjek placering af startpunkter
        .attr("cx", paddings)
        .attr("cy", hs - paddings)
        .attr("r", 7);
    svgs.append("circle")
        .attr("cx", ws - paddings * 2)
        .attr("cy", paddings)
        .attr("r", 7)
        .attr("fill", "orange");
    svgs.append("circle")
        .attr("cx", paddings)
        .attr("cy", paddings)
        .attr("r", 7)
        .attr("fill", "green");

    //Create X axis
    svgs.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (hs - paddings) + ")")
        .call(xAxis);

    //Create Y axis
    svgs.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + paddings + ",0)")
        .call(yAxis);


}  // init-funktion slut



    //On click, update with new data
    d3.select("#tjek")
        .on("click", function() {

            //New values for dataset
            var numValues = datasets.length ;						 		//Count original length of dataset
            var maxRange = Math.random() * 1000;						//Max range of new values
            datasets = [];  						 				 		//Initialize empty array
            for (var i = 0; i < numValues; i++) {				 		//Loop numValues times
                var newNumber1 = Math.floor(Math.random() * maxRange);	//New random integer
                var newNumber2 = Math.floor(Math.random() * maxRange);	//New random integer
                datasets.push([newNumber1, newNumber2]);					//Add new number to array
            }

            console.log("opdatering")

            //Update scale domains
            xScales.domain([0, d3.max(datasets, function(d) { return d[0]; })]);
            yScales.domain([0, d3.max(datasets, function(d) { return d[1]; })]);

            //Update all circles
            svgs.selectAll("circle")
                .data(datasets)
                .transition()
                .duration(2000)
                .on("start", function(){
                    d3.select(this)
                        .attr("fill", "magenta")
                        .attr("r",7)
                })
                .attr("cx", function(d) {
                    return xScales(d[0]);
                })
                .attr("cy", function(d) {
                    return yScales(d[1]);
                })


                        .transition()
                        .duration(1000)
                        .attr("fill", "orange")
                        .attr("r",6)
                        .transition()
                        .delay(function(d,i){
                            return i / datasets.length * 2000
                        })
                        .duration(1000)
                        .attr("fill", "blue")
                        .attr("r",5)


            ;

            //Update X axis
            svgs.select(".x.axis")
                .transition()
                .duration(2000)
                .call(xAxis);

            //Update Y axis
            svgs.select(".y.axis")
                .transition()
                .duration(2000)
                .call(yAxis);
        });

/////////////////////  her starter bar-plot



//Width and height
    var w = 600;
    var h = 300;

    var dataset = [ { key: 0, value: 5 },		//dataset is now an array of objects.
        { key: 1, value: 10 },		//Each object has a 'key' and a 'value'.
        { key: 2, value: 13 },
        { key: 3, value: 19 },
        { key: 4, value: 21 },
        { key: 5, value: 25 },
        { key: 6, value: 22 },
        { key: 7, value: 18 },
        { key: 8, value: 15 },
        { key: 9, value: 13 },
        { key: 10, value: 11 },
        { key: 11, value: 12 },
        { key: 12, value: 15 },
        { key: 13, value: 20 },
        { key: 14, value: 18 },
        { key: 15, value: 17 },
        { key: 16, value: 16 },
        { key: 17, value: 18 },
        { key: 18, value: 23 },
        { key: 19, value: 25 } ];

    //Define key function, to be used when binding data
    var key = function(d) {
        return d.key;
    };

    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([0, w])
        .paddingInner(0.05);


    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset,function(d) { return d.value; })])
        .range([0, h]);



    console.log(dataset)
    console.log(dataset.length)
    console.log(d3.range(dataset.length))

//Create SVG element
    var svg = d3.select("#bar")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("rect")
        .data(dataset,key)
        .enter()
        .append("rect")

        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("y", function(d) {
            return h - yScale(d.value);
        })

        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return yScale(d.value);
        })
        .attr("fill", function(d) {
            return "rgb(0, 0, " + Math.round(d.value * 10) + ")";
        });

    svg.selectAll("text")
        .data(dataset,key)
        .enter()
        .append("text")
        .text(function(d) {
            return d.value;
        })
        .attr("class", "labels")
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth()/2;
        })
        .attr("y", function(d) {
            return h - yScale(d.value) + 14;
        })

    d3.select("#sidste")
        .on("click", function(){
            // something happens here
            alert("Hey, don´t click here")
        });

    var maxValue = 25;


    //On click, tilføj og fjern
    d3.selectAll(".tilogfra")
        .on("click", function(){

            //See which p was clicked
            var paragraphID = d3.select(this).attr("id");
            console.log(paragraphID)

            //Decide what to do next
            if (paragraphID == "fjernBar") {

                dataset.shift();
                console.log(dataset);

            } else {
                var minValue = 2;
                var maxValue2 = 25 - minValue;
                var newNumber = Math.floor(Math.random() * maxValue2) + minValue;
                var lastKeyValue = dataset[dataset.length - 1].key;
                dataset.push({
                    key: lastKeyValue + 1,
                    value: newNumber
                });
                console.log(dataset);
                console.log("indsætter ny bar");
            }


            xScale.domain(d3.range(dataset.length));

            var bars = svg.selectAll("rect")
                    .data(dataset, key);

            var labels = svg.selectAll("text")
                .data(dataset, key);

            bars.exit()
                .transition()
                .duration(1000)
                .attr("x",0)
                .remove();

            labels.exit()
                .transition()
                .duration(1000)
                .attr("x",0)
                .remove();

            bars.enter()
                .append("rect")
                .attr("x", w)
                .attr("y",function(d){
                    return h - yScale(d.value);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d){
                    return yScale(d.value);
                })
                .attr("fill", "grey")
                .merge(bars)
                .transition()
                .duration(1000)
                .attr("x", function(d,i){
                    return xScale(i);
                })
                .attr("y",function(d){
                    return h - yScale(d.value);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d){
                    return yScale(d.value);
                })
                ;

            //Update all labels
            labels.enter()
                .append("text")
                .attr("class", "labels")
                .text(function(d) {
                    return d.value;
                })
                .attr("x", w)
                .attr("y", function(d) {
                    if (yScale(d.value) < h/10){return h - yScale(d.value) - 8}
                    else {return h - yScale(d.value) + 14}
                    ;
                })
                .style("fill", function(d) {
                    if (yScale(d.value) < h/10){ return "red"};
                })
                .merge(labels)
                .transition()
                // .delay(function(d,i){return i / dataset.length * 2000})
                .duration(1200)
                .attr("x", function(d, i) {
                    return xScale(i) + xScale.bandwidth() / 2;
                })
                .attr("y", function(d) {
                    if (yScale(d.value) < h/10){return h - yScale(d.value) - 8}
                    else {return h - yScale(d.value) + 14}
                    ;
                })
                .style("fill", function(d) {
                    if (yScale(d.value) < h/10){ return "red"};
                })
            ;
        });

//-----------------  denne del er ikke opdateret endnu
    //On click, update with new data-values
    d3.select("#bar-klik")
        .on("click", function() {

            //New values for dataset
            var numValues = dataset.length;						//Count original length of dataset
            //dataset = [];  						 				//Initialize empty array
            for (var i = 0; i < numValues; i++) {				//Loop numValues times
                var newNumber = Math.floor(Math.random() * 25); //New random integer (0-24)
                dataset[i].value = newNumber;						//Add new number to array
            }

            d3.select("#button1")
                .on("click", function(d, i) {
                    data[4].value += 0.5;
                    update(g, x, y, data);

            var yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset)])
                .range([0, h]);


            //Update all rects
            svg.selectAll("rect")
                .data(dataset)
                .transition()
                .delay(function(d,i){
                    return i / dataset.length * 2000
                })
                .duration(2000)
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("height", function(d) {
                    return yScale(d);
                })
            .attr("fill", function(d) {
                    return "rgb(0, 0, " + Math.round(d * 10) + ")";
                });

            //Update all labels
            svg.selectAll("text")
                .data(dataset)
                .transition()
                .delay(function(d,i){
                    return i / dataset.length * 2000
                })
                .duration(2000)
                .text(function(d) {
                    return d;
                })
                .attr("x", function(d, i) {
                    return xScale(i) + xScale.bandwidth() / 2;
                })
                .attr("y", function(d) {
                    if (yScale(d) < h/10){return h - yScale(d) - 8}
                    else {return h - yScale(d) + 14}
                    ;
                })
                .style("fill", function(d) {
                    if (yScale(d) < h/10){ return "red"};
                })
            ;
        });


})
*/