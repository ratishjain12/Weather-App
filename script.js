cityField = document.querySelector(".input-field");
getLocation = document.querySelector(".current-loc");
infoText = document.querySelector(".info-text-sect");
weatherCard = document.querySelector(".weather-card");
weatherDetails = document.querySelector(".weather-details");
weatherLogo = document.querySelector(".weather-logo");
temp = weatherDetails.querySelector(".weather");
sep = document.querySelector(".separator");
back = document.querySelector(".back-arrow");
cityName = weatherDetails.querySelector(".city-head");
desc = weatherDetails.querySelector(".desc");

cityField.addEventListener('keyup', (e) => {
    if (e.key == "Enter" && e.currentTarget.value != "") {
        apifetch(e.currentTarget.value);
    }
});

getLocation.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser not support geolocation api");
    }
});

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    console.log(latitude);
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=9d10b55946f2afc10aefed17f8dbaea7`;
    fetchData(api);
}

function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.add("info-text-error");
}

function apifetch(city) {

    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9d10b55946f2afc10aefed17f8dbaea7`;
    fetchData(api);
}


function fetchData(api) {
    infoText.classList.remove("info-text-error");
    infoText.classList.add("info-text");
    infoText.innerText = "Fetching weather data..."
    fetch(api).then(res => res.json()).then(result => showData(result));

}

function showData(data) {
    if (data.cod == 404) {
        infoText.classList.remove("info-text");
        infoText.classList.add("info-text-error");
        infoText.innerText = data.message;

        return;
    }
    infoText.classList.remove("info-text-error");
    infoText.classList.remove("info-text");

    cityField.classList.add("input-field-del");
    back.classList.add("back-arrow-active");
    getLocation.classList.add("current-loc-del");
    sep.classList.add("separator-del")
    weatherCard.classList.add("weather-card-active");
    weatherDetails.classList.add("weather-details-active");
    console.log(data);

    const { id, description } = data.weather[0];
    desc.innerText = description;
    cityName.innerText = data.name;
    if (id == 800) {
        weatherLogo.src = "icons/clear.svg";
    } else if (id >= 200 && id <= 232) {
        weatherLogo.src = "icons/storm.svg";
    } else if (id >= 600 && id <= 622) {
        weatherLogo.src = "icons/snow.svg";
    } else if (id >= 701 && id <= 781) {
        weatherLogo.src = "icons/haze.svg";
    } else if (id >= 801 && id <= 804) {
        weatherLogo.src = "icons/cloud.svg";
    } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
        weatherLogo.src = "icons/rain.svg";
    }

    temp.innerText = `${Math.round(data.main.temp)}` + '\u00B0' + 'C';


}




back.addEventListener("click", () => {
    cityField.classList.remove("input-field-del");
    back.classList.remove("back-arrow-active");
    getLocation.classList.remove("current-loc-del");
    sep.classList.remove("separator-del")
    weatherCard.classList.remove("weather-card-active");
    weatherDetails.classList.remove("weather-details-active");
    cityField.value = "";
});