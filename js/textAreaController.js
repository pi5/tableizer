var app = angular.module("Tableizer", []);

app.controller("TextAreaController", function($scope){
    $scope.textarea = {};
    $scope.options = {};
    $scope.options.headers = true;
    $scope.variable = $scope.textarea.text;
    $scope.currentTableValue = "";
    $scope.$watch('textarea.text', function(newValue, oldValue){
      // Initialize to blank text if values are undefined
      newValue = newValue || "";
      oldValue = oldValue || "";

      //Every time on change, clear the table
      //TODO: Optimize to reflect only changes instead of redrawing 
      //      entire table every time
      deleteTable();

      if( !!!newValue ) {
        $('<div/>').text('No Text to create a table!')
          .attr('id','main-table')
          .appendTo('#table-container');
      
        $scope.currentTableValue = "";
      }

      else {
        // Needed when recreating table when table properties are 
        // changed using controls
        $scope.currentTableValue = newValue;
        var table = createTable(newValue, $scope.options);
        if(table) {
          table.appendTo('#table-container');
        }
      }
    });

    // Delete and recreate table when table options are changed
    $scope.$watch('options.headers', function(newValue, oldValue) {
     if($scope.currentTableValue) {
       deleteTable();
       var table = createTable($scope.currentTableValue, $scope.options); 
       table.appendTo('#table-container'); 
     }
    }); 

});

function deleteTable() {
  if (!!$('#main-table').length) {
    $('#main-table').remove();
  }
}

function createTable(newValue, options) {
  var table = $('<table/>')
    .attr('id','main-table')
    .addClass('table table-striped table-bordered text-left');

  var r = newValue.split("\n");

  for (var i = 0; i < r.length; i++) {
    // Create empty table row
    var tr = $('<tr/>');

    var c = r[i];
    r[i] = c.split("\t");

    // Fill table columns
    for (var j=0; j<r[i].length; j++) {
      var td;
      if ( i === 0 && (options.headers)) {
        td = $('<th/>');
      }
      else {
        td = $('<td/>');
      }
      td.text(r[i][j]);
      td.appendTo(tr);  
    }

    tr.appendTo(table);
  } 
  return table;
}
