// init UI
const ui = new UI();

// init weather
const weather = new Weather();

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

// to the auto update btn
autoUpdateBtn.addEventListener("click",async () => {
    // init Location object
    const location = new Location();

    // get the coordinates
    const locationID = await location.getCoords();

    const long = locationID.long;
    const lat = locationID.lat;

    handleLocation({lat, long})    
})


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
            // display it
            ui.updateUI(val)
        }
    }

    // console.log("CITY before here", city)
    if (city){
        // console.log("here", city)
        // if city input is empty show alert
        if (city === "") {
            ui.showFormAlert("City is required", "");
        }else{
            // fetch the weather updates for the location
            update = weather.fetchWeatherUpdateByCity(city, country);

            console.log(update);
        }
    }else if (lat && long) {
        // fetch the weather updates for the coordinates
        update = weather.fetchWeatherUpdateByCoords(lat, long); 
    }

    update.then(val => handleWeatherUpdate(val))
            
    .catch((err) => console.log(err))

    // clear form
    ui.clearForms();
        
    // hide form body
    ui.hideForm();
}
