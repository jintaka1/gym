import { Router } from "express";
import { validate } from "../middleware/validator.js";
import xml2js from "xml2js";
import auth from "../middleware/auth.js";
import {
  Room,
  getAll,
  getById,
  create,
  remove,
  update,
} from "../models/rooms.js";

const roomController = Router();

// get all rooms
roomController.get("/rooms", (req, res) => {
  // #swagger.summary = 'get all rooms'
  getAll()
    .then((rooms) => {
      res.status(200).json({
        status: 200,
        messages: "All rooms",
        rooms: rooms,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// get a room by id
const getRoomByIdSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
  },
};

roomController.get(
  "/rooms/:id",
  validate({ params: getRoomByIdSchema }),
  (req, res) => {
    // #swagger.summary = 'get a room by id'
    const roomID = req.params.id;
    getById(roomID)
      .then((room) => {
        res.status(200).json({
          status: 200,
          messages: "Room found",
          room: room,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

// create a new room
const createRoomSchema = {
  type: "object",
  properties: {
    room_location: {
      type: "string",
    },
    room_number: {
      type: "string",
    },
  },
};

roomController.post(
  "/rooms",
  validate({ body: createRoomSchema }),
  (req, res) => {
    // #swagger.summary = 'create a new room'
    const room = Room(
      null,
      req.body.room_location,
      req.body.room_number
    );
    create(room)
      .then((newRoom) => {
        res.status(200).json({
          status: 200,
          messages: "Room created",
          room: newRoom,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

// delete a room by id
const deleteRoomByIdSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
  },
};

roomController.delete(
  "/rooms/:id",
  validate({ params: deleteRoomByIdSchema }),
  (req, res) => {
    // #swagger.summary = 'delete a room by id'
    const roomID = req.params.id;
    remove(roomID)
      .then((deletedRoom) => {
        res.status(200).json({
          status: 200,
          messages: "Room deleted",
          room: deletedRoom,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

// update a room by id
const updateRoomByIdSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    room_location: {
      type: "string",
    },
    room_number: {
      type: "string",
    },
  },
};

roomController.put(
  "/rooms/",
  validate({ body: updateRoomByIdSchema }),
  (req, res) => {
    // #swagger.summary = 'update a room by id'
    const room = Room(
      req.body.id,
      req.body.room_location,
      req.body.room_number
    );
    update(room)
      .then((updatedRoom) => {
        res.status(200).json({
          status: 200,
          messages: "Room updated",
          room: updatedRoom,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

// rooms xml upload
roomController.post("/rooms/upload/xml", (req, res) => {
  if (req.files && req.files["xml-file"]) {
    // Access the XML file as a string
    const XMLFile = req.files["xml-file"];
    const file_text = XMLFile.data.toString();

    // Set up XML parser
    const parser = new xml2js.Parser();
    parser
      .parseStringPromise(file_text)
      .then((data) => {
        const roomUpload = data["room-upload"];
        const roomUploadAttributes = roomUpload["$"];
        const operation = roomUploadAttributes["operation"];
        // Slightly painful indexing to reach nested children
        const roomsData = roomUpload["rooms"][0]["room"];

        if (operation == "insert") {
          Promise.all(
            roomsData.map((roomData) => {
              // Convert the xml object into a model object
              const roomModel = Room(
                null,
                roomData.location.toString(),
                roomData.room_number
              );
              // Return the promise of each creation query
              return create(roomModel);
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
            roomsData.map((roomData) => {
              // Convert the xml object into a model object
              console.log(roomData);
              const roomModel = Room(
                roomData.id,
                roomData.location.toString(),
                roomData.room_number
              );
              // Return the promise of each creation query
              return update(roomModel);
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
});

export default roomController;
