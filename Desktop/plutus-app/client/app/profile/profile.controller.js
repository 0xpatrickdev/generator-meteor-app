'use strict';

angular.module('plutusAppApp')
  .controller('ProfileCtrl', function ($scope) {
    $scope.message = 'Hello';
  })
  .state('profile', {
  	url: '/profile',
  	templateUrl: 'app/profile/profile.html',
  	controller: 'ProfileCtrl',
  	sp: {
    	authenticate: true
  });
});
