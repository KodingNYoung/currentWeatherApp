// init UI
const ui = new UI();

// init weather
const weather = new Weather();

// the location input form
// get form display btn
const formDisplayBtn = document.getElementById("change-loc-btn");

//get form hide btn
const formHideBtn = document.getElementById("close-btn");

// get update btn
const updateBtn = document.getElementById("update-btn");

// eventlistenters
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

    // if city input is empty show alert
    if (city === "") {
        ui.showFormAlert("City is required!");
    }else{
        // fetch the weather updates for the location
        const update = weather.fetchWeatherUpdate(city, country);
        update.then((val) => {
            if (val.message){
                // show alert
                console.log(val.message, val.cod)
            }else{
                // display it
                ui.updateUI(val)
            }
        })
        
        // clear form
        ui.clearForms();
    
        // hide form body
        ui.hideForm();

        // if the location is not found, return an alert

    }
    
})
