import React from "react";
import { formatDate } from "./FormatDate";
const BookingDetailsModal = ({ booking, open, onClose }) => {
  if (!open) {
    return null;
  }
     
  
  return (
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
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6  text-gray-900 font-bold" id="modal-title">
                Booking Details
              </h3>
              {booking && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Member:</span>
                    <span>{booking.user_firstname} {booking.user_lastname}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Email:</span>
                    <span>{booking.user_email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Phone:</span>
                    <span>{booking.user_phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Class Activity:</span>
                    <span>{booking.class_activity_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Class Time:</span>
                    <span>{formatDate(booking.class_datetime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Trainer:</span>
                    <span>{booking.class_trainer_firstname} {booking.class_trainer_lastname}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Room Location:</span>
                    <span>{booking.class_room_location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold mr-3">Room Number:</span>
                    <span>{booking.class_room_number}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-semibold mr-3">Created Time:</span>
                    <span>{formatDate(booking.create_datetime)}</span>
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
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  )
              }
              export default BookingDetailsModal;