
d3.select(window).on('load', init);

function init() {

    var w = 350; // vidde
    var h = 200;  // højde

    var datasetAa;

    var rowConverter = function(d){
        return {
            YEAR: parseFloat(d.YEAR),
            JAN: parseFloat(d.JAN)};
    };

    // noinspection JSAnnotator
    d3.csv(
        'stationAalborg.csv',rowConverter,

//        function(d) { // denne funktion kan modificere inputdata fra csv-filen - skal ikke bruges nu
//            d.frequency *= 100.0;
        //          return d;
        //      },

        function(error, data) {
            if (error) {console.log(error);}
            else {console.log(data);}
            ;

            datasetAa = data  // hvordan bliver dett til en global variabel der lever udenfor funktionen også?

            var svg1 = d3.select('body')
                .append('svg')
                .attr("width", w)
                .attr("height", h);

            var padding = 20;

            var xmax = d3.max(data, function(d){return d.YEAR;});
            var xmin = d3.min(data, function(d){return d.YEAR;});

            var ymax = d3.max(data, function(d){return d.JAN;});
            var ymin = d3.min(data, function(d){return d.JAN;});

            var xScale = d3.scaleLinear()
                .domain([ xmin,xmax ])
                .range([padding, w - padding]);

            var yScale = d3.scaleLinear()
                .domain([ymin, ymax ])
                .range([h - padding, padding]);

            var xAxis = d3.axisBottom()  // hvorfor sætter man ikke scale og ticks-argumenterne ind i parantesen, som slet ikke bliver brugt?
                .scale(xScale)
                .ticks(5)
            ;

            var yAxis = d3.axisLeft()
                .scale(yScale)
                .ticks(5)
            ;



            svg1.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d){return xScale(d.YEAR);})
                .attr("cy", function(d){return yScale(d.JAN);})
                .attr("r", 4)
            ;


            //Create X axis
            svg1.append("g")
                .attr("class", "axis")
                .call(xAxis)
                .attr("transform","translate(0," + (h - padding) + ")") // er der en paste-funktion gemt?
            ;
            //Create Y axis
            svg1.append("g")
                .attr("class", "axis")
                .call(yAxis)
                .attr("transform","translate(" +  padding + ",0)") // er der en paste-funktion gemt?
            ;

            d3.select('body')
                .append('ul')
                .selectAll('li')
                .data(data)
                .enter()
                .append('li')
                .text(function(d){
                    return d.YEAR;
                });


            console.log("test");
            console.log(+svg1.node().getBoundingClientRect().width);
            console.log(+svg1.node().getBoundingClientRect().height);

            console.log(xScale(2000));
            console.log(xAxis);
        }
    );



}

// hvad er forskellen på functions og .et_eller_andet?
// Hvor mange argumenter er der i d3.csv-funktionen? 1 datasti og en funktion eller kan der være flere funktioner efter hinanden
// Hvornår bruges komma semicolon paranteser og tuborgklammer?
// og så lige en repetition i hvad det er punktummer betyder - eks  d3.select .selectAll('li') console.log
// hvilken del ef koden er d3 og hvilken er javascript?
//Hvordan kan jeg se mine veldefinerede variabler i contollen eller i inspektionsvinduet?

// denne virker
/*



function init() {
    // noinspection JSAnnotator
    d3.csv(
        'stationAalborg.csv',

//        function(d) { // denne funktion kan modificere inputdata fra csv-filen - skal ikke bruges nu
//            d.frequency *= 100.0;
 //          return d;
  //      },

function(error, data) {
    if (error) throw error;

    d3.select('body')
        .append('ul')
        .selectAll('li')
        .data(data)
        .enter()
        .append('li')
        .text(function(d){
            return d.YEAR;
        });

});

var scale = d3.scaleLinear()
    .domain([0,10])
    .range([0,100]);

console.log(scale(3.5));
}

*/