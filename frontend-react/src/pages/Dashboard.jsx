import Nav from "../components/Nav";
import { useState, useEffect } from "react";
import Processing from "../components/Processing";
import { useAuthentication } from "../hooks/authentication";
import UserEdit from "../components/UserEdit";
import {
  getBookingDetailsByUserID,
  deleteBooking,
} from "../api/bookings";
import TopBar from "../components/TopBar";
import { formatDate } from "../components/FormatDate";

function Dashboard() {
  const [user] = useAuthentication();
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    if (user) {
      getBookingDetailsByUserID(user.id).then((data) => {
        setBookings(data);
      });
    }
  }, [user]);
  const [showCancelModal, setShowCancelModal] =
    useState(false);
  const [bookingToCancel, setBookingToCancel] =
    useState(null);
  //cancel booking
  function handleCancelClick(bookingID) {
    setBookingToCancel(bookingID);
    setShowCancelModal(true);
  }

  return (
    <>
      <TopBar />
      <div className="container grid grid-cols-6 ">
        <Nav />
        {user ? (
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 col-span-6 md:col-span-5 py-8 px-4">
            {bookings.length > 0 && (
              <div className="rounded-xl   min-h-16 p-2 bg-slate-100 shadow-xl">
                <h2 className="text-center text-xl font-bold">My Bookings</h2>
                {bookings.map((booking) => (
                  <div className="rounded-lg border-1 shadow-xl bg-sky-50 p-4 flex flex-wrap flex-col mt-6 ">
                    <div className="flex justify-between">
                      <span className="font-semibold">
                        Class Time:
                      </span>
                      <span>{formatDate(booking.class_datetime)}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="font-semibold">Class Activity:</span>
                    <span>{booking.class_activity_name}</span>
                  </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">
                        Trainer:
                      </span>
                      <span>
                        {booking.class_trainer_firstname}{" "}
                        {booking.class_trainer_lastname}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">
                        Class Room:
                      </span>
                      <span>
                        {booking.class_room_location}-{booking.class_room_number}
                      </span>
                    </div>
                    <div className="felx justify-end ">
                      <button
                        className="btn  btn-sm"
                        onClick={() =>
                          handleCancelClick(booking.id)
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="rounded-xl min-h-16 p-2 bg-slate-100 shadow-xl">
              <h2 className="text-center text-xl font-bold">My Account</h2>
              {/* User details form with update button here */}
              <UserEdit
              deleteFunction={false}
                userID={user.id}
                allowEditRole={user.role == "admin"}
              />
            </div>
          </div>
        ) : (
          <Processing />
        )}
        {showCancelModal && (
          <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h3 className="text-xl font-bold">
                Cancel Booking
              </h3>
              <p>
                Are you sure you want to cancel this
                booking?
              </p>
              <div className="mt-4">
                <button
                  className="btn btn-danger mr-2"
                  onClick={async () => {
                    await deleteBooking(bookingToCancel);
                    setShowCancelModal(false);
                    if (user) {
                      getBookingDetailsByUserID(
                        user.id
                      ).then((data) => {
                        setBookings(data);
                      });
                    }
                  }}
                >
                  Confirm
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowCancelModal(false)}
                >
                  NO
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Dashboard;
