var google_chart_data  = [
    ['Country', 'Confirmed', 'Deaths'],
]

var total_confirmed = 0
var total_death = 0
var total_active = 0
var total_recovered = 0

fetch("https://corona.lmao.ninja/countries")
    .then(response => response.json())
    .then(function(data)
    {
        console.log(data)
        data.sort((a, b) => parseInt(a.cases) < parseInt(b.cases) ? 1 : -1);

        for (let country in data)
        {
            if (data[country]['country'] == 'USA')
                google_chart_data.push([ 'US', data[country]['cases'], data[country]['deaths'] ])
            else if (data[country]['country'] == 'UK')
                google_chart_data.push([ 'United Kingdom', data[country]['cases'], data[country]['deaths'] ])
            else if (data[country]['country'] == 'S. Korea')
                google_chart_data.push([ 'South Korea', data[country]['cases'], data[country]['deaths'] ])
            else if (data[country]['country'] == 'UAE')
                google_chart_data.push([ 'United Arab Emirates', data[country]['cases'], data[country]['deaths'] ])
            else
                google_chart_data.push([ data[country]['country'], data[country]['cases'], data[country]['deaths'] ])

            total_confirmed += data[country]['cases']
            total_death += data[country]['deaths']
            total_active += data[country]['active']
            total_recovered += data[country]['recovered']
        }

        document.getElementById('box_total_confirmed').innerHTML = total_confirmed
        document.getElementById('box_total_death').innerHTML = total_death
        document.getElementById('box_total_active').innerHTML = total_active
        document.getElementById('box_total_recovered').innerHTML = total_recovered

        google.charts.setOnLoadCallback(drawRegionsMap);
    })



    google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);
    
      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable(google_chart_data);
    
        var options = {colorAxis: {colors: ['#6aebf6', '#f32121']},
        backgroundColor: 'transparent',
        datalessRegionColor: '#777',
        defaultColor: '#f5f5f5',
        tooltip: {isHtml: true}};
    
        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    
        chart.draw(data, options);
      }