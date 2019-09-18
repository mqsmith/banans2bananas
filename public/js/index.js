//ADMIN PAGE JS
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
  // Send an AJAX POST-request with jQuery
  $.post("/api/products", newItem)
    // On success, run the following code
    .then(getProducts);
  // $.post("/api/price", newItem)
  //   // On success, run the following code
  //   .then(console.log("post successful"));
  // Empty each input box by replacing the value with an empty string
  $("#productName").val("");
  $("#upc").val("");
  $("#price").val("");
  $("select").val("");
});
function getProducts() {
  $.get("/api/products", function(data) {
    console.log(data[0]);
    if (data.length !== 0) {
      var table = $("<table>");
      table.addClass("header");
      var header = $("<thead>");
      table.append(header);
      header.append(
        "<tr>" + "<th>Product Name</th>" + "<th>UPC</th>" + "</tr>"
      );
      var tbody = $("<tbody>");
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
getProducts();

//INDEX PAGE JS
$("#searchButton").on("click", function(event) {
  event.preventDefault();
  // Make a newItem object
  console.log("clicked");
  var searchItem = $("#search").val();
  console.log(searchItem);
  // Send an AJAX POST-request with jQuery
  $.get("/api/products/" + searchItem)
    // On success, run the following code
    .then(console.log(searchItem));
  // $.post("/api/price", newItem)
  //   // On success, run the following code
  //   .then(console.log("post successful"));
  // Empty each input box by replacing the value with an empty string
  $("#search").val("");
});
