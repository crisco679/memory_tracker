var app = angular.module('memoryApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'MainController as home'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController as login'
  })
  .when('/logout', {
    templateUrl: 'views/home.html',
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'RegisterController as register',
  })
  .when('/memories', {
    templateUrl: 'views/memories.html',
    controller: 'MemoriesController as memory',
  })

  $locationProvider.html5Mode(true);


}])


app.controller('MainController',  ['$scope','$http', function($scope, $http){
  $scope.memories = [];
  var fetchMemories = function(){
      $http.get('/memories').then(function(response){
      console.log('response from fetchMemories', response);
      if(response.status !== 200){
        console.log('Failed to fetch tickets from the API');
      }
      $scope.memories=response.data;
      return response.data;
  })
};
$scope.addMemory = function(memory){
  console.log('add memory function', memory);
  $http.post('/store', memory).then(fetchMemories());


}
  fetchMemories();
}]);


app.controller('LoginController', function(){

})
app.controller('RegisterController', function(){

})
app.controller('MemoriesController', ['$scope', '$http', function($scope, $http){
  $scope.memories = [];
  var fetchMemories = function(){
      $http.get('/memories').then(function(response){
      console.log('response from fetchMemories in memories.html', response);
      if(response.status !== 200){
        console.log('Failed to fetch tickets from the API');
      }
      $scope.memories=response.data;
      return response.data;
  })
};
  fetchMemories();

}])
