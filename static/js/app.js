// Defining url that contains the data we'll be working on
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// Initializing the page with a default look
function init() {

    // Fetchich the JSON data
    d3.json(url).then(function(data) {
        console.log(data);

        // Extracting the first item from the 'samples' array
        let bbb_data = data.samples[0];
        console.log(bbb_data);

        // Creating initial Bar Chart
        let trace1 = {
            x: bbb_data.sample_values.slice(0, 10),
            y: bbb_data.otu_ids.slice(0, 10).map(id => `OTU ${id}`),
            text: bbb_data.otu_labels.slice(0, 10),
            name: "Sample 940",
            type: "bar",
            orientation: "h"
        };
        
        let tracedData1 = [trace1];
        
        // Creating layout for the Bar Chart
        let layout1 = {
            title: "Top 10 OTUs for Sample 940"
        };
      
        // Plotting the chart
        Plotly.newPlot("plot", tracedData1, layout1);

        // --------------------------------
        // Creating initial Bubble Chart
        let trace2 = {
            x: bbb_data.otu_ids,
            y: bbb_data.sample_values,
            text: bbb_data.otu_labels,
            mode: 'markers',
            marker: {color: bbb_data.otu_ids , 
                size: bbb_data.sample_values,
                colorscale: 'Earth'}
          };
        
        let tracedData2 = [trace2];
        
        // Creating layout for the Bubble Chart
        let layout2 = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 1000
          };
        
        // Plotting the chart
        Plotly.newPlot('myDiv', tracedData2, layout2);

        // --------------------------------
        // Creating initial Metadata
        // Extracting the first item from the 'metadata' array
        let bbb_metadata = data.metadata[0];

        // Getting a reference to the #sample-metadata element on the page
        let metadata = d3.select("#sample-metadata");

        // Appending the intitial information about id, ethnicity, gender, age, location, bbtype 
        // and wfreq to Demografic Info table on the page
        metadata.append("p").text(`id: ${bbb_metadata.id}`);
        metadata.append("p").text(`ethnicity: ${bbb_metadata.ethnicity}`);
        metadata.append("p").text(`gender: ${bbb_metadata.gender}`);
        metadata.append("p").text(`age: ${bbb_metadata.age}`);
        metadata.append("p").text(`location: ${bbb_metadata.location}`);
        metadata.append("p").text(`bbtype: ${bbb_metadata.bbtype}`);
        metadata.append("p").text(`wfreq: ${bbb_metadata.wfreq}`);

        // --------------------------------
        // Populating the dropdown menu with sample IDs from the data.  
        const dropdown = d3.select("#selDataset");
        for (let i = 0; i < data.samples.length; i++) {
            dropdown.append("option").text(data.samples[i].id).attr("value", data.samples[i].id);
        }
        // Calling getData function when the change takes place to the DOM 
        d3.selectAll("#selDataset").on("change", getData);     
        
        // // This function updates the visualizations based on the selected sample ID 
        // from the dropdown menu
        function getData() {
        // Using D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        let selectedID = dropdownMenu.property("value");

        // Creating getSample function matching the sample's id with the selectedID        
        function getSample(sample) {
        return sample.id === selectedID;    
        }
        
        // Using the filter method to find the sample in the data.samples array that matches the selectedID
        let selectedSample = data.samples.filter(getSample)[0];
   
        // --------------------------------
        // Creating Bar Chart based on selected 'id' number
        let trace1 = {
            x: selectedSample.sample_values.slice(0, 10),
            y: selectedSample.otu_ids.slice(0, 10).map(id => `OTU ${id}`),
            text: selectedSample.otu_labels.slice(0, 10),
            name: `Sample ${selectedID}`,
            type: "bar",
            orientation: "h"
        };
 
        let tracedData = [trace1];

        // Creating layout for the Bar Chart
        let layout = {
            title: `Top 10 OTUs for Sample ${selectedID}`
        };
        // Plotting the chart
        Plotly.react("plot", tracedData, layout);


        // --------------------------------
        // Creating Bubble Chart based on selected 'id' number
        let trace2 = {
            x: selectedSample.otu_ids,
            y: selectedSample.sample_values,
            text: selectedSample.otu_labels,
            mode: 'markers',
            marker: {color: selectedSample.otu_ids , 
                size: selectedSample.sample_values,
                colorscale: 'Earth'}
          };
         
        
        let tracedData2 = [trace2];
        
        // Creating layout for the Bubble Chart
        let layout2 = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 1000
          };
          
        // Plotting the chart
        Plotly.react('myDiv', tracedData2, layout2);

        // Filtering the metadata array to find the entry that matches the selectedID
        // and converting the sample.id to a string    
        let selectedSample2 = data.metadata.filter(sample => sample.id.toString() === selectedID)[0];
        
        // Selecting the HTML element with the ID "sample-metadata" to display the metadata information
        let metadata = d3.select("#sample-metadata");
        
        // Clearing any existing metadata in the display
        metadata.html("");
        
        // Appending information about id, ethnicity, gender, age, location, bbtype 
        // and wfreq to Demografic Info table on the page
        metadata.append("p").text(`id: ${selectedSample2.id}`);
        metadata.append("p").text(`ethnicity: ${selectedSample2.ethnicity}`);
        metadata.append("p").text(`gender: ${selectedSample2.gender}`);
        metadata.append("p").text(`age: ${selectedSample2.age}`);
        metadata.append("p").text(`location: ${selectedSample2.location}`);
        metadata.append("p").text(`bbtype: ${selectedSample2.bbtype}`);
        metadata.append("p").text(`wfreq: ${selectedSample2.wfreq}`);
    
}

    });
}    

init();   