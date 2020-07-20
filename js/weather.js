class Weather{
    constructor () {
        this.APIkey = "d2ea27e8a86a94f7542a96aa155da6e2";
        this.APIurl = "http://api.openweathermap.org/data/2.5/weather"; 
    }

    async fetchWeatherUpdate (city, country) {
        const weatherResponse = await fetch(`${this.APIurl}?q=${city},${country}&appid=${this.APIkey}`);

        const JSONresult = await weatherResponse.json(); 

        return JSONresult;
    }
}