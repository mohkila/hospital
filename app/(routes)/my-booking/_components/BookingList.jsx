import { CalendarDays, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
import React from "react";
import CancelAppoinment from "./CancelAppoinment";

function BookingList({ bookingList, onDelete }) {
  const handleCancelClick = (booking) => {
    onDelete(booking.id);
  };

  return (
    <div className="booking-list px-6 py-8 sm:px-10 lg:px-20">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Booking List
      </h1>
      {bookingList && bookingList.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {bookingList.map((booking, index) => {
            const { attributes } = booking;
            const doctor = attributes?.doctor?.data?.attributes || {};
            const imageUrl = doctor.Image?.data?.attributes?.url;

            return (
              <li
                key={index}
                className="booking-item border border-gray-200 rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow p-5"
              >
                {imageUrl && (
                  <div className="flex justify-center mb-4">
                    <Image
                      src={imageUrl}
                      alt={doctor.Name || "Doctor Image"}
                      height={120}
                      width={120}
                      className="rounded-full"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col gap-3">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {doctor.Name || "Unknown Doctor"}
                  </h2>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <MapPin className="text-primary" />
                    {doctor.Address || "No Address Provided"}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <PhoneCall className="text-primary" />
                    {doctor.Phone || "No Phone Number"}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <CalendarDays className="text-primary" />
                    Appointment on:{" "}
                    {attributes.Date
                      ? new Date(attributes.Date).toLocaleDateString()
                      : "No Date Provided"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Booking Time:</strong> {attributes.Time || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>About:</strong> {doctor.About || "N/A"}
                  </p>
                </div>
                <div className="px-5 pb-5">
                  <CancelAppoinment
                    onContinueClick={() => handleCancelClick(booking)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-10">No bookings available</p>
      )}
    </div>
  );
}

export default BookingList;
