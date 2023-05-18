import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import {
  getAllBookingsWithClassNameAndUserName,
  deleteBooking
} from "../api/bookings";
import Nav from "../components/Nav";
import Processing from "../components/Processing";
import BookingDetailsModal from "../components/BookingDetails";
import { AiOutlineEye } from "react-icons/ai";
import { formatDate } from "../components/FormatDate";
import { useAuthentication } from "../hooks/authentication";

export default function BookingCRUD() {
  const [refreshTrigger, setRefreshTrigger] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState(null);
  const [user] = useAuthentication();
  // delete modal
  const [
    showDeleteConfirmation,
    setShowDeleteConfirmation,
  ] = useState(false);
  const [bookingToDelete, setBookingToDelete] =
    useState(null);
  // view booking details
  function handleViewClick(booking) {
    setSelectedBooking(booking);
    setShowModal(true);
  }
  // delete booking
  const handleDeleteClick = (booking) => {
    setBookingToDelete(booking);
    setShowDeleteConfirmation(true);
  };

  // Load booking list
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    getAllBookingsWithClassNameAndUserName().then(
      (bookings) => {
        // filter bookings by user role, trainer can only see his/her classes bookings
        if (user.role === "trainer") {
          const filteredBookings = bookings.filter(
            (booking) =>
              booking.class_trainer_firstname ===
                user.firstName &&
              booking.class_trainer_lastname ===
                user.lastName
          );
          setBookings(filteredBookings);
        } else {
          setBookings(bookings);
        }
      }
    );
  }, [refreshTrigger, user]);

  return (
    <>
      <TopBar />
      <div className="container grid grid-cols-6 ">
        <Nav />
        <div className="container mx-auto grid grid-cols-1  gap-4 col-span-6 md:col-span-5 py-8 px-4">
          <div className="rounded border-2 border-primary p-2">
            <h2 className="text-2xl font-semibold mb-4">
              Bookings
            </h2>
            <div className="overflow-auto w-full">
              {bookings == null ? (
                <Processing />
              ) : (
                <table className="table table-compact w-full overflow-scroll">
                  <thead>
                    <th>View</th>
                    <th>User</th>
                    <th>Class_activity</th>
                    <th>Classtime</th>
                    <th>Delete</th>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <button
                          className="p-2 ml-2"
                          onClick={() =>
                            handleViewClick(booking)
                          }
                        >
                          <AiOutlineEye size={25} />
                        </button>
                        <td>
                          {booking.user_firstname}{" "}
                          {booking.user_lastname}
                        </td>
                        <td>
                          {booking.class_activity_name}
                        </td>
                        <td>
                          {formatDate(
                            booking.class_datetime
                          )}
                        </td>
                        <button
                          className="btn btn-xs btn-danger mt-1 ml-1"
                          onClick={() =>
                            handleDeleteClick(booking)
                          }
                        >
                          Delete
                        </button>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <BookingDetailsModal
          booking={selectedBooking}
          open={showModal}
          onClose={() => setShowModal(false)}
        />
        {showDeleteConfirmation && (
          <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h3 className="text-xl font-bold">
                Delete Booking
              </h3>
              <p>
                Are you sure you want to delete this
                booking?
              </p>
              <div className="mt-4">
                <button
                  className="btn btn-danger mr-2"
                  onClick={async () => {
                    await deleteBooking(bookingToDelete.id); // Pass the booking ID
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
