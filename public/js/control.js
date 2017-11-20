var app=angular.module("app",["ngMaterial"]);
app.controller("control1",function($scope,$http){
   $scope.names="wefwEF";
   $scope.loaded="";
$scope.create=function(){
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon:"../images/bat.png",
        animation: google.maps.Animation.DROP,
      });
    console.log("hfuyghba");
}
$scope.draw=function(str){
  
  
    var request = {
      query: str
    };
  
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
  }
  
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(results[0].geometry.location);
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: map,
        icon:"../images/bat.png",
        animation: google.maps.Animation.DROP,
      });
    }
  
}
//////// for slider //////////
var slideIndex = 1;

$scope.plusDivs=function(n){
      $scope.showDivs(slideIndex += n);
}
$scope.showDivs=function(n){
  var i;
  var x = document.getElementsByClassName("slide");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "inline";
}
$scope.makeCall=function(ev){
  $scope.loaded="false";
  console.log($scope.loaded);
  var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
  
    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 2
      });
      var team="";var no="";
  target=ev.target.outerText;
  if(target==="India"){team="India";no="4";}
  else if(target==="England"){team="England";no="3";}
  else {team="Australia";no="1";}
  $http.post("https://matchonmap.herokuapp.com/scrap?team="+team+"&no="+no).then(function(res){

    for(var i=0;i<res.data.length;i++){
      console.log(res.data[i]);
      $scope.draw(res.data[i]);
    }
    $scope.loaded="";
 }); 
}
/////////
$scope.showDivs(slideIndex);
$scope.create();
});