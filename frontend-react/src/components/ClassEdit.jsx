import { useEffect, useState } from "react";
import {
  getClassByID,
  updateClass,
  deleteClass,
  createClass,
} from "../api/classes";
import { getAllActivities } from "../api/activities";
import { getAllRooms } from "../api/rooms";
import { getAllTrainers } from "../api/user";

export default function ClassEdit({
  classID,
  onSave,
  user,
}) {
  const [formData, setFormData] = useState({
    id: null,
    trainer_id: "",
    room_id: "",
    activity_id: "",
    date: "",
    time: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const currentDate = new Date().toISOString().split("T")[0];

  //delete confirmation
  const [
    showDeleteConfirmation,
    setShowDeleteConfirmation,
  ] = useState(false);

  useEffect(() => {
    if (classID) {
      getClassByID(classID).then((classobj) => {
        const dateTime = new Date(classobj.datetime);

        const date = dateTime.toISOString().split("T")[0];
        const hours = dateTime
          .getUTCHours()
          .toString()
          .padStart(2, "0");
        const minutes = dateTime
          .getUTCMinutes()
          .toString()
          .padStart(2, "0");
        const time = `${hours}:${minutes}`;
        setFormData({
          id: classobj.id,
          trainer_id: classobj.trainerID,
          room_id: classobj.roomID,
          activity_id: classobj.activityID,
          date: date,
          time: time,
        });
      });
    } else {
      if (user && user.role === "trainer") {
        setFormData({
          id: null,
          trainer_id: user.id,
          room_id: "",
          activity_id: "",
          date: "",
          time: "",
        });
      } else {
        setFormData({
          id: null,
          trainer_id: "",
          room_id: "",
          activity_id: "",
          date: "",
          time: "",
        });
      }
    }
  }, [classID]);

  // Load trainers
  const [trainers, setTrainers] = useState([]);
  useEffect(() => {
    getAllTrainers().then((trainers) =>
      setTrainers(trainers)
    );
  }, []);

  // Load rooms
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    getAllRooms().then((rooms) => setRooms(rooms));
  }, []);

  // Load activities
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    getAllActivities().then((activities) =>
      setActivities(activities)
    );
  }, []);

  //update class
  function saveClass(e) {
    e.preventDefault();
    setStatusMessage("Updating class...");
    const ClassData = {
      id: classID,
      trainerID: formData.trainer_id,
      roomID: formData.room_id,
      activityID: formData.activity_id,
      datetime: formData.date + " " + formData.time,
    };
    updateClass(ClassData).then((result) => {
      setStatusMessage(result.message);
      setFormData({
        trainer_id: "",
        room_id: "",
        activity_id: "",
        date: "",
        time: "",
      });

      if (typeof onSave === "function") {
        onSave();
      }
    });
  }
  //create class
  function addClass(e) {
    e.preventDefault();
    setStatusMessage("Creating class...");
    const ClassData = {
      trainerID: formData.trainer_id,
      roomID: formData.room_id,
      activityID: formData.activity_id,
      datetime: formData.date + " " + formData.time,
    };
    createClass(ClassData).then((result) => {
      setStatusMessage(result.message);
      setFormData({
        trainer_id: "",
        room_id: "",
        activity_id: "",
        date: "",
        time: "",
      });
      if (typeof onSave === "function") {
        onSave();
      }
      setTimeout(() => {
        setStatusMessage("");
      }, 2000);
    });
  }
  //delete class
  function deletefunction(e) {
    e.preventDefault();
    setShowDeleteConfirmation(true);
  }

  return (
    <div>
      <form
        className="flex-grow m-4 max-w-2xl"
        onSubmit={classID ? saveClass : addClass}
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Trainer</span>
          </label>
          <select
            className="select select-bordered"
            value={formData.trainer_id}
            onChange={(e) =>
              setFormData((existing) => {
                return {
                  ...existing,
                  trainer_id: e.target.value,
                };
              })
            }
            disabled={user?.role !== "admin"}
            required
          >
            <option selected>Trainers</option>
            {trainers.map((trainer) => (
              <option
                key={trainer.trainer_id}
                value={trainer.trainer_id}
              >
                {trainer.trainer_firstname}{" "}
                {trainer.trainer_lastname}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Room</span>
          </label>
          <select
            className="select select-bordered"
            value={formData.room_id}
            onChange={(e) =>
              setFormData((existing) => {
                return {
                  ...existing,
                  room_id: e.target.value,
                };
              })
            }
            required
          >
            <option selected>Pick one</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.room_location}-{room.room_number}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Activity</span>
          </label>
          <select
            className="select select-bordered"
            value={formData.activity_id}
            onChange={(e) =>
              setFormData((existing) => {
                return {
                  ...existing,
                  activity_id: e.target.value,
                };
              })
            }
            required
          >
            <option selected>activitys</option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Date of class
            </span>
          </label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={formData.date}
            min={currentDate}
            onChange={(e) =>
              setFormData((existing) => {
                return {
                  ...existing,
                  date: e.target.value,
                };
              })
            }
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Time of Class
            </span>
          </label>
          <input
            type="time"
            className="input input-bordered w-full"
            value={formData.time}
            onChange={(e) =>
              setFormData((existing) => {
                return {
                  ...existing,
                  time: e.target.value,
                };
              })
            }
            required
          />
        </div>
        <div className="my-2">
          <div className="flex ">
            {classID ? (
              <button
                type="submit"
                className="btn btn-primary mr-2"
              >
                Save
              </button>
            ) : (
              <button
                typr="submit"
                className="btn btn-primary mr-2"
              >
                Create
              </button>
            )}
            <button
              className="btn btn-secdonary mr-2 "
              onClick={deletefunction}
            >
              Delete
            </button>
          </div>
          <label className="label">
            <span className="label-text-alt">
              {statusMessage}
            </span>
          </label>
        </div>
      </form>
      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-bold">
              Delete Class
            </h3>
            <p>
              Are you sure you want to delete this class?
            </p>
            <div className="mt-4">
              <button
                className="btn btn-danger mr-2"
                onClick={async () => {
                  setStatusMessage("Deleting...");
                  await deleteClass(formData.id);
                  setStatusMessage("Class deleted.");
                  if (typeof onSave === "function") {
                    onSave();
                  }
                  setShowDeleteConfirmation(false);
                  setTimeout(() => {
                    setStatusMessage("");
                  }, 2000);
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
  );
}
