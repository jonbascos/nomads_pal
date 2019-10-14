Vue.component('results', {
    props: ['location'],

    template: `
        <div>
            <div class="location-card-area">
                <div class="location-card">
                    <ul >
                        <li>{{ location.businessName }}</li>
                        <li><img src="https://placeimg.com/200/200/tech"></li>
                        <li>Address: {{ location.locationAddress }}<br> {{ location.locationCity}}, {{ location.locationState}} {{ location.locationZipCode }}</li>
                        <button @click="detailstoggle = ! detailstoggle" class="btn">Details</button>
                        <div v-if="detailstoggle">
                            <li>Phone Number: {{ location.phoneNumber }}</li>
                            <li><a :href=location.websiteUrl>{{ location.websiteUrl }}</a></li>
                            <li>Store Hours: {{ location.storeHours }}</li>
                            <li>Download Speed: {{ location.downloadSpeed }} Mbps</li>
                            <li>Upload Speed: {{ location.uploadSpeed }} Mbps</li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    `,

    data () {
        return {
            detailstoggle: false,
        }
    }
})


new Vue({
    el: '#vue',
    delimiters: ['[[', ']]'],
    data: {
        results: null,
        page: 1,
        next: null,
        previous: null,
        clickedSubmit: false,
        addNewLocation: false,
        details: false,
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
                    page: this.page,
                },
                headers: {
                    "X-CSRFToken": csrf_token
                },
            }).then(response => {
                console.log(response);
                this.resultLocations = response.data.results;
                this.next = response.data.next;
                console.log(this.next);
                this.previous = response.data.previous;
                console.log(this.previous);
                console.log(this.resultLocations);
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
                    this.newLocation.businessName = "";
                    this.newLocation.locationAddress = "";
                    this.newLocation.locationCity = "";
                    this.newLocation.locationState = "";
                    this.newLocation.locationZipCode = "";
                    this.newLocation.phoneNumber = "";
                    this.newLocation.websiteUrl = "";
                    this.newLocation.storeHours = "";
                    this.newLocation.downloadSpeed = "";
                    this.newLocation.uploadSpeed = "";
                })
        },
    },
});