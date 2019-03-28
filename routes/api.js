/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

const { expect } = require("chai");

module.exports = app => {
  app
    .route("/api/issues/:project")

    .get((req, res) => {
      const { project } = req.params;
    })

    .post((req, res) => {
      const { project } = req.params;
    })

    .put((req, res) => {
      const { project } = req.params;
    })

    .delete((req, res) => {
      const { project } = req.params;
    });
};
