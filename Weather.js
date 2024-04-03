window.addEventListener("DOMContentLoaded", function(event) {
    let lat_input = this.document.getElementById("lat-ipt");
    let lon_input = this.document.getElementById("lon-ipt");

    let zip_input = this.document.getElementById("zip-ipt");

    let city_input = this.document.getElementById("city-ipt");
    let state_input = this.document.getElementById("state-ipt");
    let country_input = this.document.getElementById("country-ipt");

    let result_div = this.document.getElementById("weather-report");

    this.document.getElementById("search-btn").addEventListener("click", function(event) {
        result_div.innerHTML = "";

        let lat = lat_input.value;
        let lon = lon_input.value;

        let zip = zip_input.value;

        let city = city_input.value;
        let state = state_input.value;
        let country = country_input.value;

        let addon = ""

        if ((lat != 0) && (lon != 0)) {
            addon = "?lat=" + lat.toString() + "&lon=" + lon.toString();
            let search_info = document.createElement("p").appendChild(document.createTextNode("Latitude: " + lat.toString() + ", Longitude: " + lon.toString()))
            result_div.appendChild(search_info)
            getWeather(addon, result_div);
        } else if (zip != 0) {
            addon = "?zip=" + zip.toString();
            let search_info = document.createElement("p").appendChild(document.createTextNode("Zipcode: " + zip.toString()))
            result_div.appendChild(search_info)
            getWeather(addon, result_div);
        } else if (city != "") {
            addon = "?city=" + city;
            let text = "City: " + city;
            if (state != "") {
                addon += "&state=" + state;
                text += ", State: " + state;
            }
            if (country != "") {
                addon += "&country=" + country;
                text += ", Country: " + country
            }
            let search_info = document.createElement("p").appendChild(document.createTextNode(text))
            result_div.appendChild(search_info)
            getWeather(addon, result_div);
        } else {
            alert("Your inputs are empty.")
        }

        lat_input.value = null
        lon_input.value = null
        zip_input.value = null
        city_input.value = null
        state_input.value = null
        country_input.value = null
    })
});

function getWeather(addOn, div) {
    let api = 'https://api.api-ninjas.com/v1/weather'
    api += addOn;
    fetch(api, {headers: { 'X-Api-Key': 'TPSZ1kZASalgdQLhGtsYMA==XeGxlxCK3wkx8EqS'}}).then(function(res){
        return res.json();
    }).then(function(data){
        console.log(data)
        processData(data, div)
    });
}

function processData(data, div){
    if (data.hasOwnProperty("error")) {
        alert("Invalid Inputs. Try again.")
    } else {
        let temp = data.temp;
        let max_t = data.max_temp;
        let min_t = data.min_temp;
        let feels_like = data.feels_like;
        let humid = data.humidity;
        let wind_d = data.wind_degrees;
        let wind_s = data.wind_speed;
        let cloud_pct = data.cloud_pct;
        let info_li = [temp, max_t, min_t, feels_like, humid, wind_d, wind_s, cloud_pct]
        let text_li = ["Current Temperature:", "Max Temperature:", "Min Temperature:", "Temperature Feels Like:", "Humidity:", "Wind Degree:", "Wind Speed:", "Cloud Percentage:"]
        for (let i = 0; i < info_li.length; i++){
            let info = info_li[i];
            let title = text_li[i];
            let content = document.createElement("p");
            content.appendChild(document.createTextNode(title + " " + info.toString()));
            div.appendChild(content);
        }
    }
}