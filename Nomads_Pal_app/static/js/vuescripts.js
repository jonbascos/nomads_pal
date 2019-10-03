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
            imagePath: null,
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
    },
    methods: {
        getLocations: function () {
            axios({
                method: 'get',
                url: 'api/location/',
            }).then(response => {
                console.log(response);
                this.locations = response.data.results
            })
        },
        addLocation: function () {
            axios({
                method: 'post',
                url: 'api/location/',
                data: {
                    businessName: this.newLocation.businessName,
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
            }).then(function (response) {
                alert('New Location Submitted');
            })
        },
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
        },
        search: function () {
            console.log(this.locations);
            if (this.addNewLocation === true) {
                this.addNewLocation = false;
            } else {

                this.clickedSubmit = true;
                let results = this.locations
                    .filter(location => location.locationCity.toLowerCase() == this.city.toLowerCase())
                    .filter(location => location.locationState.toLowerCase() == this.state.toLowerCase());

                this.resultLocations = results;
                console.log(this.resultLocations);
                this.city = '';
                this.state = '';

            }
        },
    },
    mounted: function () {
        this.getLocations();
    }
});



// addLocation: function () {
//     axios({
//         method: 'POST',
//         header: {
//             'Content-type': 'application/json',
//         },
//         url: '/api/location',
//         data: {
//             businessName: this.newLocation.businessName,
//             locationPhoto: this.newLocation.locationPhoto,
//             locationAddress: this.newLocation.locationAddress,
//             locationCity: this.newLocation.locationCity,
//             locationState: this.newLocation.locationState,
//             locationZipCode: this.newLocation.locationZipCode,
//             phoneNumber: this.newLocation.phoneNumber,
//             websiteUrl: this.newLocation.websiteUrl,
//             storeHours: this.newLocation.storeHours,
//             uploadSpeed: this.newLocation.uploadSpeed,
//             downloadSpeed: this.newLocation.downloadSpeed,
//         },
//     }).then(function (response) {
//         console.log(response);
//         alert('Form Sent');
//     }).catch(function(error) {
//         console.log(error);
//     })
// },