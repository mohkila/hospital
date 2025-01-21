import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function DoctorsList({ doctors  ,heading="Popular Doctors "}) {
  return (
    <div className="container mx-auto px-4">
      {/* Title */}
      <h1 className="bg-primary text-white text-center p-4 mb-6 text-3xl font-bold rounded-lg shadow-md">
       {heading}
      </h1>

      {/* Doctors List */}
      {doctors?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white/90
              cursor-pointer hover:border-x-4  border-primary
               rounded-lg shadow-md p-8   hover:shadow-primary hover:shadow-2xl transition-all duration-300"
            >
              {/* Doctor Image */}
              <div className="flex justify-center mb-4">
                <Image
                  src={
                    doctor.attributes.Image?.data?.attributes?.url ||
                    "/placeholder.jpg"
                  }
                  alt={doctor.attributes.Name || "Doctor"}
                  width={150}
                  height={150}
                  className="object-cover rounded-full"
                />
              </div>

              {/* Doctor Info */}
              <h2 className="text-lg font-bold text-center text-gray-800">
                {doctor?.attributes?.Name || "Unknown Doctor"}
              </h2>
              <p className="text-sm text-center text-primary font-bold mb-2">
                {doctor?.attributes?.category?.data?.attributes?.Name ||
                  "No Category"}
              </p>

              {/* Additional Info */}
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-semibold">Patients:</span>{" "}
                  {doctor?.attributes?.Patients || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {doctor?.attributes?.Adress || "No Address"}
                </p>
                <p className="text-primary font-bold">
                  <span>Experience:</span>{" "}
                  {doctor?.attributes?.Year_of_Expreiance || "N/A"} years
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {doctor?.attributes?.Phone || "No Phone"}
                </p>
                <p className="line-clamp-1">
                  <span className="font-semibold">Available:</span>{" "}
                  {doctor?.attributes?.StartTime || "N/A"} -{" "}
                  {doctor?.attributes?.EndTime || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">About:</span>{" "}
                  {doctor?.attributes?.About?.substring(0, 100) || "No Details"}
                  {doctor?.attributes?.About?.length > 100 && "..."}
                </p>
              </div>
              {/* Book Now Button */}
              <div className="mt-4  "> 
                <Link className="w-full"
                 href={ `/details/${doctor?.id}` }>
                <Button className="w-full font-bold hover:bg-red-900 transition-all ease-in-out duration-300">Book Now</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No doctors available .</p>
      )}
    </div>
  );
}

export default DoctorsList;
