class Storage {
    constructor () {
        this.currentLocation = JSON.parse(localStorage.getItem("location"));
        // this.currentCity = this.currentLocation.city;
        // this.currentCountry = this.currentLocation.country;
    }

    isLocationSaved () {
        // there is a storage for location
        if (localStorage.location) {
            return true
        }
        else{
            return false;
        }
    }

    getStoredLocation () {
        return {
            city: this.currentLocation.city,
            country : this.currentLocation.country
        }
    }

    setLocationToStorage (city, country) { 
        const location = {city, country}
        localStorage.setItem("location", JSON.stringify(location));
    }
}