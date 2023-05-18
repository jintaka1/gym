import { db } from "../database.js";

// bookings model constructor
export function Booking(id, userID, classID, datetime) {
  return {
    id,
    userID,
    classID,
    datetime,
  };
}

// create a new booking
export async function create(booking) {
  delete booking.id;
  return db
    .query(
      "INSERT INTO bookings (booking_user_id, booking_class_id, booking_created_datetime) VALUES (?, ?, ?)",
      [booking.userID, booking.classID, booking.datetime]
    )
    .then(([results]) => {
      return { ...Booking, id: results.insertId };
    });
}

//get all bookings
export async function getAll() {
  //get the collection of bookings
  const [allBookingsResults] = await db.query(
    "SELECT * FROM bookings"
  );
  return await allBookingsResults.map((booking) =>
    Booking(
      booking.booking_id,
      booking.booking_user_id,
      booking.booking_class_id,
      booking.booking_created_datetime
    )
  );
}
//get all bookings with class name and user name and sort by class datetime
export async function getAllBookingsWithClassNameAndUserName() {
  // Get the collection of bookings with class name and user name
  const [allBookingsResults] = await db.query(
    `SELECT b.booking_id, b.booking_user_id, b.booking_class_id, b.booking_created_datetime,
        c.class_id, c.class_datetime, c.class_activity_id, c.class_trainer_user_id, c.class_room_id,
        u.user_id, u.user_firstname, u.user_lastname,u.user_email, u.user_phone,
        a.activity_id, a.activity_name,
        t.user_id AS trainer_id, t.user_firstname AS trainer_firstname, t.user_lastname AS trainer_lastname,
        r.room_id, r.room_location, r.room_number
 FROM bookings AS b
 INNER JOIN users AS u ON b.booking_user_id = u.user_id
 INNER JOIN classes AS c ON b.booking_class_id = c.class_id
 INNER JOIN activities AS a ON c.class_activity_id = a.activity_id
 INNER JOIN users AS t ON c.class_trainer_user_id = t.user_id
 INNER JOIN rooms AS r ON c.class_room_id = r.room_id
 ORDER BY c.class_datetime ASC`
  );
  return await allBookingsResults.map((booking) => ({
    id: booking.booking_id,
    userID: booking.booking_user_id,
    user_firstname: booking.user_firstname,
    user_lastname: booking.user_lastname,
    user_email: booking.user_email,
    user_phone: booking.user_phone,
    create_datetime: booking.booking_created_datetime,
    classID: booking.booking_class_id,
    class_datetime: booking.class_datetime,
    class_activity_name: booking.activity_name,
    class_trainer_firstname: booking.trainer_firstname,
    class_trainer_lastname: booking.trainer_lastname,
    class_room_location: booking.room_location,
    class_room_number: booking.room_number,
  }));
}
// get bookings details by user id
export async function getBookingDetailsByUserID(userID) {
  const [bookingDetails] = await db.query(
    `SELECT b.booking_id, b.booking_user_id, b.booking_class_id, b.booking_created_datetime,
        c.class_id, c.class_datetime, c.class_activity_id, c.class_trainer_user_id, c.class_room_id,
        u.user_id, u.user_firstname, u.user_lastname,u.user_email, u.user_phone,
        a.activity_id, a.activity_name,
        t.user_id AS trainer_id, t.user_firstname AS trainer_firstname, t.user_lastname AS trainer_lastname,
        r.room_id, r.room_location, r.room_number
 FROM bookings AS b
 INNER JOIN users AS u ON b.booking_user_id = u.user_id
 INNER JOIN classes AS c ON b.booking_class_id = c.class_id
 INNER JOIN activities AS a ON c.class_activity_id = a.activity_id
 INNER JOIN users AS t ON c.class_trainer_user_id = t.user_id
 INNER JOIN rooms AS r ON c.class_room_id = r.room_id
 WHERE b.booking_user_id = ?`,
    [userID]
  );
  return await bookingDetails.map((booking) => ({
    id: booking.booking_id,
    userID: booking.booking_user_id,
    user_firstname: booking.user_firstname,
    user_lastname: booking.user_lastname,
    user_email: booking.user_email,
    user_phone: booking.user_phone,
    create_datetime: booking.booking_created_datetime,
    classID: booking.booking_class_id,
    class_datetime: booking.class_datetime,
    class_activity_name: booking.activity_name,
    class_trainer_firstname: booking.trainer_firstname,
    class_trainer_lastname: booking.trainer_lastname,
    class_room_location: booking.room_location,
    class_room_number: booking.room_number,
  }));
}
// get bookings by user id
export async function getByUserID(userID) {
  //get the collection of bookings
  const [allBookingsResults] = await db.query(
    "SELECT * FROM bookings WHERE booking_user_id = ?",
    [userID]
  );
  return await allBookingsResults.map((booking) =>
    Booking(
      booking.booking_id,
      booking.booking_user_id,
      booking.booking_class_id,
      booking.booking_created_datetime
    )
  );
}

//get a booking by id
export async function getById(bookingID) {
  const [bookingResults] = await db.query(
    "SELECT * FROM bookings WHERE booking_id = ?",
    [bookingID]
  );
  if (bookingResults.length > 0) {
    const booking = bookingResults[0];
    return Promise.resolve(
      Booking(
        booking.booking_id,
        booking.booking_user_id,
        booking.booking_class_id,
        booking.booking_created_datetime
      )
    );
  } else {
    return Promise.reject("No booking found");
  }
}

//update a booking
export async function update(booking) {
  return db.query(
    "UPDATE bookings SET booking_user_id = ?, booking_class_id = ?, booking_created_datetime = ? WHERE booking_id = ?",
    [
      booking.userID,
      booking.classID,
      booking.datetime,
      booking.id,
    ]
  );
}

//delete a booking
export async function remove(bookingID) {
  return db.query(
    "DELETE FROM bookings WHERE booking_id = ?",
    [bookingID]
  );
}
