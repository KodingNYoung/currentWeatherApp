// init UI
const ui = new UI();

// init weather
const weather = new Weather();

// init stoarge
const storage = new Storage();

// UI ELEMENTS
// get form display btn
const formDisplayBtn = document.getElementById("change-loc-btn");

//get form hide btn
const formHideBtn = document.getElementById("close-btn");

// get update btn
const updateBtn = document.getElementById("update-btn");

// get auto update btn
const autoUpdateBtn = document.getElementById("auto-update-btn");

// EVENT-LISTENERS
// to form display btn
formDisplayBtn.addEventListener("click", (e) => {
    ui.showForm();
})

// to form hide btn
formHideBtn.addEventListener("click", () => {
    ui.hideForm();
})

// on the document when ever the browser is refreshed
document.addEventListener("DOMContentLoaded", ()=> {
    console.log("content loaded")
    // check if there is any saved location
    if (storage.isLocationSaved()){
        console.log("location was stored, restoring location info")
        // get the stored location and send the request
        const location = storage.getStoredLocation();

        const city = location.city;
        const country = location.country;

        handleLocation({city, country});
    }else {
        // if not auto update location
        autoUpdateLocation();
    }
}) 
// to the update btn
updateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    // get the inputs
    const city = ui.getInputs().city;
    const country = ui.getInputs().country;

    // if there is any alert clear it
    ui.clearAlerts();   
    
    handleLocation({city,country});
})


const autoUpdateLocation = async () => {
    console.log("auto-updating")
    // init Location object
    const location = new Location();
    
    // get the coordinates
    const locationID = await location.getCoords();
    
    const long = locationID.long;
    const lat = locationID.lat;
    
    handleLocation({lat, long})    
}

// to the auto update btn
autoUpdateBtn.addEventListener("click", autoUpdateLocation)

const handleLocation = (location) => {
    const long = location.long;
    const lat = location.lat;
    const city = location.city;
    const country = location.country;

    let update;

    const handleWeatherUpdate = (val) => {
        if (val.message){
            // show alert
            ui.showNoCityToast(val.message, "no-city");
        }else{
            // parse to local storage
            storage.setLocationToStorage(val.name, val.sys.country)

            // display it
            ui.updateUI(val)
        }
    }

    // console.log("CITY before here", city)
    if (lat && long){
        // fetch the weather updates for the coordinates
        update = weather.fetchWeatherUpdateByCoords(lat, long);
    }else  {
        // console.log("here", city)
        // if city input is empty show alert
        if (!city) {
            ui.showFormAlert("City is required", "");
            return
        }else{
            // fetch the weather updates for the location
            update = weather.fetchWeatherUpdateByCity(city, country);

            // console.log(update);
        }
    }

    // console.log(update)
    update.then(val => handleWeatherUpdate(val))
            
    .catch((err) => console.log(err))

    // clear form
    ui.clearForms();
        
    // hide form body
    ui.hideForm();
}
