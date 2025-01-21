 'use client'
import Hero from "./_components/Hero";
import CategSearch from "./_components/CategSearch";
import DoctorsList from "./_components/DoctorsList";
import GlopalApi from "./_utils/GlopalApi";
import { useEffect, useState } from "react";

export default function Home() {
  const[doctors,setDoctors]=useState([])
  useEffect(()=>{
    doctorsList()
  },[])
const doctorsList =()=>{
  GlopalApi.getDoctors().then((res)=>{
    console.log(res.data.data)
    setDoctors(res.data.data)
  })
}
  return (
   <div className="container mx-auto px-4">
     <Hero/>

     <CategSearch/>
     <DoctorsList doctors={doctors}/>
     
   </div>
  );
}
