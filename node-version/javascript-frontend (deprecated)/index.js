// GET Ajax function
$(function () {
  // DOM referens
  var $name = $("#inputname");
  var $company = $("#inputcompany");
  var $outputmessage = $("#outputmessage");

  var locationUrl = "/companies.html";

  $(document).ready(function () {
    $("#loginbutton").click(function () {
      var loginInfo = {
        name: $name.val(),
        company: $company.val(),
      };

      if ($name.val() === "") {
        $outputmessage.html("<p>Sign in failed enter info</p>");
      } else {
        console.log(loginInfo);

        // POST companies ID
        $.ajax({
          type: "POST",
          url: "http://localhost:3040/signin",
          data: loginInfo,
          error: function () {
            $outputmessage.html("<p>Sign in failed try again</p>");
          },
          success: function (data) {
            console.log(data);
          },
        });

        event.preventDefault();
        window.location.href = locationUrl;
      }
    });
  });
});
