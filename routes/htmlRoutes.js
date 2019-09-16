module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  // Load example page and pass in an example by id
  app.get("/adminView", function(req, res) {
    res.sendFile(path.join(__dirname, "manager_view.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "page404.html"));
  });
};
