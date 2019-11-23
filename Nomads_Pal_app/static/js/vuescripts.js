
console.log('loaded')

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems,{
        edge: 'right',
    });
});

Vue.component("app-navbar", {
    template: `
        <div>
            <nav>
                <div class="nav-wrapper">
                <a href="http://www.nomadspal.com" class="brand-logo left"><img src="../media/images/assets/Nomads_Pal_Logo2.png" id="logo" class=' responsive-img'></a>
                <a href="#" data-target="mobile-demo" class="sidenav-trigger right"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    <li><a href="http://www.nomadspal.com">Home</a></li>
                    <li><a href="#">How to Become a Digital Nomad</a></li>
                    <li><a href="https://www.worldnomads.com/travel-insurance/">Travel Insurance</a></li>
                </ul>
                </div>
            </nav>

            <ul class="sidenav" id="mobile-demo">
                <li><a href="http://www.nomadspal.com">Home</a></li>
                <li><a href="#">How to Become a Digital Nomad</a></li>
                <li><a href="https://www.worldnomads.com/travel-insurance/">Travel Insurance</a></li>
            </ul>
        </div>
    `
})

Vue.component('app-results', {
    data () {
        return {
            pageNumber: 0,
            resultLocations: this.resultLocations,
            detailstoggle: false,
        }
    },

    props:{
        listData: {
            type: Array,
            required: true,
        },
        size: {
            type: Number,
            required: false,
            default: 5
        },
    },
    
    methods: {
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
    },

    computed: {
        pageCount() {
            let l = this.listData.length;
            let s = this.size;
            return Math.ceil(l/s);
        },
        paginatedData() {
            const start = this.pageNumber * this.size;
            const end = start + this.size;

            return this.listData.slice(start, end);
        },
    },

    template: `
        <div>
            <div v-if="this.listData.length==0">
                <p><h3>Enter your search or No results found!</h3></p>
            </div>
            <div v-else="this.listData.length > 0">
                <ul class="location-card-area">
                    <div class="location-card" v-for="location in paginatedData">
                        <li><a :href=location.websiteUrl>{{ location.businessName }}</a></li>
                        <li><img src="https://placeimg.com/200/200/tech"></li>
                        <li>Address: {{ location.locationAddress }}<br> {{ location.locationCity}}, {{ location.locationState}} {{ location.locationZipCode }}</li>
                        <li>Phone Number: {{ location.phoneNumber }}</li>
                        <li><a :href=location.websiteUrl>{{ location.websiteUrl }}</a></li>
                        <li>Store Hours: {{ location.storeHours }}</li>
                        <li>Average: 100Mbps download / 100Mbps upload</li>
                    </div>
                </ul>
                <div class="paginationContainer">
                    <div v-if="this.listData.length != 0">
                        <button v-on:click="prevPage" :disabled="pageNumber==0">Previous</button>
                        <span> Page {{ this.pageNumber + 1 }} of {{ Math.ceil(this.listData.length / this.size) }} </span>
                        <button v-on:click="nextPage" :disabled="pageNumber >= pageCount - 1" >Next</button>
                    </div>
                </div>
            </div>
        </div>
    `
}),


new Vue({
    el: '#vue',
    delimiters: ['[[', ']]'],
    data: {
        results: null,
        totalResults: null,
        clickedSubmit: false,
        addNewLocation: false,
        details: false,
        city: "",
        state: "",
        locations: [],
        resultLocations: [],
        perPage: 5,
        page: 1,
        pages: [],
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
                console.log(this.resultLocations);
                this.totalResults = response.data.count;
                console.log(this.totalResults + 'total results')
                this.city="";
                this.state="";
            })
            .catch(function(err) {
                console.log(err);
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