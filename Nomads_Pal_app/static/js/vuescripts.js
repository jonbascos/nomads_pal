new Vue({
    el: '#vue',
    delimiters: ['[[', ']]'],
    data: {
        clickedSubmit: true,
        city: '',
        state: '',
        locations:[],
        resultLocations:[],
        newLocation: {
            businessName: '',
            locationPhoto: '',
            locationAddress: '',
            locationCity: '',
            locationState: '',
            locationZipCode: '',
            phoneNumber: '',
            websiteUrl: '',
            storeHours: '',
            uploadSpeed: '',
            downloadSpeed: '',
        },
    },
    methods: {
        getLocations: function () {
            axios({
                method: 'get',
                url: 'api/location/',
            }).then(response => {console.log(response); this.locations = response.data.results})
        },
        addLocation: function () {
            axios({
                method: 'post',
                url: 'api/location',
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
            }).then(function (response) {
                console.log(response);
                alert('Form Sent');
            }).catch(function(error) {
                console.log(error);
            })
        },
        search: function () {
            console.log(this.locations);
            clickedSubmit=true;
            let results = this.locations
                .filter(location => location.locationCity.toLowerCase() == this.city.toLowerCase())
                .filter(location => location.locationState.toLowerCase() == this.state.toLowerCase());
            
            this.resultLocations = results;
            console.log(this.resultLocations);
            }
    },
    mounted: function () {
        this.getLocations();
    }
});



// search: function () {
//     console.log(`Results: ${resultLocations}`);
//     clickedSubmit=true;
//     resultLocations = locations.filter(location => location.city === 'city').filter(location => location.state === 'state');
// },