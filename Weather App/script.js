// const searchBox=document.querySelector(".searchbar");

// const searchBtn=document.querySelector(".search-button");

// const weatherIcon=document.querySelector(".icon");

// const apiKey = "da862c16182fc71b50d8bccb80bdd208";
// const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=lahore";
// async function checkWeather() {
//     const response = await fetch(apiUrl + `&appid=${apiKey}`);

//     if(response.status===404){
//         const error=document.querySelector(".error").style.displya="block";
//     }
            
// }


const searchBox = document.querySelector(".searchbar input");
const searchBtn = document.querySelector(".search-button");

const weatherIcon = document.querySelector(".main .icon img");
const errorBox = document.querySelector(".error");
const mainBox = document.querySelector(".main");
const footerBox = document.querySelector(".footer");

const tempText = document.querySelector(".temp");
const cityText = document.querySelector(".city");
const humidityText = document.querySelector(".leftbox .percentage");
const windText = document.querySelector(".rightbox .percentage");

const apiKey = "da862c16182fc71b50d8bccb80bdd208";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status === 404) {
            errorBox.style.display = "flex";
            mainBox.style.display = "none";
            footerBox.style.display = "none";
            return;
        }

        const data = await response.json();

        cityText.innerHTML = data.name;
        tempText.innerHTML = Math.round(data.main.temp) + " °c";
        humidityText.innerHTML = data.main.humidity + "%";
        windText.innerHTML = data.wind.speed + " km/h";

        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "clear.png";
                break;
            case "Rain":
                weatherIcon.src = "rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "mist.png";
                break;
            case "Snow":
                weatherIcon.src = "snow.png";
                break;
            default:
                weatherIcon.src = "clear.png";
        }

        errorBox.style.display = "none";
        mainBox.style.display = "flex";
        footerBox.style.display = "flex";

    } catch (error) {
        errorBox.style.display = "flex";
        mainBox.style.display = "none";
        footerBox.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city !== "") {
        checkWeather(city);
    }
});

searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const city = searchBox.value.trim();
        if (city !== "") {
            checkWeather(city);
        }
    }
});

// default city load on page start
checkWeather("Lahore");