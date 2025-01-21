"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./_components/BookingList";
import GlopalApi from "@/app/_utils/GlopalApi";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

function MyBooking() {
  const { user } = useKindeBrowserClient();
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    if (user) {
      getUserBookingList();
    }
  }, [user]);

  const getUserBookingList = () => {
    GlopalApi.getUserBookingList(user?.email).then((res) => {
      setBookingList(res.data.data);
    });
  };

  const filterUserBooking = (type) => {
    return bookingList.filter((item) =>
      type === "upcoming"
        ? new Date(item.attributes.Date) >= new Date()
        : new Date(item.attributes.Date) < new Date()
    );
  };

  const handleDeleteBooking = (id) => {
    GlopalApi.deleteBooking(id).then(() => {
      setBookingList((prev) => prev.filter((booking) => booking.id !== id));
    });
  };

  return (
    <div className="p-5 md:px-20 mt-10">
      <h2 className="font-extrabold text-2xl">My Booking</h2>
      <Tabs defaultValue="upcoming" className="w-full mt-5">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <BookingList
            bookingList={filterUserBooking("upcoming")}
            onDelete={handleDeleteBooking}
          />
        </TabsContent>
        <TabsContent value="expired">
          <BookingList
            bookingList={filterUserBooking("expired")}
            onDelete={handleDeleteBooking}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyBooking;
