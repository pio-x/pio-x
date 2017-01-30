$(function(){
  getTeamData();
})

function getTeamData(){
  var url = './test_teamjson.json';
  $.ajax({
    url: url,
    dataType: 'json',
    success: processTeamData,
    error: function(error, status, abc){
      console.log(error, status, abc);
    }
  });
}
function getStationData(map){
  var baseURL = 'https://api.pio-x.ch';
  if(window.location.host == "localhost") {
      baseURL = 'http://localhost' + window.location.pathname + '../api';
  }
  var url = baseURL + '/station?hash=admin';
  $.ajax({
    url: url,
    dataType: 'json',
    success: function(stations){
      stations.forEach(function(station){
        var position ={lat: station.pos_lat, lng: station.pos_long};
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: station.name,
            icon: {
             path: 0,
             strokeColor: '#000',
             strokeWeight: 3,
             scale: 8
           }
          });
        marker.addListener('click', function() {
          new google.maps.InfoWindow({
            content: station.name
          }).open(map, marker);
        });
      });
    },
    error: function(error, status, abc){
      console.log(error, status, abc);
    }
  });
}

function processTeamData(teams){
  for(var i = 0; i < teams.length; i++){
    var team = teams[0];
    var positions = team.teampositions;
    console.log(positions);
  }
}

function initMap() {
  var winti = {lat: 47.498934, lng: 8.728970};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: winti
  });
  var marker = new google.maps.Marker({
    position: winti,
    map: map
  });
  getStationData(map);
}
