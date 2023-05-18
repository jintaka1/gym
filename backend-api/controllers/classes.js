import { Router } from "express";
import { validate } from "../middleware/validator.js";
import {Class,getAll,getById,create,remove, update, getAllClassInfo } from "../models/classes.js";

const classController = Router();

//get all classes

classController.get("/classes",
    (req, res) => {
        // #swagger.summary = 'get all classes'
        getAll().then((classes) => {
            res.status(200).json({
                staus:200,
                messages:"All classes",
                classes:classes});
              
        }
        ).catch((err) => {
            res.status(500).json(err);
        }
        );
    }
);
//get classes with all details
classController.get("/classes/details",
    (req, res) => {
        // #swagger.summary = 'get classes with all details'
        getAllClassInfo().then((classes) => {
            res.status(200).json({
                staus:200,
                messages:"All classes",
                classes:classes});

        }
        ).catch((err) => {
            res.status(500).json(err);
        }
        );
    }
);


//get a class by id
const getClassByIdSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",

        },
    }
    };

classController.get("/classes/:id",
validate({params:getClassByIdSchema}),
(req, res) => {
    // #swagger.summary = 'get a class by id'
    const classID = req.params.id;
    getById(classID).then((classes) => {
        res.status(200).json({
            staus:200,
            messages:"Class found",
            classes:classes});
    }   

    ).catch((err) => {
        res.status(500).json(err);
    }
    );
}
);

//create a new class
const createClassSchema = {
    type: "object",
    properties: {
        datetime: {
            type: "string",
        },
        roomID: {
            type: "string"
        },
        acticityID: {
            type: "string"
        },
        trainerID: {
            type: "string"
        }
    }
    };

classController.post("/classes",
validate({body:createClassSchema}),
(req, res) => {
    // #swagger.summary = 'create a new class'
    const newClassData = req.body;
    const newClass = Class(
        null,
        newClassData.datetime,
        newClassData.roomID,
        newClassData.activityID,
        newClassData.trainerID
    );
    create(newClass).then((classes) => {
        res.status(200).json({
            staus:200,
            message:"Class created",
            classes:classes});
    }
    ).catch((err) => {
        res.status(500).json(
            {
                staus:500,
                message:"Created class failed, please check your input",
            }
        );
    }
    );
}
);

//delete a class by id
const deleteClassByIdSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",


        },
    }
    };


classController.delete("/classes/:id",
validate({params:deleteClassByIdSchema}),
(req, res) => {
    // #swagger.summary = 'delete a class by id'
    const classID = req.params.id;
    remove(classID).then((classes) => {
        res.status(200).json({
            staus:200,
            messages:"Class deleted",
            classes:classes});
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    );
}
);

//update a class by id
const updateClassByIdSchema = {

    type: "object",
    properties: {
        id: {
            type: "number",

        },
        
    }
    };

classController.patch("/classes/",
validate({body:updateClassByIdSchema}),
(req, res) => {
    // #swagger.summary = 'update a class by id'
    const classobj = Class(
        req.body.id,
        req.body.datetime,
        req.body.roomID,
        req.body.activityID,
        req.body.trainerID
    );
    update(classobj).then(classobj => {
        res.status(200).json({
            staus:200,
            messages:"Class updated",
            classobj:classobj});
    }
    ).catch((err) => {
        res.status(500).json({
            status: 500,
              message: "Failed to update class",
        });

    }
    );
}
);

export default classController;
