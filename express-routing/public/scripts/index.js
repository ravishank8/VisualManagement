var trace1 = {
    x: ['giraffes', 'orangutans', 'monkeys'], 
    y: [20, 14, 23], 
    name: 'SF Zoo', 
    type: 'bar'
  };
  
  var trace2 = {
    x: ['giraffes', 'orangutans', 'monkeys'], 
    y: [12, 18, 29], 
    name: 'LA Zoo', 
    type: 'bar'
  };
  
  var data = [trace1, trace2];
  var layout = {barmode: 'group'};
  
  Plotly.newPlot('myDiv1', data, layout, {}, {showSendToCloud:true});
  Plotly.newPlot('myDiv2', data, layout, {}, {showSendToCloud:true});
  Plotly.newPlot('myDiv3', data, layout, {}, {showSendToCloud:true});
  Plotly.newPlot('myDiv4', data, layout, {}, {showSendToCloud:true});
  Plotly.newPlot('myDiv5', data, layout, {}, {showSendToCloud:true});
  Plotly.newPlot('myDiv6', data, layout, {}, {showSendToCloud:true});