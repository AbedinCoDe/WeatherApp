navigator.geolocation.getCurrentPosition(
    (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchGeoLocation(latitude, longitude);
    },(error) => {
        console.error("Error Geting Location", error)
    }
);

async function fetchGeoLocation(lat, lon){
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    const res = await fetch(url);
    const data = await res.json();
    fetchWeatherData(data.address.city)

}


weatherDetails()


async function fetchWeatherData(city) {
    let getCityInput = document.querySelector('.cityInput');
    let noCityFound = document.querySelector(".NoCityFound");

    let getCityName = getCityInput?.value.trim().toLowerCase();
    
    let toSearchCity = getCityName || city;

    if(!toSearchCity){
        console.log("No City Found");
        return;
    }

    
    let Url = `https://api.openweathermap.org/data/2.5/weather?q=${toSearchCity}&appid={Your Token Here}&units=metric`
    
    
    let res = await fetch(Url);

    if(res.status == 404){
        noCityFound.innerText = "No City Found";
    }

    let data = await res.json();

    weatherDetails(data);
}


function weatherDetails(data) {
    let getWeatherDetailsContainer = document.querySelector('.weatherDetails');

    
    let innerHtml = "";

    innerHtml += `
        <img src="${conditionalWeather(data)}" alt="" class="weather_icon">
        <p class="weatherCondition">${data.weather[0].main}</p>
            <h1 class="temp">${Math.round(data.main.temp)}°C</h1>
            <h2 class="city">${data.name}</h2>
            <div class="details">
                <div class="col">
                    <img src="images/humidity.png" alt="">
                    <div>
                        <p class="humidity">${data.main.humidity}%</p>
                        <p class="">Humidity</p>
                    </div>
                </div>
                <div class="col">
                    <img src="images/wind.png" alt="">
                    <div>
                        <p class="wind">${data.wind.speed} Km/h</p>
                        <p class="">Wind Speed</p>
                    </div>
                </div>
            </div>
    `
    getWeatherDetailsContainer.innerHTML = innerHtml;

}


function conditionalWeather(data){
    if(data.weather[0].main == "Clouds"){
        return "images/clouds.png"
    }else if(data.weather[0].main == "Clear"){
        return "images/clear.png"
    }else if(data.weather[0].main ==  "Rain"){
        return "images/heavy-rain.png"
    }else if(data.weather[0].main ==  "Drizzle"){
        return "images/drizzle.png"
    }else if(data.weather[0].main ==  "Mist"){
        return "images/mist.png"
    }else{
        return "images/clear.png"
    }
}


