var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Load manager-view page
  app.get("/adminView", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/manager-view.html"));
  });

  // Loads 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/page404.html"));
  });
};
