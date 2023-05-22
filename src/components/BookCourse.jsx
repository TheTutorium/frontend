import { Calendar } from "../components/ui/calendar";
import { cn } from "../utils/utils";
import { Calendar as CalendarIcon, Pen, XCircle, XIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { format, parseISO } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { useState } from "react";
import { Edit } from "lucide-react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
// import history
import { useNavigate } from "react-router-dom";

import { useAuth } from "@clerk/clerk-react";
import moment from "moment/moment";

export default function BookCourse({ courseId, duration }) {
  const [date, setDate] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedTimeslot, setSelectedTimeslot] = useState(null);
  const [loading, setLoading] = useState(false);
  const timeslots = [
    { id: 1, time: "10:00" },
    { id: 2, time: "11:00" },
    { id: 3, time: "12:00" },
    { id: 4, time: "13:00" },
    { id: 5, time: "14:00" },
    { id: 6, time: "15:00" },
    { id: 7, time: "16:00" },
    { id: 8, time: "17:00" },
    { id: 9, time: "18:00" },
    { id: 10, time: "19:00" },
    { id: 11, time: "20:00" },
  ];
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const handleTimeslotSelection = (timeslot) => {
    console.log(timeslot);
    setSelectedTimeslot(timeslot);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const token = await getToken();
    const startTime = selectedTimeslot
      ? format(date, "yyyy-MM-dd") + "T" + selectedTimeslot.time + ":00.000Z"
      : "";

    const durationInMs = duration * 60000; // Convert duration to milliseconds
    const endTime = startTime
      ? new Date(parseISO(startTime).getTime() + durationInMs - 1).toISOString()
      : "";

    const requestBody = {
      course_id: courseId,
      start_time: startTime,
      end_time: endTime,
    };
    const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(requestBody),
    });
    if (response.ok) {
      setDialogOpen(false);
      //   go to /meetings
      navigate("/meetings");
    } else {
      console.error("Failed to book course");
    }
    setLoading(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="mr-2" variant={"outline"}>
          <Edit className="w-4 h-4 mr-2 inline-block" />
          Book Meeting
        </Button>
      </DialogTrigger>
      <DialogContent as="form" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book this course</DialogTitle>
          <DialogDescription>
            Enter the required information and click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Calendar
              mode="single"
              selected={date}
              onDayClick={(day) => {
                setDate(day);
                setSelectedTimeslot(null);
                setPopoverOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {date && (
          <>
            {!selectedTimeslot && (
              <div className="carousel space-y-2 py-2">
                {timeslots.map((timeslot) => (
                  <Button
                    key={timeslot.id}
                    className={`timeslot-button inline-block py-2 px-4 mr-2 rounded border ${
                      timeslot === selectedTimeslot ? "bg-gray-300" : ""
                    }`}
                    onClick={() => {
                      handleTimeslotSelection(timeslot);
                      console.log("timeslot", timeslot);
                      console.log("date", date);
                    }}
                  >
                    {timeslot.time}
                  </Button>
                ))}
              </div>
            )}
            {selectedTimeslot && (
              <div className="flex space-x-2 p-3 items-center">
                <span className="text-sm text-muted-foreground">
                  {" "}
                  Selected timeslot:{" "}
                </span>
                <div
                  className="flex items-center space-x-2 p-2 cursor-pointer border rounded"
                  onClick={() => setSelectedTimeslot(null)}
                >
                  <Pen className="w-4 h-4 inline-block " />
                  <span className="text-foreground text-md">
                    {selectedTimeslot.time}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
        <DialogFooter>
          <div className={"w-full flex justify-between"}>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!date || !selectedTimeslot}
            >
              Save changes
            </Button>
            {loading && <p>Loading...</p>}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
