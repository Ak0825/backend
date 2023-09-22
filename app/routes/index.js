const noteRoutes = require("./notes_route");
module.exports = function (app, db) {
  noteRoutes(app, db); // Other route groups could go here, in the future
};
