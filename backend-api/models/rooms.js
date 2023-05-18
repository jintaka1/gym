import { db } from "../database.js";

// rooms model constructor
export function Room(id, room_location, room_number) {
  return {
    id,
    room_location,
    room_number,
  };
}

// create a new room
export async function create(room) {
  delete room.id;
  return db
    .query(
      "INSERT INTO rooms (room_location, room_number, room_exist) VALUES (?, ?,1)",
      [room.room_location, room.room_number]
    )
    .then(([results]) => {
      return { ...Room, id: results.insertId };
    });
}

// get all rooms
export async function getAll() {
  // get the collection of rooms
  const [allRoomsResults] = await db.query("SELECT * FROM rooms WHERE room_exist = 1");
  return await allRoomsResults.map((room) =>
    Room(room.room_id, room.room_location, room.room_number)
  );
}

// get a room by id
export async function getById(roomID) {
  const [roomResults] = await db.query("SELECT * FROM rooms WHERE room_id = ?", [
    roomID,
  ]);
  if (roomResults.length > 0) {
    const room = roomResults[0];
    return Promise.resolve(
      Room(room.room_id, room.room_location, room.room_number)
    );
  } else {
    return Promise.reject("No room found");
  }
}

// update a room
export async function update(room) {
  return db.query(
    "UPDATE rooms SET room_location = ?, room_number = ? WHERE room_id = ?",
    [room.room_location, room.room_number, room.id]
  );
}

// delete a room
export async function remove(roomID) {
  return db.query("UPDATE rooms SET room_exist= 0 WHERE room_id = ?", [roomID]);
}