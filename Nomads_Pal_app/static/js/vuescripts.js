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
    },
    methods: {
        getLocations: function () {
            let csrf_token = document.querySelector("input[name=csrfmiddlewaretoken]").value;
            axios({
                method: 'get',
                url: 'api/location/',
                headers: {
                    "X-CSRFToken": csrf_token
                },
            }).then(response => {
                console.log(response);
                this.locations = response.data.results
            })
        },
        uploadImage (event) {
            console.log(event);
            this.newLocation.locationPhoto = event.target.files[0];
            console.log(this.newLocation.locationPhoto);
        },
        addLocation () {
            let csrf_token = document.querySelector("input[name=csrfmiddlewaretoken]").value;
            let rawData = {
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
            }
            rawData = JSON.stringify(rawData)
            
            const fd = new FormData();
                fd.append('locationPhoto', this.newLocation.locationPhoto, this.newLocation.locationPhoto.name)
                fd.append('data', rawData)
                console.log(fd);
            // axios({
            //     method: 'post',
            //     url: 'api/location/',
            //     headers: {
            //         "X-CSRFToken": csrf_token,
            //         "Content-Type": "multipart/form-data",
            //     },
            //     data: { 
            //         fd
            //      },
            //     }).then(response => {
            //         console.log(response);
            //         alert('Success');
            //         this.addNewLocation = false;
            //     })
                axios.post('api/location/', fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "X-CSRFToken": csrf_token,
                    }
                });
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





// businessName: this.newLocation.businessName,
                    // locationPhoto: this.newLocation.locationPhoto,
                    // locationAddress: this.newLocation.locationAddress,
                    // locationCity: this.newLocation.locationCity,
                    // locationState: this.newLocation.locationState,
                    // locationZipCode: this.newLocation.locationZipCode,
                    // phoneNumber: this.newLocation.phoneNumber,
                    // websiteUrl: this.newLocation.websiteUrl,
                    // storeHours: this.newLocation.storeHours,
                    // uploadSpeed: this.newLocation.uploadSpeed,
                    // downloadSpeed: this.newLocation.downloadSpeed,
                // },



                // addLocation () {
                //     let csrf_token = document.querySelector("input[name=csrfmiddlewaretoken]").value;
                //     const formData = new FormData();
                //     formData.append('locationPhoto', this.newLocation.locationPhoto);
                //     formData.append('businessName', this.newLocation.businessName);
                //     formData.append('locationAddress', this.newLocation.locationAddress);
                //     formData.append('locationCity', this.newLocation.locationCity);
                //     formData.append('locationState', this.newLocation.locationState);
                //     formData.append('locationZipCode', this.newLocation.locationZipCode);
                //     formData.append('phoneNumber', this.newLocation.phoneNumber);
                //     formData.append('websiteUrl', this.newLocation.websiteUrl);
                //     formData.append('storeHours', this.newLocation.storeHours);
                //     formData.append('uploadSpeed', this.newLocation.uploadSpeed);
                //     formData.append('downloadSpeed', this.newLocation.downloadSpeed);
        
                //     axios({
                //         method: 'post',
                //         url: 'api/location/',
                //         headers: {
                //             "X-CSRFToken": csrf_token,
                //             "Content-Type": "multipart/form-data",
                //         },
                //         data: { 
                //             formData
                //          },
                //         }).then(response => {
                //             console.log(response);
                //             this.addNewLocation = false;
                //         })
                // },