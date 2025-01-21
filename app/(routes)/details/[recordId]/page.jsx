"use client";
import GlopalApi from "@/app/_utils/GlopalApi";

import {
  Facebook, Linkedin,  LinkedinIcon, Twitter, Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BookAppoinment from "../_components/BookAppoinment";
import DoctorsList from "@/app/_components/DoctorsList";
function Details({ params ,doctors }) {
  const resolvedParams = React.use(params);
  const [doctor, setDoctor] = useState({});
  useEffect(() => {
    getDoctor();
  }, []);
  const getDoctor = () => {
    GlopalApi.getDoctorById(resolvedParams?.recordId).then((res) => {
      setDoctor(res.data.data);
    });
  };
  return (
    <div className="p-5 md:px-20">
      <h2 className="font-bold text-2xl mb-5">Doctor Details</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {/* Image Section */}
        <div className="flex justify-center md:justify-start">
          <Image
            src={
              doctor?.attributes?.Image?.data?.attributes?.url ||
              "/placeholder.jpg"
            }
            alt={doctor?.attributes?.Name || "Doctor"}
            width={350}
            height={350}
            className="object-cover rounded-3xl border border-gray-200"
          />
        </div>
        {/* Information Section */}
        <div className="col-span-2 text-gray-300 space-y-3 font-bold ">
          <p className="font-extrabold text-3xl text-primary">
            {doctor?.attributes?.Name || "N/A"}
          </p>
          <p className="text-primary text-lg">
            <span className="font-semibold text-white  ">Patients : </span>
            {doctor?.attributes?.Patients || "N/A"}
          </p>
          <p className="text-primary text-lg">
            <span className="font-semibold text-white ">Address : </span>
            {doctor?.attributes?.Adress || "No Address"}
          </p>
          <p className="  font-bold text-primary    text-lg ">
            <span className="font-semibold text-white ">Experience : </span>
            {doctor?.attributes?.Year_of_Expreiance || "N/A"} years
          </p>
          <p className="text-primary text-lg">
            <span className="font-semibold text-white ">Phone : </span>
            {doctor?.attributes?.Phone || "No Phone"}
          </p>
          <p className="truncate  text-primary text-lg ">
            <span className="font-semibold text-white ">Available : </span>
            {doctor?.attributes?.StartTime || "N/A"} -
            {doctor?.attributes?.EndTime || "N/A"}
          </p>
          <div>
            <div className="flex gap-2">
              <Link href={"/"} className="">
                <Facebook
                  className="w-10 h-10 p-1  rounded-full bg-blue-700
              hover:bg-blue-900 hover:scale-125 transition-all
               ease-in-out duration-300
              "
                />
              </Link>
              <Link href={"/"} className="">
                <Youtube
                  className="w-10 h-10 p-1  rounded-full bg-red-700
              hover:bg-red-900 hover:scale-125 transition-all
               ease-in-out duration-300
              "
                />
              </Link>
              <Link href={"/"} className="">
                <Twitter
                  className="w-10 h-10 p-1  rounded-full bg-green-700
              hover:bg-green-900 hover:scale-125 transition-all
               ease-in-out duration-300
              "
                />
              </Link>
              <Link href={"/"} className="">
                <Linkedin
                  className="w-10 h-10 p-1  rounded-full bg-blue-600 
              hover:bg-blue-900 hover:scale-125 transition-all
               ease-in-out duration-300
              "
                />
              </Link>
            </div>
          </div>
          <div className="mt-5 mb-5">
            <BookAppoinment doctor={doctor} />
          </div>
          <div className="mt-10">
            <p className="text-primary text-lg">
              <span className="font-semibold text-white ">
                About Me :
                <br />
              </span>
              {doctor?.attributes?.About?.substring(0, 100) || "No Details"}
            </p>
          </div>
        </div>
        {/* Additional Section */}
        <div className="col-span-1 flex items-center justify-center bg-gray-100 text-gray-700 p-3 rounded-lg shadow-md">
         <div className="flex flex-col items-center">

          <DoctorsList doctors={doctors} />
          {doctors?.length === 0 && <p>No doctors found.</p>}
         </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
