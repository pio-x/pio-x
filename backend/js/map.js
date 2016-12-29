$(function(){
  getTeamData();
})

function getTeamData(){
  var url = 'http://localhost/pio-x/test_teamjson.json';
  $.ajax({
    url: url,
    dataType: 'json',
    success: processTeamData,
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
}