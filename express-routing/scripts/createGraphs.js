var plotly = require('plotly')('<your plotly username>', '<your plotly token>');
var fs = require('fs');
var path = require('path');

function createVelocityCharts() {
    var text = JSON.parse(fs.readFileSync("public/assets/data.txt").toString('utf-8'));

    text.forEach((element) => {
        if (element[0] !== "Responsive POD") {
            createVelocityGraph(element);
        }
    });
}

function createVelocityGraph(element) {
    let labels = ["TOTAL", "EXPECTED", "ACHIEVED"];
    let values = [element[1], element[2], element[3]];
    let trace1 = {
        x: labels,
        y: values,
        text: values,
        textposition: 'outside',
        cliponaxis:false,
        textfont:{
            family:"sans serif",
            size:24,
            color:"red"
        },
        name: element[0],
        marker: {
            color: ['rgba(50,43,226,0.8)', 'rgba(226,214,13,0.8)', 'rgba(222,45,38,0.8)']
        },
        type: "bar"
    };
    var figure = {
        'data': [trace1],
    };

    var imgOpts = {
        format: 'png',
        width: 500,
        height: 500,
        xaxis:{
            layer:'below traces'
        },
        yaxis:{
            layer:'below traces'
        },
    };
    plotly.getImage(figure, imgOpts, function (error, imageStream) {
        if (error)
            return console.log(error);
        var filePath = path.join('public/assets/velocitygraphs', element[0] + '.png');
        var fileStream = fs.createWriteStream(filePath);
        console.log(filePath);
        imageStream.pipe(fileStream);
    });
}

// exports the variables and functions above so that other modules can use them
module.exports.createVelocityCharts = createVelocityCharts;