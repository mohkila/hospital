import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { CalendarDays, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import GlopalApi from "@/app/_utils/GlopalApi";

function BookAppointment({ doctor }) {
  const { toast } = useToast();
  const { user } = useKindeBrowserClient();
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [note, setNote] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getTimeSlots = () => {
    const timeList = [];

    // Helper function to format time
    const formatTime = (hours, minutes) => {
      const amPm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
      const formattedMinutes = minutes === 0 ? "00" : minutes;
      return `${formattedHours}:${formattedMinutes} ${amPm}`;
    };

    // Generate time slots from 10:00 AM to 12:00 AM (midnight)
    for (let hours = 10; hours < 24; hours++) {
      timeList.push(formatTime(hours, 0)); // Add the hour
      timeList.push(formatTime(hours, 30)); // Add the 30-minute slot
    }

    return timeList;
  };

  const isPastdate = (selectedDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of today
    selectedDate.setHours(0, 0, 0, 0); // Reset selectedDate to start of day
    return selectedDate < today;
  };

  const saveBooking = async () => {
    if (!selectedTimeSlot || !date) {
      toast({
        title: "Invalid Input",
        description: "Please select a valid date and time slot!",
        variant: "destructive",
      });
      return;
    }

    const bookingData = {
      data: {
        UserName: `${user?.given_name || "Unknown"} ${user?.family_name || ""}`.trim(),
        Email: user?.email || "No Email",
        Date: date.toISOString(),
        Note: note,
        doctor: doctor?.id,
        Time: selectedTimeSlot,
        status: "pending",
      },
    };

    try {
      const response = await GlopalApi.bookAppoinment(bookingData);
      // Trigger email sending API after booking
      GlopalApi.sendEmail(bookingData).then((resp) => {
        console.log(date);
      });

      toast({
        title: "Booking Successful",
        description: "Your appointment has been booked successfully.",
      });
      setIsDialogOpen(false);
      setDate(new Date());
      setSelectedTimeSlot();
      setNote("");
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  useEffect(() => {
    setTimeSlots(getTimeSlots());
  }, []);

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mt-5 mb-5 text-black">Book Appointment</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-black text-center">
              Book Appointment!
            </DialogTitle>
            <DialogDescription>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                  {/* Calendar Section */}
                  <div className="flex flex-col justify-center items-baseline">
                    <h2 className="flex gap-4 items-center text-primary font-bold">
                      <CalendarDays className="w-8 h-8" />
                      Select Date
                    </h2>
                    <Calendar
                      mode="single"
                      disabled={isPastdate}
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </div>

                  {/* Time Slots Section */}
                  <div className="flex flex-col">
                    <h2 className="text-primary font-bold flex gap-4 items-center">
                      <Clock className="w-8 h-8" />
                      Select Time Slot
                    </h2>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {timeSlots.map((slot, index) => (
                        <button
                          key={index}
                          aria-label={`Select time slot ${slot}`}
                          className={`border p-2 rounded transition ${
                            selectedTimeSlot === slot
                              ? "bg-primary text-white"
                              : "hover:bg-primary hover:text-white"
                          }`}
                          onClick={() => setSelectedTimeSlot(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </DialogDescription>
            <h2 className="text-primary">NOTE</h2>
            <Textarea
              className="mt-5 text-primary"
              placeholder="Enter Your Message"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              onClick={saveBooking}
              disabled={!(selectedTimeSlot && date)}
            >
              Submit
            </Button>
            <Button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BookAppointment;
