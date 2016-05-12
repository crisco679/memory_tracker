var app = angular.module('memoryApp', ['ngRoute']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'views/login.html'
  })
  .when('/register', {
    templateUrl: 'views/register.html'
  })
  .when('/about', {
    templateUrl: 'views/about.html'
  })
  $locationProvider.html5Mode(true);
}])
app.controller('MainController',  ['$scope','$http', function($scope, $http){
  $scope.memory = {};
  $scope.memories = [];
  $scope.memoryCount = 0;
  var fetchMemoryCount = function(){
    $http.get('/memories/count').then(function(response){
      console.log('response from memories/count', response);
      if(response.status !== 200){
        console.log('Failed to fetch memory count');
      }
      $scope.memoryCount = response.data;
      return response.data;
    })
  }
  var fetchMemories = function(){
    $http.get('/memories/data').then(function(response){
      console.log('response from fetchMemories', response);
      if(response.status !== 200){
        console.log('Failed to fetch tickets from the API');
      }
      fetchMemoryCount()
      $scope.memories=response.data;
      return response.data;
    })
  };
  $scope.addMemory = function(memory){
    console.log('add memory function', memory);
    $http.post('/store', memory).then(fetchMemories());
    $scope.memory = {}

  }
  fetchMemoryCount();
  fetchMemories();
}])
app.controller('MemoriesController', ['$scope', '$http', function($scope, $http){
  $scope.memories = [];

  var fetchMemories = function(){
    $http.get('/memories/data').then(function(response){
      console.log('response from fetchMemories in memories.html', response);
      if(response.status !== 200){
        console.log('Failed to fetch memories from the API');
      }
      $scope.memories=response.data;
      return response.data;
    })
  };
  $scope.removeMemory = function(profile){
    console.log("profile param for removeMemory", profile);
    var id = profile._id;
    console.log("id", id);
    $http.delete('/memories/data/' + id).then(function(serverResponse){
      fetchMemories();
    });
  };
  fetchMemories();
}]);
