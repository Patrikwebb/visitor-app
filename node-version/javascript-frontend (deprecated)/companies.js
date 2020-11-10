$(function () {
  // DOM elements ref
  var $companies = $("#companies");

  // GET companies (this loads when you refresh the page)
  $.ajax({
    type: "GET",
    url: "http://localhost:3040/company",
    dataType: "json",
    error: function () {
      $companies.html("<li> No companies added</li>");
    },
    success: function (data) {
      $.each(data, function (i, company) {
        // Mustache template for company id
        var companyTemplate =
          "" +
          "<li data-id='{{_id}}' " +
          "class='companyItems' >" +
          "{{companyName}}" +
          "</li>";

        $companies.append(Mustache.render(companyTemplate, company));

        console.log(company);
        console.log(company._id);
      });
    },
  });

  // Company clicked
  $companies.delegate(".companyItems", "click", function () {
    var $employees = $("#employees");
    var companyId = $(this).attr("data-id");
    var $li = $(this).closest("li");
    var $companyItems = $(".companyItems");
    var $employeesList = $(".employees");

    var data = {
      companyId: companyId,
    };

    // POST companies ID
    $.ajax({
      type: "POST",
      url: "http://localhost:3040/company/id",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      data: data,
      error: function () {
        $employees.html("<li>Could not load employees</li>");
      },
      success: function (data) {
        console.log(data);

        // $li.append('<button class="remove">-</button>');

        $.each(data, function (i, company) {
          var active;
          console.log(active);

          if (!active) {
            $li.append(
              '<li class="employeesItems">' + company.username + "</li>"
            );
            active = true;
            console.log("active true");
          } else {
            // $companyItems.html('');
            $employeesList.hide("");
            active = false;
            console.log("active false");
          }
        });
      },
    });
  });

  // Company clicked
  $companies.delegate(".remove", "click", function () {
    // var $li = $(this).closest('li');
    var $employeesItems = $("li .employees");

    $employeesItems.hide();

    console.log("employeesItems hide");
  });
});

// Add company
function addCompany() {
  var $companyName = $("#companyName");
  var $outputcompanymessage = $("outputcompanymessage");
  var companyName = $companyName.val();

  if (companyName === "") {
    $outputcompanymessage.html("Enter company name");
  } else {
    // POST companies ID
    $.ajax({
      type: "POST",
      url: "http://localhost:3040/company/add",
      data: { company: companyName },
      error: function () {
        $outputcompanymessage.html("<li>Could not add company try again</li>");
      },
      success: function (data) {
        console.log(data);
      },
    });

    console.log("company added");
  }

  $event.preventDefault();
  window.location.href = "/companies.html";
}
