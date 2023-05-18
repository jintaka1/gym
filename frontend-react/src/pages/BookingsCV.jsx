import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getAllClassInfo } from "../api/classes";
import { createBooking } from "../api/bookings";
import Nav from "../components/Nav";
import "../assets/calendarCSS.css";
import { useAuthentication } from "../hooks/authentication";
import RunningManLoader from "../components/Processing";
import { formatDate } from "../components/FormatDate";
import TopBar from "../components/TopBar";
const ClassBooking = () => {
  const [value, setValue] = useState(new Date());
  const [classes, setClasses] = useState([]);

  const [user] = useAuthentication();
  //booking modal
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  //confirm booking modal
  const handleBookingClick = (cls) => {
    //reset booking status
    setBookingStatus(null);
    setSelectedClass(cls);
    setShowModal(true);
  };
  // booking confirm button and create booking
  const [bookingStatus, setBookingStatus] = useState(null);
  const handleConfirmBooking = async () => {
    const userID = user.id;
    const booking = {
      classID: selectedClass.class_id,
      userID: userID,
    };
    //add booking processing
    setBookingStatus("processing");
    setTimeout(async () => {
      console.log("Trying to create a booking..."); // Add this line
      //create booking, await is important///

      const newBooking = await createBooking(booking);
      if (newBooking) {
        setBookingStatus("confirmed");
      } else {
        setBookingStatus("failed");
      }
    }, 2000);
  };

  const handleCloseBookingModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    getAllClassInfo().then((classes) => {
      setClasses(classes);
    });
  }, []);
  // calendar function
  const getClassesOnDate = (date) => {
    const formattedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .split("T")[0];
    return classes.filter(
      (cls) =>
        cls.class_datetime.split("T")[0] === formattedDate
    );
  };

  const onChange = (date) => {
    setValue(date);
  };

  const classesOnSelectedDate = getClassesOnDate(value);

  return (
    <>
      <TopBar />
      <div className="container grid grid-cols-6 min-h-screen">
        <Nav />
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 col-span-6 md:col-span-5 py-8 px-4">
        <div className="md:mr-2 ">
          <Calendar
            onChange={onChange}
            value={value}
            tileContent={({ date, view }) =>
              view === "month" &&
              getClassesOnDate(date).length > 0 ? (
                <div className="bg-green-500 text-white text-xs rounded p-1 mt-6">
                  Classes
                </div>
              ) : null
            }
          />
        </div>
        <div className="w-full md:w-4/5  sm:mx-3">
          <h2 className="text-center text-lg font-bold ">
            Available Classes
          </h2>
          <ul className="space-y-4">
            {classesOnSelectedDate.map((cls) => (
              <li
                key={cls.class_id}
                className="bg-sky-50  rounded-lg border-1  shadow-xl p-4"
              >
                <h3 className="text-lg font-semibold mb-2 underline">
                  <Link to="/memberactivities">
                    {" "}
                    {cls.activity_name}
                  </Link>
                </h3>
                <p>
                  Time: {formatDate(cls.class_datetime)}
                </p>
                <p>
                  Duration: {cls.activity_duration}
                </p>
                <p>
                  Location: {cls.room_location}, Room{" "}
                  {cls.room_number}
                </p>
                <p>
                  Trainer: {cls.trainer_firstname}{" "}
                  {cls.trainer_lastname}
                </p>
                <button
                  className="bg-blue-600 text-white py-1 px-4 rounded mt-4 hover:bg-blue-700 transition duration-200"
                  onClick={() => handleBookingClick(cls)}
                >
                  Book
                </button>
              </li>
            ))}
          </ul>
        </div>
        {showModal && selectedClass && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
                onClick={handleCloseBookingModal}
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      {bookingStatus === "processing" && (
                        <div>
                          <RunningManLoader />
                        </div>
                      )}
                      {bookingStatus === "confirmed" && (
                        <div>
                          <p>Booking confirmed!</p>
                        </div>
                      )}
                      {bookingStatus === "failed" && (
                        <div className="flex flex-col h-full justify-between">
                          <p>
                            Sorry, you{" "}
                            <strong>already booked </strong>{" "}
                            your attendency for this class.
                            <br />
                            Please check out our other
                            classes.
                          </p>
                        </div>
                      )}

                      {bookingStatus === null && (
                        <>
                          <h3
                            className="text-xl leading-6 font-medium text-gray-900 "
                            id="modal-headline"
                          >
                            Confirm Booking
                          </h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to book
                              the following class?
                            </p>
                            <p className="mt-2">
                              <strong>
                                Activity Name:
                              </strong>{" "}
                              {selectedClass.activity_name}
                              <br />
                              <strong>
                                Date and Time:
                              </strong>{" "}
                              {formatDate(
                                selectedClass.class_datetime
                              )}
                              <br />
                              <strong>
                                Room Location:
                              </strong>{" "}
                              {selectedClass.room_location}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  {bookingStatus === null && (
                    <>
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={handleConfirmBooking}
                      >
                        Book
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={handleCloseBookingModal}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {(bookingStatus === "confirmed" ||
                    bookingStatus === "failed") && (
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleCloseBookingModal}
                    >
                      Close
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default ClassBooking;
