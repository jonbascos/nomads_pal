new Vue({
    el: '#vue',
    delimiters: ['[[', ']]'],
    data: {
        clickedSubmit: false,
        addNewLocation: false,
        city: '',
        state: '',
        locations: [],
        resultLocations: [],
        newLocation: {
            businessName: null,
            locationPhoto: null,
            locationAddress: null,
            locationCity: null,
            locationState: null,
            locationZipCode: null,
            phoneNumber: null,
            websiteUrl: null,
            storeHours: null,
            uploadSpeed: null,
            downloadSpeed: null,
        },
    }, // End Data
    methods: {
        uploadImage (event) {
            console.log(event);
        }, // End uploadImage()
        addLocation () {
            let csrf_token = document.querySelector("input[name=csrfmiddlewaretoken]").value;
            axios({
                method: 'post',
                url: 'api/location/',
                headers: {
                    "X-CSRFToken": csrf_token,
                },
                data: { 
                    businessName: this.newLocation.businessName,
                    locationPhoto: this.newLocation.locationPhoto,
                    locationAddress: this.newLocation.locationAddress,
                    locationCity: this.newLocation.locationCity,
                    locationState: this.newLocation.locationState,
                    locationZipCode: this.newLocation.locationZipCode,
                    phoneNumber: this.newLocation.phoneNumber,
                    websiteUrl: this.newLocation.websiteUrl,
                    storeHours: this.newLocation.storeHours,
                    uploadSpeed: this.newLocation.uploadSpeed,
                    downloadSpeed: this.newLocation.downloadSpeed,
                 },
                }).then(response => {
                    alert('Success');
                    this.addNewLocation = false;
                })
        }, // end addLocation()
        viewAddLocation: function () {
            if (this.clickedSubmit === true) {
                this.clickedSubmit = false;
                this.resultLocations = '';
            }

            if (this.addNewLocation === false) {
                this.addNewLocation = true;
            } else {
                this.addNewLocation = false;
            }
            console.log(this.addNewLocation);
        }, // end viewAddLocation()
        search: function () {
            if (this.addNewLocation === true) {
                this.addNewLocation = false;
            } else {
                let csrf_token = document.querySelector("input[name=csrfmiddlewaretoken]").value;
                axios({
                    method: 'get',
                url: 'api/location/',
                headers: {
                    "X-CSRFToken": csrf_token
                },
                }).then(response => {
                    console.log(response.data.results);
                    this.locations = response.data.results
                })
        }
    }
}
})
