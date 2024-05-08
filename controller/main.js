import { CurrentWeather } from "../models/CurrentWeather.js";
import { DayForecast } from "../models/DayForecast.js";

let place = "Hanoi";
let weatherData;
let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const fetchData = async () => {
    try {
        const res = await axios({
            url: `http://api.weatherapi.com/v1/forecast.json?key=5053195c22f04f99a2335127232712&q=${place}&days=7`,
            method: "GET"
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const defaultInterface = () => {
    fetchData().then((data) => {
        weatherData = data;
        getCurrentWeather();
        getForeCast();
    })
}

let handleTime = (datetime) => {
    return datetime.substr(11, 5);
}

let handleDate = (datetime) => {
    return datetime.substr(0, 10).replaceAll("-", "/");
}

const getCurrentWeather = () => {
    let placeNode = document.getElementById("placeShown");
    let timeNode = document.getElementById("timeShown");
    let dateNode = document.getElementById("dateShown");
    let tempNode = document.getElementById("tempShown");
    let rainNode = document.getElementById("rainShown");
    let humidityNode = document.getElementById("humidityShown");
    let windNode = document.getElementById("windShown");

    placeNode.innerText = weatherData.location.name;
    tempNode.innerText = weatherData.current.temp_c;
    dateNode.innerText = handleDate(weatherData.current.last_updated);
    timeNode.innerText = handleTime(weatherData.current.last_updated);
    humidityNode.innerText = weatherData.current.humidity;
    windNode.innerText = weatherData.current.wind_kph;
    rainNode.innerText = weatherData.current.cloud;
}

const getPlace = () => {
    let getInputNode = document.getElementById("place");

    getInputNode.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            place = getInputNode.value;
            fetchData().then((data) => {
                weatherData = data;
                getCurrentWeather();
                getForeCast();
            }).catch((error) => {
                openAlert();
            })
            document.getElementById("place").value = "";
        }
    })

}

const getForeCast = () => {
    let rightSideNode = document.getElementById("rightSideDisplay");
    let htmlContent = "";
    
    htmlContent += weatherData.forecast.forecastday.reduce((content, item) => {
        let d = new Date(item.date);
        let day = d.getDay();
        return content += `
            <div class="rightSide-group">
                <p class="rightSide-group__title">
                    ${weekday[day].substr(0, 3)} - ${handleDate(item.date)}
                </p>
                <div class="rightSide-group-content">
                    <p class="rightSide-group__temp">
                        ${item.day.mintemp_c} °C - ${item.day.maxtemp_c} °C
                    </p>
                    <p class="rightSide-group__icon">
                        <img src="${item.day.condition.icon}" class="rightSide-group__icon-img">
                        </img>
                    </p>
                </div>
            </div>
        `
    }, "");

    rightSideNode.innerHTML = htmlContent;
}

const runApp = () => {
    defaultInterface();
    getPlace();
}

runApp();
