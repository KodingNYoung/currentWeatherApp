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

const handleLocation = (location) => {
    if (location.city){
        const city = location.city;
        const country = location.country;

        // if city input is empty show alert
        if (city === "") {
            ui.showFormAlert("City is required", "");
        }else{
            // fetch the weather updates for the location
            const update = weather.fetchWeatherUpdateByCity(city, country);
            update.then((val) => {
                if (val.message){
                    // show alert
                    ui.showNoCityToast(val.message, "no-city");
                }else{
                    // display it
                    ui.updateUI(val)
                }
            })
            .catch((err) => console.log(err))
        }
    }else if (location.lat && location.long) {
        // fetch the weather updates for the location
        console.log(location.lat, location.long)
        const update = weather.fetchWeatherUpdateByCoords(location.lat, location.long);
        update.then((val) => {
            if (val.message){
                // show alert
                ui.showNoCityToast(val.message, "invalid co-ordinates");
            }else{
                // display it
                ui.updateUI(val)
            }
        })
        .catch((err) => console.log(err)) 
    }

    // clear form
    ui.clearForms();
        
    // hide form body
    ui.hideForm();
}

const setLocation = async () => {
    // console.log("getting location")
    // init Location object
    const location = new Location();

    

    const locationID = await location.getLocation();

    const long = locationID.long;
    const lat = locationID.lat;


    // console.log(lat, long);

    handleLocation({lat, long})

}

autoUpdateBtn.addEventListener("click", setLocation)