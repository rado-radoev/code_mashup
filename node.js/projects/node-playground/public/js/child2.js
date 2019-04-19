$("#Weather").hide()


function geoFindMe() {
       
      function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.table({latitude, longitude})   
      }
    
      function error() {
        console.error('Unable to retrieve your location');
      }
    
      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by your browser');
      } else {
        console.log('Locating…');
        navigator.geolocation.getCurrentPosition(success, error);
      }
    
    }
    
    // document.querySelector('#find-me').addEventListener('click', geoFindMe);