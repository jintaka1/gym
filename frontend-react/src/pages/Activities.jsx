import { useEffect, useState } from "react";
import {
  getAllActivities,
  createActivity,
  deleteActivity,
} from "../api/activities";
import Nav from "../components/Nav";
import { XMLUpload } from "../components/XMLUpload";
import { AiOutlineEye } from "react-icons/ai";
import TopBar from "../components/TopBar";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [refreshTrigger, setRefreshTrigger] =
    useState(false);
  const [showModal, setShowModal] = useState(false);
  const [
    showDeleteConfirmation,
    setShowDeleteConfirmation,
  ] = useState(false);
  const [activityToDelete, setActivityToDelete] =
    useState(null);

  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] =
    useState("");
  const [activityDuration, setActivityDuration] =
    useState("");

  useEffect(() => {
    getAllActivities().then((activities) =>
      setActivities(activities)
    );
  }, [refreshTrigger]);
  //view activity
  const [showActivityModal, setShowActivityModal] =
    useState(false);
  const [selectedActivity, setSelectedActivity] =
    useState(null);
  function handleViewActivityClick(activity) {
    setSelectedActivity(activity);
    setShowActivityModal(true);
  }
  // add activity
  const handleAddActivity = async (e) => {
    e.preventDefault();
    const newActivity = {
      name: activityName,
      description: activityDescription,
      duration: activityDuration,
    };
    try {
      await createActivity(newActivity);
      setShowModal(false);
      setActivityName("");
      setActivityDescription("");
      setActivityDuration("");
      setRefreshTrigger(!refreshTrigger);
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };
  //delete activity
  const handleDeleteClick = (activity) => {
    setActivityToDelete(activity);
    setShowDeleteConfirmation(true);
  };

  return (
    <>
     <TopBar />
      <div className="container grid grid-cols-6 ">
        <Nav />
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 col-span-6 md:col-span-5 py-8 px-4">
        <div className="rounded border-2 border-primary p-2">
          <h2 className="text-2xl font-semibold mb-4">All Activities</h2>
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <th>View</th>
                <th>ID</th>
                <th>Name</th>
                <th>Duration</th>
                <th>Description</th>
                <th>Delete</th>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <div>
                      <button
                        className="p-2 ml-2"
                        onClick={() =>
                          handleViewActivityClick(activity)
                        }
                      >
                        <AiOutlineEye size={25} />
                      </button>
                    </div>
                    <td>{activity.id}</td>
                    <td>{activity.name}</td>
                    <td>{activity.duration}</td>
                    <td>
                      {activity.description.slice(0, 25)}...
                    </td>

                    <td>
                      <button
                        className="btn btn-xs btn-danger"
                        onClick={() =>
                          handleDeleteClick(activity)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex">
            <button
               className="btn bg-blue-600 text-white py-1 px-4 rounded mt-4 hover:bg-blue-700 transition duration-200"
              onClick={() => setShowModal(true)}
            >
              Add New Activity
            </button>
          </div>
        </div>
        {showActivityModal && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      {selectedActivity && (
                        <div>
                          <div className="mt-2">
                            <strong className="font-semibold">
                              Activity:
                            </strong>
                            <p>{selectedActivity.name}</p>
                          </div>
                          <div className="mt-2">
                            <strong className="font-semibold">
                              Duration:
                            </strong>
                            <p>
                              {selectedActivity.duration}
                            </p>
                          </div>
                          <div className="mt-2">
                            <span className="font-semibold">
                              Activity:
                            </span>
                            <p>
                              {selectedActivity.description}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      setShowActivityModal(false)
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="rounded border-2 border-primary  min-h-16 p-2">
          <h2 className="text-center">Upload Activities</h2>
          <XMLUpload
            page="activities"
            onUploadSuccess={() => {
              getAllActivities().then((activities) =>
                setActivities(activities)
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
              <form onSubmit={handleAddActivity}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        Add New Activity
                      </h3>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="activityName"
                          placeholder="Activity Name"
                          value={activityName}
                          onChange={(e) =>
                            setActivityName(e.target.value)
                          }
                          className="border p-2 w-full rounded-md "
                          required
                        />
                        <input
                          type="text"
                          name="activityDuration"
                          placeholder="Activity Duration"
                          value={activityDuration}
                          onChange={(e) =>
                            setActivityDuration(
                              e.target.value
                            )
                          }
                          className="border p-2 w-full mt-2 rounded-md "
                          required
                        />
                        <textarea
                          type="text"
                          name="activityDescription"
                          placeholder="Activity Description"
                          value={activityDescription}
                          onChange={(e) =>
                            setActivityDescription(
                              e.target.value
                            )
                          }
                          className="textarea textarea-bordered p-2 w-full mt-2"
                          style={{ height: "200px" }}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add Activity
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
              Delete Activity
            </h3>
            <p>
              Are you sure you want to delete this activity?
            </p>
            <div className="mt-4">
              <button
                className="btn btn-danger mr-2"
                onClick={async () => {
                  await deleteActivity(activityToDelete.id);
                  setShowDeleteConfirmation(false);
                  setRefreshTrigger(!refreshTrigger);
                }}
              >
                Confirm
              </button>
              <button
                className="btn mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
