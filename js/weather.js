class Weather{
    constructor () {
        this.APIkey = "d2ea27e8a86a94f7542a96aa155da6e2";
        this.APIurl = "https://api.openweathermap.org/data/2.5/weather"; 
    }

    async fetchWeatherUpdateByCity (city, country) {
        try{
            const weatherResponse = await fetch(`${this.APIurl}?q=${city},${country}&appid=${this.APIkey}`);

            const JSONresult = await weatherResponse.json(); 

            return JSONresult;
        }catch(err) {
            console.log(err.message)
        }
    }

    async fetchWeatherUpdateByCoords (lat, long) {
        try{
            const weatherResponse = await fetch(`${this.APIurl}?lat=${city}&lon=${country}&appid=${this.APIkey}`);

            const JSONresult = await weatherResponse.json(); 

            return JSONresult;
        }catch(err) {
            console.log(err.message)
        }
    }
}