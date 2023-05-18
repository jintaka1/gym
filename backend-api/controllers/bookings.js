import { Router } from "express";
import { validate } from "../middleware/validator.js";
import { Booking,getAll,getById,create,remove, update, getAllBookingsWithClassNameAndUserName,getByUserID,getBookingDetailsByUserID } from "../models/bookings.js";

const bookingController = Router();

//get all bookings

bookingController.get("/bookings",
    (req, res) => {
        // #swagger.summary = 'get all bookings'
        getAll().then((bookings) => {
            res.status(200).json({
                staus:200,
                messages:"All bookings",
                bookings:bookings});
        }
        ).catch((err) => {
            res.status(500).json(err);
        }
        );
    }
);
//get all bookings with class name and user name

// Get all bookings with class name and user name, sorted by class_datetime
bookingController.get("/bookings-with-class-user", (req, res) => {
    // #swagger.summary = 'Get all bookings with class name and user name, sorted by class_datetime'
    getAllBookingsWithClassNameAndUserName()
        .then((bookings) => {
            res.status(200).json({
                status: 200,
                message: "All bookings with class name and user name",
                bookings: bookings,
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});
//get bookings details by user id
const getBookingDetailsByUserIdSchema ={
    properties: {
        id: {
            type: "string",

        },
    }
}
bookingController.get("/bookingdetails-by-user/:id",
validate({params:getBookingDetailsByUserIdSchema}),
(req,res)=>{
    // #swagger.summary = 'get booking details by user id'
    const userID =req.params.id;
    getBookingDetailsByUserID(userID).then((bookings)=>{
        res.status(200).json({
            status:200,
            message:"booking deatils found",
            bookings:bookings
        })
    }).catch((err)=>{
        res.status(500).json(err);
    })
})
//get bookings by user id
const getBookingsByUserIdSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",

        },
    }
    };

bookingController.get("/bookings-by-user/:id",
validate({params:getBookingsByUserIdSchema}),
(req, res) => {
    // #swagger.summary = 'get bookings by user id'
    const userID = req.params.id;
    getByUserID(userID).then((bookings) => {
        res.status(200).json({
            staus:200,
            messages:"Bookings found",
            bookings:bookings});
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    );
}
);

//get a booking by id
const getBookingByIdSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",

        },
    }
    };

bookingController.get("/bookings/:id",
validate({params:getBookingByIdSchema}),
(req, res) => {
    // #swagger.summary = 'get a booking by id'
    const bookingID = req.params.id;
    getById(bookingID).then((booking) => {
        res.status(200).json({
            staus:200,
            messages:"Booking found",
            booking:booking});
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    );
}
);

//create a new booking
const createBookingSchema = {
    type: "object",
    properties: {
        userID: {
            type: "number"
        },
        classID: {
            type: "number"
        }
    }
    };

bookingController.post("/bookings",
validate({body:createBookingSchema}),

(req, res) => {
    // #swagger.summary = 'create a new booking'
    const create_datetime = new Date()
    const booking = Booking(
        null,
        req.body.userID,
        req.body.classID,
        create_datetime,
    );
    //check if user has already booked this class
    getByUserID(req.body.userID).then((bookings) => {
        const alreadyBooked = bookings.find(booking => booking.classID === req.body.classID)
        if (alreadyBooked) {
            //throw an error if user has already booked this class
            res.status(409).json({
                status:409,
                messages:"User has already booked this class",
                booking:null});

            
            } else {
    create(booking).then(
        (newBooking) => {
        res.status(200).json({
            status:200,
            messages:"Booking created",
            booking:newBooking});
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    );
}}
)}
);

//delete a booking by id
const deleteBookingByIdSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",

        },
    }
    };

bookingController.delete("/bookings/:id",
validate({params:deleteBookingByIdSchema}),
(req, res) => {
    // #swagger.summary = 'delete a booking by id'
    const bookingID = req.params.id;
    remove(bookingID).then((deletedBooking) => {
        res.status(200).json({
            staus:200,
            messages:"Booking deleted",
            booking:deletedBooking});
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    );
}
);

//update a booking by id
const updateBookingByIdSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",

        },
        userID: {
            type: "string"
        },
        classID: {
            type: "string"
        },
        datetime: {
            type: "string"
        }
    }
    };

bookingController.put("/bookings/",
validate({body:updateBookingByIdSchema}),
(req, res) => {
    // #swagger.summary = 'update a booking by id'
    const booking = Booking(
        req.body.id,
        req.body.userID,
        req.body.classID,
        req.body.datetime
    );
    update(booking).then((updatedBooking) => {
        res.status(200).json({
            staus:200,
            messages:"Booking updated",
            booking:updatedBooking});
            return updatedBooking
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    );
}
);

export default bookingController;