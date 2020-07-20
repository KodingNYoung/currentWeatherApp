class UI {
    constructor () {
        this.locationForm = document.getElementById("location-form");
        this.formBody = document.getElementById("form-body");
        this.cityInput = document.getElementById("city");
        this.countryInput = document.getElementById("country");

        this.iconURL = "http://openweathermap.org/img/w/";
        this.description = document.querySelector(".description");
        this.weatherIcon = document.querySelector(".weather-icon .icon")
        // paremeter elements
        this.temperatureUI = document.getElementById("temperature");
        this.humidityUI = document.getElementById("humidity");
        this.pressureUI = document.getElementById("pressure"); 

        // city and country text
        this.cityUI = document.getElementById("cityText");
        this.countryUI = document.getElementById("countryText");
    
        // latitide and longitude
        this.lon = document.getElementById("long");
        this.lat = document.getElementById("lat");
    }

    // show form
    showForm() {
        this.locationForm.style.display = "flex";
        this.formBody.style.animation = "slideDown 0.2s ease-in forwards";
        // console.log(this)
    }

    // hide form
    hideForm() {
        this.formBody.style.animation = "slideUp 0.2s ease-out forwards";

        setTimeout(() => {
            this.locationForm.style.display = "none";
        }, 200);
    }

    // clear forms
    clearForms () {
        this.cityInput.value = "";
        this.countryInput.value = "";
    }

    // get inputs
    getInputs () {
        const city = this.cityInput.value;
        const country = this.countryInput.value;

        return {city, country};
    }

    // show form alert
    showFormAlert (message) {
        // create div
        const alert = document.createElement("div");
        alert.className = "alert error";
        alert.textContent = message;

        // get sibling - form
        const form = document.querySelector("form");

        // insert alert into DOM
        this.formBody.insertBefore(alert, form);

        // after 2 sec remove the alert
        setTimeout(this.clearAlerts, 2000)
    }

    // clear any alerts
    clearAlerts () {
        const alert = document.querySelector(".alert");

        if (alert) {
            alert.remove();
        }         
    }

    // update UI
    updateUI(weatherUpdate) {
        // get the elements
        this.description.textContent = weatherUpdate.weather[0].description;

        this.weatherIcon.src = `${this.iconURL}${weatherUpdate.weather[0].icon}.png`;

        this.temperatureUI.textContent = weatherUpdate.main.temp;

        this.humidityUI.textContent = weatherUpdate.main.humidity;

        this.pressureUI.textContent = weatherUpdate.main.pressure;

        this.cityUI.textContent = weatherUpdate.name;
        
        this.countryUI.textContent = weatherUpdate.sys.country;

        this.lon.textContent = `${weatherUpdate.coord.lon}°`;
        this.lat.textContent = `${weatherUpdate.coord.lat}°`;
    }
}


