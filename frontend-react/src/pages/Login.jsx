import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/authentication";

function Login() {
  const navigate = useNavigate();

  const [user, login, logout] = useAuthentication();

  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function onLoginSubmit(e) {
    e.preventDefault();

    setStatusMessage("Logging in...");

    // Add basic regex validation here
    if (
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/.test(
        formData.email
      )
    ) {
      // This code block runs if the email is "invalid"
      setStatusMessage("Invalid email address");
      // The return stops this function here
      return;
    }

    // Attempt to login
    login(formData.email, formData.password)
      .then((result) => {
        setStatusMessage("Login successful");
        navigate("/dashboard");
      })
      .catch((error) => {
        setStatusMessage("Login failed: " + error);
      });
  }

  return (
    <div
      className="bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url(../src/assets/background.jpg)",
      }}
    >
      <div className="absolute bg-gradient-to-b from-green-300 to-green-500 opacity-75 inset-0 z-0 "></div>
      <div className="min-h-screen mx-0 flex flex-row justify-center z-10">
        <div className="hidden sm:flex-col sm:flex  sm:self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="self-start hidden lg:flex flex-col  text-white">
            <h1 className="mb-3 font-bold text-5xl">
              Hi! Welcome to High Street Gym
            </h1>
            <p className="pr-3">
              High Street Gym is a vibrant, modern fitness
              facility located in the heart of the city,
              offering a wide range of exercise options to
              cater to the diverse needs of its members.
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center mx-0 z-10 ">
          <form
            className="p-12 bg-white mx-2 rounded-2xl w-100 sm:mx-auto "
            onSubmit={onLoginSubmit}
          >
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">
                High Street Gym
              </h3>
              <p className="text-gray-500">
                Please sign in to your account.
              </p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Email
                </label>
                <input
                  className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="email"
                  placeholder="mail@gmail.com"
                  pattern="^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((existing) => {
                      return {
                        ...existing,
                        email: e.target.value,
                      };
                    });
                  }}
                />
                <label className="label">
                  <span className="label-text-alt">
                    Validation Text
                  </span>
                  <span className="label-text-alt">
                    {formData.email}
                  </span>
                </label>
              </div>
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                  Password
                </label>
                <input
                  className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData((existing) => {
                      return {
                        ...existing,
                        password: e.target.value,
                      };
                    });
                  }}
                />
                <label className="label">
                  <span className="label-text-alt">
                    Validation Text
                  </span>
                  <span className="label-text-alt">
                    {formData.password}
                  </span>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Log in
                </button>
                <button
                  type="button"
                  className="w-full flex justify-center bg-blue-400  hover:bg-blue-500 text-gray-100 p-3 mt-4 rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </button>
                <label className="label">
                  <span className="label-text-alt">
                    {statusMessage}
                  </span>
                </label>
              </div>
            </div>
            <div className="pt-5 text-center text-gray-400 text-xs">
              <span>
                Copyright © 2023
                <a
                  href=""
                  rel=""
                  target="_blank"
                  className="text-green hover:text-green-500 mx-3"
                >
                  High Street Gym
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
