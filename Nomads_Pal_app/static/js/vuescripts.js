


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });

Vue.component("app-navbar", {
    template: `
        <div>
            <nav>
                <div class="nav-wrapper">
                <a href="{% url 'home' %}" class="brand-logo"><img src="../media/images/assets/Nomads_Pal_Logo2.png" id="logo" class=' responsive-img'></a>
                <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    <li><a href="{% url 'home' %}">Home</a></li>
                    <li><a href="#">How to Become a Digital Nomad</a></li>
                    <li><a href="https://www.worldnomads.com/travel-insurance/">Travel Insurance</a></li>
                </ul>
                </div>
            </nav>

            <ul class="sidenav" id="mobile-demo">
                <li><a href="{% url 'home' %}">Home</a></li>
                <li><a href="#">How to Become a Digital Nomad</a></li>
                <li><a href="https://www.worldnomads.com/travel-insurance/">Travel Insurance</a></li>
            </ul>
        </div>
    `
})

Vue.component('results', {
    props: ['location'],
    template: `
        <div>
            <ul>
                <div class="location-card">
                        <li><a :href=location.websiteUrl>{{ location.businessName }}</a></li>
                        <li><img src="https://placeimg.com/200/200/tech"></li>
                        <li>Address: {{ location.locationAddress }}<br> {{ location.locationCity}}, {{ location.locationState}} {{ location.locationZipCode }}</li>
                        <button @click="detailstoggle = ! detailstoggle" class="btn">Details</button>
                        <div v-if="detailstoggle">
                            <li>Phone Number: {{ location.phoneNumber }}</li>
                            <li><a :href=location.websiteUrl>{{ location.websiteUrl }}</a></li>
                            <li>Store Hours: {{ location.storeHours }}</li>
                            <li>Average: 100Mbps download / 100Mbps upload</li>
                        </div>
                </div>
            </ul>
        </div>
    `,
    data () {
        return {
            detailstoggle: false,
        }
    },
})


new Vue({
    el: '#vue',
    delimiters: ['[[', ']]'],
    data: {
        results: null,
        totalResults: null,
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
            downloadSpeed: null,
            uploadSpeed: null,
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
                this.totalResults = response.data.count;
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

M.AutoInit();