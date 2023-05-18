import { useEffect, useState } from "react";
import {
  getAllRooms,
  createRoom,
  deleteRoom,
} from "../api/rooms";
import Nav from "../components/Nav";
import { XMLUpload } from "../components/XMLUpload";
import TopBar from "../components/TopBar";

export default function Rooms() {
  const [refreshTrigger, setRefreshTrigger] = useState();
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  //add room
  const [roomLocation, setRoomLocation] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  //delete modal
  const [
    showDeleteConfirmation,
    setShowDeleteConfirmation,
  ] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  useEffect(() => {
    getAllRooms().then((rooms) => setRooms(rooms));
  }, [refreshTrigger]);
  //add room
  const handleAddRoom = async (e) => {
    e.preventDefault();
    const roomLocation = e.target.roomLocation.value;
    const roomNumber = e.target.roomNumber.value;
    try {
      const newRoom = {
        room_location: roomLocation,
        room_number: roomNumber,
      };
      await createRoom(newRoom);
      setShowModal(false);
      setRoomLocation("");
      setRoomNumber("");
      // Refresh room list
      getAllRooms().then((rooms) => setRooms(rooms));
    } catch (error) {
      console.error("Error adding room:", error);
    }
    setShowModal(false);
  };
  //delete
  const handleDeleteClick = (room) => {
    setRoomToDelete(room);
    setShowDeleteConfirmation(true);
  };

  return (
    <>
      <TopBar />
      <div className="container grid grid-cols-6 ">
        <Nav />
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 col-span-6 md:col-span-5 py-8 px-4">
          <div className="rounded border-2 border-primary p-2">
            <h2 className="text-2xl font-semibold mb-4">
              All Rooms
            </h2>

            <div className="overflow-x-auto">
              <table className="table table-compact w-full">
                <thead>
                  <th>ID</th>
                  <th>Location</th>
                  <th>Number</th>
                  <th>Delete</th>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.id}>
                      <td>{room.id}</td>
                      <td>{room.room_location}</td>
                      <td>{room.room_number}</td>
                      <button
                        className="btn btn-xs btn-danger mt-1 ml-1"
                        onClick={() =>
                          handleDeleteClick(room)
                        }
                      >
                        Delete
                      </button>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex ">
              <button
                className="btn bg-blue-600 text-white py-1 px-4 rounded mt-4 hover:bg-blue-700 transition duration-200"
                onClick={() => setShowModal(true)}
              >
                Add New Room
              </button>
            </div>
          </div>
          <div className="rounded border-2 border-primary  min-h-16 p-2">
            <h2 className="text-center">Upload Rooms</h2>
            <XMLUpload
              page="rooms"
              onUploadSuccess={() => {
                getAllRooms().then((rooms) =>
                  setRooms(rooms)
                );
              }}
            />
          </div>
        </div>
        {showModal && (
          <div
            className="fixed z-50 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <form onSubmit={handleAddRoom}>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-title"
                        >
                          Add New Room
                        </h3>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="roomLocation"
                            placeholder="Room Location"
                            className="border p-2 w-full rounded-md"
                            required
                          />
                          <input
                            type="text"
                            name="roomNumber"
                            placeholder="Room Number"
                            className="border p-2 w-full mt-2 rounded-md"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Add Room
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary mr-2"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h3 className="text-xl font-bold">
                Delete Room
              </h3>
              <p>
                Are you sure you want to delete this room?
              </p>
              <div className="mt-4">
                <button
                  className="btn btn-danger mr-2"
                  onClick={async () => {
                    await deleteRoom(roomToDelete.id); // Pass the room ID
                    setShowDeleteConfirmation(false);
                    setRefreshTrigger(!refreshTrigger);
                  }}
                >
                  Confirm
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setShowDeleteConfirmation(false)
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
