'use strict';

angular.module('inb4usApp').service('Userservice', ['$http', function ($http) {
  return  {
    activate: function(activateData) {
      return $http({
        method: 'POST',
        url: '/api/user/activate',
        data: activateData
      });
    },
    reset: function (resetData) {
      return $http({
        method: 'POST',
        url: '/api/user/reset',
        data: resetData
      });
    }
  };
}]);
