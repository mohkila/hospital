"use client";

import React, { useEffect, useState } from "react";
import GlopalApi from "@/app/_utils/GlopalApi";
import DoctorsList from "@/app/_components/DoctorsList";

// Wrapping the component in a Suspense boundary will ensure proper handling
function Search({ params }) {
  const [doctors, setDoctors] = useState([]);
  const [catgname, setCatgname] = useState("");

  useEffect(() => {
    // We can handle the async function directly here instead of using React.use
    const fetchParams = async () => {
      try {
        const resolvedParams = await params; // Wait for params promise to resolve
        const decodedCatgname = decodeURIComponent(resolvedParams.catgname); // Decode the category name
        setCatgname(decodedCatgname);
      } catch (err) {
        console.error("Error handling params:", err);
      }
    };

    fetchParams();
  }, [params]); // Dependency array ensures it triggers only on params change

  useEffect(() => {
    if (catgname) {
      getDoctors();
    }
  }, [catgname]);

  const getDoctors = async () => {
    try {
      const res = await GlopalApi.getDoctorByCategory(catgname);
      console.log(res.data.data);
      setDoctors(res.data.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  return (
    <div>
      <div className="p-5">
        {/* Doctors List */}
        <DoctorsList heading={catgname} doctors={doctors} />
      </div>
    </div>
  );
}

export default Search;
