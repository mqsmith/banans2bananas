// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/products",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

//=========================================================
//=========================================================
//=========================================================

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
  $.post("/api/price", newItem)
    // On success, run the following code
    .then(console.log("post successful"));
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
      var header = $("<table>");
      header.addClass("header");
      header.prepend("<thead>" + "<tr>"+ "<th>Product Name</th>" + "<th>UPC</th>" + "</tr></thead>");
      var tbody = $("<tbody>");
      for (var i = 0; i < data.length; i++) {
        var row = $("<tr>");
        row.addClass("product");
        row.append("<td>" + data[i].productName + "</td>"+ "<td>" + data[i].upc + "</td></tr>");
        // row.append("<td>" + data.price + "</td>" + "</tr>");
        $("#productsTable").prepend(row);
      }
      tbody.append("</tbody>");
      $("#productsTable").prepend(header);
    }
  });
}
getProducts();
