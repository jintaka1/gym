import { useEffect, useState } from "react";
import {
  getUserByID,
  updateUser,
  deleteUser,
  createUser,
} from "../api/user";

export default function UserEdit({
  userID,
  onSave,
  allowEditRole,
  deleteFunction,
}) {
  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    authenticationKey: null,
  });
  const [statusMessage, setStatusMessage] = useState("");
  //delete confirmation
  const [
    showDeleteConfirmation,
    setShowDeleteConfirmation,
  ] = useState(false);

  useEffect(() => {
    if (userID) {
      getUserByID(userID).then((user) => {
        setFormData(user);
      });
    }
  }, [userID]);

  //update user
  function saveUser(e) {
    e.preventDefault();
    setStatusMessage("Saving...");
    updateUser(formData).then((result) => {
      setStatusMessage(result.message);

      if (typeof onSave === "function") {
        onSave();
      }
    });
  }
  //create user
  function addUser(e) {
    e.preventDefault();
    setStatusMessage("Creating...");
    createUser(formData).then((result) => {
      setStatusMessage(result.message);

      if (typeof onSave === "function") {
        onSave();
      }
    });

    setTimeout(() => {
      setStatusMessage("");
    }, 2000);
  }

  function deletefunction(e) {
    e.preventDefault();
    setShowDeleteConfirmation(true);
  }

  return (
    <div>
      <form
        className="flex-grow m-4 max-w-2xl"
        onSubmit={userID ? saveUser : addUser}
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            placeholder="Jane"
            className="input input-bordered w-full"
            value={formData.firstName}
            onChange={(e) =>
              setFormData((existing) => {
                return {
                  ...existing,
                  firstName: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            placeholder="Doe"
            className="input input-bordered w-full"
            value={formData.lastName}
            onChange={(e) =>
              setFormData((existing) => {
                return {
                  ...existing,
                  lastName: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Role</span>
          </label>
          <select
            className="select select-bordered"
            value={formData.role}
            onChange={(e) =>
              setFormData((existing) => {
                return {
                  ...existing,
                  role: e.target.value,
                };
              })
            }
            disabled={!allowEditRole}
          >
            <option disabled selected>
              Pick one
            </option>
            <option value="admin">Admin</option>
            <option value="trainer">Trainer</option>
            <option value="member">Member</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="user@server.tld"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={(e) =>
              setFormData((existing) => {
                return {
                  ...existing,
                  email: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered w-full"
            value={formData.password}
            onChange={(e) =>
              setFormData((existing) => {
                return {
                  ...existing,
                  password: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="phone"
            placeholder="phone"
            className="input input-bordered w-full"
            value={formData.phone}
            onChange={(e) =>
              setFormData((existing) => {
                return {
                  ...existing,
                  phone: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <input
            type="address"
            placeholder="address"
            className="input input-bordered w-full"
            value={formData.address}
            onChange={(e) =>
              setFormData((existing) => {
                return {
                  ...existing,
                  address: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="my-2">
          <div className="flex ">
            {userID ? (
              <button className="btn btn-primary mr-2">
                Save
              </button>
            ) : (
              <button className="btn btn-primary mr-2">
                create
              </button>
            )}
            {deleteFunction && (
              <button
                className="btn btn-secdonary mr-2 "
                onClick={deletefunction}
              >
                Delete
              </button>
            )}
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
              Delete User
            </h3>
            <p>
              Are you sure you want to delete this user?
            </p>
            <div className="mt-4">
              <button
                className="btn btn-danger mr-2"
                onClick={async () => {
                  setStatusMessage("Deleting...");
                  await deleteUser(formData.id);
                  setStatusMessage("User deleted.");
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
