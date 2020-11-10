
// GET Ajax function
$(function (){

  // DOM referens
  var $name = $('#inputname');
  var $company = $('#inputcompany');

  var url = '/companies.html';

  $(document).ready(function(){
      $("#loginbutton").click(function(){

        var loginInfo = {
          name: $name.val(),
          company: $company.val(),
        };

        console.log(loginInfo);

        // Add to json file
        // TODO

        event.preventDefault();
        window.location.href = url;
      });
  });

});
