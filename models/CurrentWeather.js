export class CurrentWeather {
    constructor(place, celciusTemp, humidity, datetime, chanceOfRain, windSpeed) {
        this.place = place;
        this.celciusTemp = celciusTemp;
        this.humidity = humidity;
        this.datetime = datetime;
        this.chanceOfRain = chanceOfRain;
        this.windSpeed = windSpeed;
    }
}