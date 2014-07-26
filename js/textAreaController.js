var app = angular.module("Tableizer", []);

app.controller("TextAreaController", function($scope){
    $scope.textarea = {};
    $scope.variable = $scope.textarea.text;
    $scope.$watch('textarea.text', function(newValue, oldValue){
      // Initialize to blank text if values are undefined
      newValue = newValue || "";
      oldValue = oldValue || "";
      
      //Every time on change, clear the table
      //TODO: Optimize to reflect only changes
      if (!!$('#main-table').length) {
        $('#main-table').remove();
      }

      if( !!!newValue ) {
        $('<div/>').text('No Text to create a table!')
          .attr('id','main-table')
          .appendTo('#table-container');
      }
      
      else { 
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
            if ( i === 0 ) {
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
      
        table.appendTo('#table-container');
      }
    });
});
