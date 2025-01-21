"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

function Header() {
  const menu = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="flex justify-between items-center p-4 border-b-2 border-primary">
      <Link href={"/"}>
        <Image
          src={"/logo.svg"}
          height={75}
          width={75}
          alt="Site Logo"
          className="p-1 animate-spin duration-1000 ease-in-out"
        />
      </Link>
      <div>
        <ul className="md:flex gap-8 hidden">
          {menu.map((item, index) => (
            <li
              key={index}
              className="text-xl font-semibold hover:text-primary hover:scale-125 transition-all ease-in-out duration-300
            border-b-2 border-transparent hover:border-primary"
            >
              <Link href={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {user ? (
          <div className="flex gap-4 items-center text-center">
            <Popover>
              <PopoverTrigger>
                {" "}
                <Image
                  src={user?.picture}
                  width={50}
                  height={50}
                  alt="user"
                  className="rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent className="w-40">
                <ul className="flex flex-col gap-2">
                  <li className="hover:text-primary cursor-pointer">Profile</li>
                  <li className="hover:text-primary cursor-pointer">

                    <Link href={"/my-booking"}>
                    My Booking
                    </Link>
                  </li>

                  <li className="hover:text-primary cursor-pointer">
                    <Button>
                      {" "}
                      <LogoutLink>Logout</LogoutLink>
                    </Button>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="flex  gap-4">
            <LoginLink>
              <Button>Login</Button>
            </LoginLink>
            <RegisterLink>
              <Button>Register</Button>
            </RegisterLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
