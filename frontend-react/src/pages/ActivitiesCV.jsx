import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllActivities } from "../api/activities";
import Nav from "../components/Nav";
import TopBar from "../components/TopBar";

export default function MemberActivities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getAllActivities().then((activities) =>
      setActivities(activities)
    );
  }, []);

  return (
    <>
      <TopBar />
      <div className="container grid grid-cols-6 min-h-screen">
        <Nav />
        <div className="container  grid grid-cols-1   col-span-6 md:col-span-5  ">
          <div className="container mx-auto p-4 w-full">
            <h2 className="text-center text-3xl mb-4">
              Activities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-slate-100 rounded-xl shadow-xl p-4 flex flex-col md:flex-row"
                >
                  <div className="md:w-1/3">
                    <img
                      src={
                        "../src/assets/" +
                        activity.name +
                        ".jpg"
                      }
                      alt={activity.name}
                      className="w-full h-64 object-cover mb-4 md:mb-0 md:mr-4 rounded"
                    />
                  </div>
                  <div className="md:w-2/3 md:ml-5">
                    <h3 className="text-xl font-semibold mb-2">
                      {activity.name}
                    </h3>
                    <p>
                      <strong>Duration:</strong>{" "}
                      {activity.duration}
                    </p>
                    <p className="text-sm mt-2">
                      {activity.description}
                    </p>

                    <button className="bg-blue-600 text-white py-1 px-4 rounded mt-4 hover:bg-blue-700 transition duration-200">
                      <Link to="/classbooking">
                        Book Now
                      </Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
