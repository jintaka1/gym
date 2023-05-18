import { Router } from "express";
import { validate } from "../middleware/validator.js";
import {
  Activity,
  getAll,
  getById,
  create,
  remove,
  update,
} from "../models/activities.js";
import xml2js from "xml2js";

const activityController = Router();

//get all activities

activityController.get("/activities", (req, res) => {
  // #swagger.summary = 'get all activities'
  getAll()
    .then((activities) => {
      res.status(200).json({
        staus: 200,
        messages: "All activities",
        activities: activities,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//get an activity by id
const getActivityByIdSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
  },
};

activityController.get(
  "/activities/:id",
  validate({ params: getActivityByIdSchema }),
  (req, res) => {
    // #swagger.summary = 'get an activity by id'
    const activityID = req.params.id;
    getById(activityID)
      .then((activity) => {
        res.status(200).json({
          staus: 200,
          messages: "Activity found",
          activity: activity,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

//create a new activity
const createActivitySchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    duration: {
      type: "string",
    },
  },
};

activityController.post(
  "/activities",
  validate({ body: createActivitySchema }),
  (req, res) => {
    // #swagger.summary = 'create a new activity'
    /* #swagger.requestBody = {
            description: "Adding new activity",
            content: {
                'application/json': {
                    schema: {
                        name: 'string',
                        description: 'string',
                        duration: 'string',
                    },
                    example: {
                       name: 'string',
                        description: 'string',
                        duration: 'string',
                    }
                }
            }
        } */

    const activity = req.body;
    create(activity)
      .then((activity) => {
        res.status(200).json({
          staus: 200,
          messages: "Activity created",
          activity: activity,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

//delete an activity by id
const deleteActivityByIdSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
  },
};

activityController.delete(
  "/activities/:id",
  validate({ params: deleteActivityByIdSchema }),
  (req, res) => {
    // #swagger.summary = 'delete an activity by id'
    const activityID = req.params.id;
    remove(activityID)
      .then((activity) => {
        res.status(200).json({
          staus: 200,
          messages: "Activity deleted",
          activity: activity,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

//update an activity by id
const updateActivityByIdSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    duration: {
      type: "string",
    },
  },
};

activityController.put(
  "/activities/",
  validate({ body: updateActivityByIdSchema }),
  (req, res) => {
    // #swagger.summary = 'update an activity by id'
    const activity = Activity(
      req.body.id,
      req.body.name,
      req.body.description,
      req.body.duration
    );
    update(activity)
      .then((activity) => {
        res.status(200).json({
          staus: 200,
          messages: "Activity updated",
          activity: activity,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

// activities xml upload
activityController.post(
  "/activities/upload/xml",
  (req, res) => {
    if (req.files && req.files["xml-file"]) {
      // Access the XML file as a string
      const XMLFile = req.files["xml-file"];
      const file_text = XMLFile.data.toString();

      // Set up XML parser
      const parser = new xml2js.Parser();
      parser
        .parseStringPromise(file_text)
        .then((data) => {
          const activityUpload = data["activity-upload"];
          const activityUploadAttributes =
            activityUpload["$"];
          const operation =
            activityUploadAttributes["operation"];
          // Slightly painful indexing to reach nested children
          const activitiesData =
            activityUpload["activities"][0]["activity"];

          if (operation == "insert") {
            Promise.all(
              activitiesData.map((activityData) => {
                // Convert the xml object into a model object
                const activityModel = Activity(
                  null,
                  activityData.activity_name.toString(),
                  activityData.description.toString(),
                  activityData.duration.toString()
                );
              
                // Return the promise of each creation query
                return create(activityModel);
              })
            )
              .then((results) => {
                res.status(200).json({
                  status: 200,
                  message: "XML Upload insert successful",
                });
              })
              .catch((error) => {
                res.status(500).json({
                  status: 500,
                  message:
                    "XML upload failed on database operation - " +
                    error,
                });
              });
          } else if (operation == "update") {
            Promise.all(
              activitiesData.map((activityData) => {
                // Convert the xml object into a model object
                console.log(activityData);
                const activityModel = Activity(
                  activityData.id,
                  activityData.activity_name.toString(),
                  activityData.description.toString(),
                  activityData.duration.toString()
                );
                // Return the promise of each creation query
                return update(activityModel);
              })
            )
              .then((results) => {
                res.status(200).json({
                  status: 200,
                  message: "XML Upload update successful",
                });
              })
              .catch((error) => {
                res.status(500).json({
                  status: 500,
                  message:
                    "XML upload failed on database operation - " +
                    error,
                });
              });
          } else {
            res.status(400).json({
              status: 400,
              message:
                "XML Contains invalid operation attribute value",
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            status: 500,
            message: "Error parsing XML - " + error,
          });
        });
    } else {
      res.status(400).json({
        status: 400,
        message: "No file selected",
      });
    }
  }
);

export default activityController;
