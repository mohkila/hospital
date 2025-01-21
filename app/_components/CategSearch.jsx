"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import GlopalApi from "../_utils/GlopalApi";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function CategSearch() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlopalApi.getCategory().then((res) => {
      
      setCategories(res.data.data);
    });
  };

  return (
    <div className="mb-16 text-center flex flex-col items-center gap-8 container mx-auto px-4">
      {/* Title */}
      <h1 className="text-4xl  mt-12 font-bold tracking-wide text-gray-100">
        Search By{" "}
        <span className="text-primary text-5xl font-extrabold">Doctor</span>
      </h1>
      <h2 className="text-lg text-gray-500">
        Search your Doctor and Book Your Appointment in One Click!
      </h2>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3 w-full max-w-2xl">
        <Input
          type="text"
          placeholder="Search Doctor by Name or Specialty"
          className="w-full py-3 px-4 text-primary text-2xl font-bold border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
          aria-label="Search Doctor by Name or Specialty"
        />
        <Button
          aria-label="Search"
          className="flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary-dark transition-all duration-300"
        >
          <Search className="mr-2" />
          Search
        </Button>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full">
        {categories.map((category) => (
          <Link 
          href={`/search/${category?.attributes?.Name}`}
            key={category.id}
            className="flex flex-col items-center text-center bg-gray-100 hover:bg-primary text-primary
             hover:text-white rounded-lg p-4
             shadow-md cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <Image
              src={category.attributes.icon.data.attributes.url}
              alt={category.attributes.Name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <h1 className="text-lg font-semibold mt-3">
              {category.attributes.Name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategSearch;
