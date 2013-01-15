var CODES_TXT = '/codes.txt';

$(document).ready(function(){
  $("label.error").hide();
  $("h2").hide();
  $(".button").click(function(){
    $("div#results p").remove();
    var code = $.trim($("input#code").val());
    var regex1 = /^\d{1,4}(-|\.)?\d{0,4}[aA-zZ]{0,1}$/;
    var regex2 = /code\s?[0-9]{0,2}/i;
    if (! (code.match(regex1) || code.match(regex2))) {  
      $("h2").hide();
      $("label.error").show();  
      $("input#code").focus();
      return false;  
    }
    else {
      $("h2").show();
      $("label.error").hide(); 
      $.get(CODES_TXT, function(data) {
        var lines = data.split("\n");
        $.each(lines, function(n, elem) {
          //no one is going to search with parens, stripping them for matching
          var paren_free_elem = elem.replace('(', '').replace(')', '');
          var matches = paren_free_elem.match(new RegExp(code, "i"));
          if (matches) {
            //print each result line into its own p in the div
            $('div#results').append('<p>' + elem + '</p>');
          }
       });
     });
     return false;
   }
  });  
}); 


