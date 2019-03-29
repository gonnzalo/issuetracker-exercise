/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

const { expect } = require("chai");
const { ObjectID } = require("mongodb");

module.exports = (app, db) => {
  app
    .route("/api/issues/:project")

    .get((req, res) => {
      const { project } = req.params;
      const collection = db.collection(project);
      collection
        .find()
        .toArray()
        .then(items => {
          return res.send(items);
        })
        .catch(err => console.error(`Failed to find documents: ${err}`));
    })

    .post((req, res) => {
      const { project } = req.params;
      const newIssue = {
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_on: new Date(),
        updated_on: new Date(),
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to || "",
        open: true,
        status_text: req.body.status_text || ""
      };

      if (!newIssue.issue_title || !newIssue.issue_text || !newIssue.created_by)
        return res.send("missing inputs");

      const collection = db.collection(project);

      return collection
        .insertOne(newIssue)
        .then(response => {
          res.json(response.ops[0]);
        })
        .catch(err => console.error(`Failed to insert item: ${err}`));
    })

    .put((req, res) => {
      const { project } = req.params;

      const collection = db.collection(project);

      const updatedFields = {};

      Object.keys(req.body).forEach(key => {
        if (req.body[key] && key !== "_id") {
          updatedFields[key] = req.body[key];
        }
      });

      if (Object.keys(updatedFields).length === 0) {
        res.send("no updated field sent");
      }

      collection
        .findOneAndUpdate(
          { _id: ObjectID(req.body._id) },
          {
            $set: updatedFields
          },
          { returnOriginal: false }
        )
        .then(updatedDocument => {
          return res.send("successfully updated");
        })
        .catch(err =>
          console.error(`Failed to find and update document: ${err}`)
        );
    })

    .delete((req, res) => {
      const { project } = req.params;
    });
};
