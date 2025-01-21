"use client";

import GlopalApi from "@/app/_utils/GlopalApi";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Link from "next/link";
import { usePathname } from "next/navigation";

function CategoryList( ) {
  const [categories, setCategories] = useState([]);
  const params=usePathname()
  const categoryName = params.split("/")[2];

  useEffect(() => {
    getCategoryList();
    console.log(params,'papraramam')
    
  }, []);
 
  const getCategoryList = () => {
    GlopalApi.getCategory().then((res) => {
      setCategories(res.data.data);
       
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white p-1 
    border-4 border-primary
    ">
      <Command className="w-full max-w-3xl   rounded-lg shadow-lg border h-[90vh]">
        <CommandInput
          placeholder="Type a command or search..."
          className="px-4 py-3 border-b border-gray-200 text-gray-700 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary rounded-t-lg"
        />
        <CommandList className="max-h-[85vh] overflow-y-auto">
          <CommandEmpty className="text-center text-gray-500 py-6">
            No results found.
          </CommandEmpty>
          <CommandGroup heading="Suggestions" className="p-4  ">
            {categories.map((category) => (
              <CommandItem key={category.id} className=" p-2    hover:bg-red-600">
                <Link
                  href={`/search/${category?.attributes?.Name}`}
                  className= {`flex items-center  p-1 gap-2 w-full
                     hover:bg-primary hover:text-white rounded-lg   
                       transition-transform transform hover:scale-105 
                       ${ category.attributes.Name === categoryName ? 'bg-primary text-white' : ''}
                       `}
                >
                  <Image
                    src={category.attributes.icon.data.attributes.url}
                    alt={category.attributes.Name}
                    width={50}
                    height={50}
                    className="rounded-full border border-gray-300"
                  />
                  <h1 className="text-lg font-medium">
                    {category.attributes.Name}
                  </h1>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export default CategoryList;
