import { Button } from "../components/ui/button";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

import { useState } from "react";
import Booking from "../components/Booking";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import moment from "moment";
import Skeleton from "../components/Skeleton";
export function Meetings() {
  const { getToken } = useAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const dataObj = {};
      setIsLoading(true);

      const token = await getToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/bookings/all-by-user/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const res = await response.json();

        const passed = [];
        const incoming = [];
        const now = moment();

        res.forEach((booking) => {
          const endTime = moment(booking.start_time).add(2, "hours");
          if (endTime.isBefore(now)) {
            passed.push(booking);
          } else {
            incoming.push(booking);
          }
        });

        dataObj.passed = passed;
        dataObj.incoming = incoming;
        setData(dataObj);

        setIsLoading(false);
      } else {
        console.error("Failed to fetch tutor status");
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);
  // for every passed

  return (
    <div className="max-w-[1400px] mx-auto self-stretch w-full flex justify-center ">
      <Tabs defaultValue="incoming" className="m-3 w-full lg:w-[800px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="incoming">Incoming Meetings</TabsTrigger>
          <TabsTrigger value="passed">Passed Meetings</TabsTrigger>
        </TabsList>
        <TabsContent value="incoming">
          <div className="space-y-2">
            {isLoading ? (
              <>
                <Skeleton />
              </>
            ) : data.incoming.length === 0 ? (
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl">No meetings yet</p>
                <p className="text-sm text-muted-foreground">
                  You have upcoming meetings scheduled yet. Go ahead and book a
                  meeting!
                </p>
              </div>
            ) : (
              data.incoming.map((booking) => (
                <Booking booking={booking} key={booking.id} setData={setData} />
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="passed">
          <div className="space-y-2">
            {isLoading ? (
              <p>Loading...</p>
            ) : data.passed.length === 0 ? (
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl">No meetings yet</p>
                <p className="text-sm text-muted-foreground">
                  You haven't had any meetings yet. Once you have a meeting
                  scheduled, it will show up here.
                </p>
              </div>
            ) : (
              <>
                {data.passed.map((booking) => (
                  <Booking booking={booking} key={booking.id} isPassed={true} />
                ))}
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
