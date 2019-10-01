new Vue({
  el: '#vue',
  delimiters: ['[[', ']]'],
  data: {
      clickedSubmit: false,
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
      }, //end of data
  },
  methods: {
      getLocations: function () {
          axios({
              methods: 'post',
              url: 'api/location/',
              params: {
                locationCity: city,
                locationState: state,
              },
          })
          .then(function(response) {
            let query = response.data;
            console.log(query);
          })
        }