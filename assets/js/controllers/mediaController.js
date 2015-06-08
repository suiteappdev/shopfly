angular.module('app').controller("mediaController", ["$scope", function($scope){
  $scope.myImage = '';
  $scope.myCroppedImage = '';
  $scope.cropType = "circle";

  angular.element(document.querySelector('#fileInput')).on('change', function(evt){
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage = evt.target.result;
        });
      };

      reader.readAsDataURL(file);    
  });

}]);

