var app = angular.module("Tableizer", []);

app.controller("TextAreaController", function($scope){
  $scope.textarea = {};
  $scope.variable = $scope.textarea.text;
  $scope.rows = [];
  $scope.th = [];
  $scope.$watch('textarea.text', function(newValue, oldValue){
    // Initialize to blank text if values are undefined
    newValue = newValue || "";
    oldValue = oldValue || "";
    
    var r = newValue.split("\n");
    var h = r[0].split("\t");
    $scope.th = h;

    for (var i = 1; i < r.length; i++){
      var c = r[i];
      r[i] = c.split("\t");  
    } 
  
    // Slice to remove table header  
    r = r.slice(1);
    $scope.rows = r; 
  });
});
