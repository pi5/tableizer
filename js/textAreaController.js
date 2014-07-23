var app = angular.module("Tableizer", []);

app.controller("TextAreaController", function($scope){
  $scope.textarea = {};
  $scope.variable = $scope.textarea.text;
  $scope.$watch('textarea.text', function(newValue, oldValue){
    // Initialize to blank text if values are undefined
    newValue = newValue || "";
    oldValue = oldValue || "";

    console.log(newValue.split("\n"));
  });
});
