// Pull data from Airbnb JSON
const AirbnbJSON = "static/data/listings_KP_Clean_R.json";

// Add a Leaflet tile layer
let streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create a Leaflet map object
let myMap = L.map("map", {
    center: [21.887, -159.46075], // Kauai
    zoom: 14,
    layers: [streets]
});

// Add the tile layer to the map
streets.addTo(myMap);

// // Perform a GET request to query the d3.json(Airbnb)
d3.json(AirbnbJSON).then(({ property_type, latitude, longitude, price, review_scores_rating, accommodates, beds, bathrooms_text, listing_url }) => {
    let property_ = Object.values(property_type);
    let accommodates_ = Object.values(accommodates);
    let beds_ = Object.values(beds);
    let baths_ = Object.values(bathrooms_text);
    let price_ = Object.values(price);
    let lat = Object.values(latitude);
    let lon = Object.values(longitude);
    let rating = Object.values(review_scores_rating);
    let listing = Object.values(listing_url);

    rating.forEach((score, i) => {
        console.log(parseFloat(price_[i].slice(1)));

        L.circleMarker([lat[i], lon[i]], {
            radius: rating[i],
            fillOpacity: .5,
            color: 'grey',
            weight: 0.5,
            fillColor: parseFloat(price_[i].slice(1)) > 5000 ? "green" :
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
    });

    // Call createMap function after adding Airbnb data to the map
    createMap(myMap);
});

// Set up createMap function to add the layers to the map
function createMap(Airbnb) {
    // Create the base layers.
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // Create a baseMaps object.
    let baseMaps = {
        "Street Map": streets,
        "Topographic Map": topo
    };

    // Create an overlay object to hold our overlay.
    let overlayMaps = {
        // Airbnb: Airbnb // Uncomment this if you want Airbnb to be an overlay
    };

    // Add Legend
    // Create a legend
    let legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
        var div = L.DomUtil.create("div", "info legend");
        div.innerHTML += "<h4><strong>AirBNB price Range</h4></strong>";
        div.innerHTML += '<i style="background-color: #FFFF00"></i><span>$0 - $249</span><br>'; // yellow
        div.innerHTML += '<i style="background-color: #FF0000"></i><span>$250 - $499</span><br>'; // red
        div.innerHTML += '<i style="background-color: #FF00FF"></i><span>$500 - $999</span><br>'; // magenta
        div.innerHTML += '<i style="background-color: #800080"></i><span>$1,000 - $2,499</span><br>'; // purple
        div.innerHTML += '<i style="background-color: #0000FF"></i><span>$2,500 - $4,999</span><br>'; // blue
        div.innerHTML += '<i style="background-color: #008000"></i><span>$5,000+</span><br>'; // green
        return div;
    };
    legend.addTo(Airbnb); // Add the legend to the Airbnb map object


    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(Airbnb);
}