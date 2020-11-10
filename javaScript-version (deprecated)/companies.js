$(function () {
  // DOM elements ref
  var $companies = $("#companies");

  // GET companies
  $.ajax({
    type: "GET",
    url: "data/company.json",
    dataType: "json",
    error: function () {
      $companies.append("<li> No companies added</li>");
    },
    success: function (data) {
      $.each(data, function (i, company) {
        $companies.append(
          "<li onClick='companyClicked()'>" + company.companyName + "</li>"
        );
      });
    },
  });

  // Add company function
  $("#addcompany").click(function () {
    var blob = new Blob(["Text"], { type: "text/plain;charset=utf-8" });

    saveAs(blob, "testfile.txt");
  });
});

// Company clicked function
function companyClicked() {
  var $employees = $("#employees");
  var activeToggle = false;

  console.log("company clicked");

  // GET companies
  $.ajax({
    type: "GET",
    url: "data/company.json",
    dataType: "json",
    error: function () {
      $employees.append("<li> No companies added</li>");
    },
    success: function (data) {
      $employees.append("Employees");

      $.each(data, function (i, company) {
        $employees.append(
          "<li class='employees'>" + company.employees[0].username + "</li>"
        );
      });
    },
  });
}
