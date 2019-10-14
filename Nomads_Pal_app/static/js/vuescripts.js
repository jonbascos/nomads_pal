
// Vue.component('addnewlocation', {
//     props: ['businessName']['newLocation'],
//     template: `
//         <form @submit.prevent='addLocation' id='addNewForm'>
//             <h1>Add New Location</h1>
//             {% csrf_token %}
//             <label class='add_input' for='businessName'>Business Name:</label>
//             <input v-model='newLocation.businessName' id='businessName' placeholder='Name of Business'>

//             <label class='add_input' for='address'>Address:</label>
//             <input v-model='newLocation.locationAddress' id='address' placeholder='Address'>

//             <label class='add_input' for='city'>City:</label>
//             <input id='city' placeholder='City' :value="newLocation.locationCity"
//             @input="newLocation.locationCity = $event.target.value.toUpperCase()">

//             <label class='add_input' for='state'>State:</label>
//             <input id='state' placeholder='State: OR' :value="newLocation.locationState"
//             @input="newLocation.locationState = $event.target.value.toUpperCase()">

//             <label class='add_input' for='zipcode'>Zipcode/Postal Code:</label>
//             <input v-model='newLocation.locationZipCode' id='zipcode' placeholder='Zipcode/Postal Code'>

//             <label class='add_input' for='phoneNumber'>Phone Number:</label>
//             <input v-model='newLocation.phoneNumber' id='phoneNumber' placeholder='Phone Number (optional)'>

//             <label class='add_input' for='website'>Website:</label>
//             <input v-model='newLocation.websiteUrl' id='website' placeholder='http://www.google.com (optional)'>

//             <label class='add_input' for='storeHours'>Store hours:</label>
//             <input v-model='newLocation.storeHours' id='storeHours' placeholder='Store Hours (optional)'>

//             <label class='add_input' for='downloadSpeed'>Download Speed (in Mbps): </label>
//             <input v-model='newLocation.downloadSpeed' id='downloadSpeed' placeholder='downloadSpeed'>

//             <label class='add_input' for='uploadSpeed'>Upload Speed (in Mbps): </label>
//             <input v-model='newLocation.uploadSpeed' id='uploadSpeed' placeholder='uploadSpeed'>

//             <button class="btn waves-effect waves-light" type="submit" @click.prevent='addLocation'>Submit</button>
//         </form>
//     `
// })



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
                            <li>Download Speed: {{ location.downloadSpeed }} Mbps</li>
                            <li>Upload Speed: {{ location.uploadSpeed }} Mbps</li>
                        </div>
                </div>
            </ul>
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