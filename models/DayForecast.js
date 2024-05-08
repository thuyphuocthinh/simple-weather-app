export class DayForecast {
    constructor(date, maxCelciusTemp, minCelciusTemp, condition) {
        this.date = date;
        this.maxCelciusTemp = maxCelciusTemp;
        this.minCelciusTemp = minCelciusTemp;
        this.condition = condition;
    }
}