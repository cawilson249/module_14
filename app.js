// function to populates metadata
function demoInfo(sample)
{
    console.log(sample);

    // use d3.json in order the get data
    d3.json("samples.json").then((data) => {
        // grab metadata
        let metaData = data.metadata;
        // console.log(metaData);
        
        // filter based on values of sample
        let result = metaData.filter(sampleResult => sampleResult.id == sample);
        // console.log(result);

        // access index 0 from the array
        let resultData = result[0];
        console.log(resultData);

        // clear the meta data
        d3.select("#sample-metadata").html("");

        //use Object.entry
        Object.entries(resultData).forEach(([key, value]) => {
            // add to the sample data / demographic section
            d3.select("#sample-metadata")
            .append("h5").text(`${key}: ${value}`);

        });
    });
}
// function to builds graphics
function buildBarChart(sample)
{
   // console.log(sample)
   // let data = d3.json("samples.json");
   // console.log(data);

    d3.json("samples.json").then((data) => {
        // grab all samples
        let sampleData = data.samples;
        console.log(sampleData);

        
        // filter based on values of sample
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);

        // access index 0 from the array
        let resultData = result[0];
        

        // get the out_ids, labels and sample_values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
        

        // build the bar chart
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0, 10);
        let textLabels = otu_labels.slice(0, 10);

        let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: textLabels,
            type: "bar",
            orientation: "h"
        }

        let layout = {
            title: "Top 10 Belly Button Bacteria"
        };
        Ploty.newPlot("bar", [barChart], layout);
    });
}

// function that builds bubble chart
function buildBubbleChart(sample)
{
     // console.log(sample)
   // let data = d3.json("samples.json");
   // console.log(data);

   d3.json("samples.json").then((data) => {
    // grab all samples
    let sampleData = data.samples;
    console.log(sampleData);

    
    // filter based on values of sample
    let result = sampleData.filter(sampleResult => sampleResult.id == sample);

    // access index 0 from the array
    let resultData = result[0];
    

    // get the out_ids, labels and sample_values
    let otu_ids = resultData.otu_ids;
    let otu_labels = resultData.otu_labels;
    let sample_values = resultData.sample_values;
    

    // build the bubble chart

    let bubbleChart = {
        y: sample_values,
        x: otu_ids,
        text: otu_values,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
        }
    };

    let layout = {
        title: "Bacteria Cultures Per Sample",
        hovermode: "closest",
        xaxis: {title: "OTU ID"}
    };
    Ploty.newPlot("bubble", [barChart], layout);
});
};



        
// function to initializes dashboard
function initialize()
{   
    //let date = d3.json("samples.json");
    //console.log(data);

    // access the dropdown selector from the index.html file
    var select = d3.select("#selDataset");

    // use d3.json in order the get data
    d3.json("samples.json").then((data) => {
        let samepleNames = data.names; // make an array of just names
        //console.log(samepleNames);

        // for each statement to create options for each sample
        // selector
        samepleNames.forEach((sample) => {
            select.append("option")
            .text(sample)
            .property("value", sample);
        });

        // when initialized, pass in information for the first sample
        let first = samepleNames[0];

        // call function the build metadata
        demoInfo(sample1);
        // call function to build the bar chart
        buildBarChart(sample1)
        // call bubble chart
        buildBubbleChart(sample1)

    });

}

// function to updates dahboard
function optionChange(item)
{
    // call the update to metadata
    demoInfo(item);
    // call function to build the bar chart
    buildBarChart(item);
    // call function to buld bubble chart
    buildBubbleChart(item)

}

// call the initialize function
initialize();