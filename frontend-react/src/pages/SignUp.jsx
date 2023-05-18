import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/authentication";
import { signUpUser } from "../api/user";

export default function SignUp() {
  const navigate = useNavigate();

  const [user, login, logout] = useAuthentication();

  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  function onRegisterSubmit(e) {
    e.preventDefault();
    setStatusMessage("Sign Up...");

    if (
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/.test(
        formData.email
      )
    ) {
      setStatusMessage("Invalid email address");
      return;
    }

    // Register then attempt login
    signUpUser(formData).then((result) => {
      setStatusMessage(result.message);
      login(formData.email, formData.password)
        .then((result) => {
          setStatusMessage(result.message);
          navigate("/dashboard");
        })
        .catch((error) => {
          setStatusMessage("Login failed: " + error);
        });
    });
  }

  return (
    <div
      className="flex relative justify-evenly items-center h-screen w-full bg-center bg-no-repeat bg-cover "
      style={{
        backgroundImage:
          "url(../src/assets/background.jpg)",
      }}
    >
      <div className="absolute bg-gradient-to-b from-green-300 to-green-500 opacity-75 inset-0 z-0 "></div>
      <form
        className="flex-grow m-4 max-w-lg bg-white rounded-2xl p-4 z-50"
        onSubmit={onRegisterSubmit}
      >
        <div className="mb-4">
          <h3 className="font-semibold text-2xl text-gray-800">
            High Street Gym
          </h3>
          <p className="text-gray-500">
            Please sign up your account.
          </p>
        </div>
        <div className="border p-4 rounded-lg shadow-md bg-slate-50">
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                First Name:
              </span>
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
              <span className="label-text">Last Name:</span>
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
              type="text"
              placeholder="1234567890"
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
              type="text"
              placeholder="1234 Main St"
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
            <button className="btn btn-primary mr-2">
              Sign Up
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <label className="label">
              <span className="label-text-alt">
                {statusMessage}
              </span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
