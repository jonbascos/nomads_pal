
new Vue({
    el: '#vue',
    delimiters: ['[[', ']]'],
    data: {
        clickedSubmit: false,
        addNewLocation: false,
        city: "",
        state: "",
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
    },
    methods: {
        getLocations: function () {
            let csrf_token = document.querySelector("input[name=csrfmiddlewaretoken]").value;
            axios({
                method: 'get',
                url: 'api/location/',
                params: {
                    locationCity: this.city,
                    locationState: this.state,
                },
                headers: {
                    "X-CSRFToken": csrf_token
                },
            }).then(response => {
                console.log(response);
                this.resultLocations = response.data.results;
                this.city="";
                this.state="";
            })
        },
        
        addLocation() {
            let csrf_token = document.querySelector("input[name=csrfmiddlewaretoken]").value;
            
            axios({
                method: 'post',
                url: 'api/location/',
                headers: {
                    "X-CSRFToken": csrf_token,
                },
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
                }).then(response => {
                    console.log(response);
                    alert('Success');
                    this.addNewLocation = false;
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
    },
});