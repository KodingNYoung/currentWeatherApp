class Location {
    constructor () {
        this.long;
        this.lat;
    }

    setLocation () {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    this.long= pos.coords.longitude;
                    this.lat = pos.coords.latitude;

                    resolve({
                        lat:this.lat,
                        long: this.long});
                })
            }
        })
    }

    async getLocation () {
        return await this.setLocation();
    }
}