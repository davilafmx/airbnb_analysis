 // Pull data from Airbnb JSON
const AirbnbJSON = "static/data/listings_KP_Clean_R.json";

// Add a Leaflet tile layer
let streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create a Leaflet map object
let myMap = L.map("map", {
    center: [21.887, -159.46075
    ], // Kauai
    zoom: 14,
    layers: [streets]
});

// Add the tile layer to the map
streets.addTo(myMap);

// // Perform a GET request to query the d3.json(Airbnb)
d3.json(AirbnbJSON).then(({property_type, latitude, longitude, price, review_scores_rating, accommodates, beds, bathrooms_text, listing_url }) => {
// d3.json(AirbnbJSON).then(data => {

    
    let property_ = Object.values(property_type);
    let accommodates_ = Object.values(accommodates);
    let beds_ = Object.values(beds);
    let baths_ = Object.values(bathrooms_text);
    let price_ = Object.values(price);
    let lat = Object.values(latitude);
    let lon = Object.values(longitude);
    let rating = Object.values(review_scores_rating);
    let listing = Object.values(listing_url);


    rating.forEach((score,i) => {

        console.log(parseFloat(price_[i].slice(1)));
        
        L.circleMarker([lat[i],lon[i]], {
            radius: rating[i],
            fillOpacity: .5,
            color: 'grey',
            weight: 0.5,
            fillColor: 
                parseFloat(price_[i].slice(1)) > 5000 ? "green" :
                parseFloat(price_[i].slice(1)) > 2500 ? "blue" :
                parseFloat(price_[i].slice(1)) > 1000 ? "purple" :
                parseFloat(price_[i].slice(1)) > 500 ? "red" :
                parseFloat(price_[i].slice(1)) > 250 ? "magenta" :
                parseFloat(price_[i].slice(1)) > 0 ? "yellow" : 'orange'
        

            }).bindPopup(L.popup({ maxWidth: 500 })
            .setContent(`<div style="font-size: 20px;"><strong>${property_[i]} property</strong></br></div>
                        <div style="font-size: 18px;">Price per night: ${price_[i]}</div>
                        <div style="font-size: 18px;">Accommodates: ${accommodates_[i]}</div>
                        <div style="font-size: 18px;">Beds: ${beds_[i]} beds</div>  
                        <div style="font-size: 18px;">Baths: ${baths_[i]}</div> 
                        <div style="font-size: 18px;">Rating: ${rating[i]}</div>
                        <div style="font-size: 18px;"><a href="${listing[i]}" target="_blank">More details about: ${listing[i]}</a></div>`
                         )).addTo(myMap);
        //});

    });


});

// Create a function for the marker size
function markerSize(rating) {
    return rating * 1000;
} 
  
    //Set up the Create Features function
    function createFeatures(AirbnbData) { 

    }


    //Point to layer used to alter markers
//     pointToLayer: function(feature, latlng) {

   
    // // Send our Airbnb layer to the createMap function/
    // createMap(Airbnb);
    

  //Set up createMap function to add the layers to the map
  function createMap(Airbnb) {

    // Create the base layers.
    // let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // })
  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object.
    let baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    let overlayMaps = {
      Airbnb: Airbnb
    };
  
    streetMap.addTo(myMap);


//Add Legend

// Create a legend
let legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend');
    let labels = [];

    // Add legend title
    div.innerHTML += '<h4>Price Legend</h4>';

    // Create labels with color and range information
    let categories = [0, 250, 500, 1000, 2500, 5000];
    let colors = ['orange', 'yellow', 'red', 'magenta', 'purple', 'blue', 'green'];

    for (let i = 0; i < categories.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            (categories[i] ? `$${categories[i - 1] + 1}-${categories[i]}` : `>$${categories[i]}`);
        labels.push(
            `<i style="background:${colors[i]}"></i> ${
                categories[i] ? `$${categories[i - 1] + 1}-${categories[i]}` : `>$${categories[i]}`
            }`
        );
    }
    div.innerHTML = labels.join('<br>');

    return div;
};

// Add the legend to the map
legend.addTo(myMap);



// Loop through the intervals to generate labels for legend


  //Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}

