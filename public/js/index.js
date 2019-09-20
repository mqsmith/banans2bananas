//ADMIN PAGE JS

//The on-click function that created the new item and sends it to the Products table and the price table.
$("#addItemButton").on("click", function(event) {
  event.preventDefault();
  // Make a newItem object
  var newItem = {
    productName: $("#productName").val(),
    upc: $("#upc").val(),
    price: $("#price").val(),
    storeId: $("select")
      .find(":selected")
      .val()
  };

  console.log(newItem);
  // Send an AJAX POST-request to the products api route with jQuery
  $.post("/api/products", newItem)
    // On success, run the following code
    .then(getProducts);
  // Empty each input box by replacing the value with an empty string
  $("#productName").val("");
  $("#upc").val("");
  $("#price").val("");
  $("select").val("");
  alert("Product Successfully added");
});
//Funtion to make an AJAX GET-request to the products table
function getProducts() {
  $.get("/api/products", function(data) {
    console.log(data[0]);
    //If the returning data is NOT 0 then target the producsTable area to populate the table.
    if (data.length !== 0) {
      $("#productsTable").empty();
      var table = $("<table>");
      table.addClass("header");
      var header = $("<thead>");
      table.append(header);
      header.append(
        "<tr>" + "<th>Product Name</th>" + "<th>UPC</th>" + "</tr>"
      );
      var tbody = $("<tbody>");
      //For loop to create a table row with each line returned from the Products table.
      for (var i = 0; i < data.length; i++) {
        var row = $("<tr>");
        header.append(row);
        row.addClass("product");
        row.append(
          "<td>" +
            data[i].productName +
            "</td>" +
            "<td>" +
            data[i].upc +
            "</td></tr>"
        );
        // row.append("<td>" + data.price + "</td>" + "</tr>");
        $("#productsTable").prepend(row);
      }
      tbody.append("</tbody>");
      $("#productsTable").prepend(header);
    }
  });
}
//Call the above function on page load to populate the table.
getProducts();

//INDEX PAGE JS

//The on-click function that sends an AJAX call to the GET-route to query the Poducts table to start a chain of queries that return the lowest pice for an item.
$("#searchButton").on("click", function(event) {
  event.preventDefault();
  console.log("clicked");
  //Creates a new searchItem variable.
  var searchItem = $("#search").val();
  console.log(searchItem.toLowerCase());

  $.get("/api/products/" + searchItem, function(data) {
    console.log(data.split(" "));
    let savings = data.split(" ");
    $("#datalist").empty();
    $("#datalist").append("<h2>Lowest Price</h2>");
    $("#datalist").append("<li><h3>Item: " + searchItem + "</h3></li>");
    $("#datalist").append(
      "<li><h3>" + savings[2] + " " + savings[3] + "</h3></li>"
    );
    // the age
    $("#datalist").append(
      "<li><h3>" + savings[0] + " $" + savings[1] + "</h3></li>"
    );
  });
  // Empty each input box by replacing the value with an empty string
  $("#search").val("");
});
