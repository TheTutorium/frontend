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
export function Meetings() {
  const { getToken } = useAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState({});
  const [reviewsLoading, setReviewsLoading] = useState(true);

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
          const startTime = moment(booking.start_time);
          if (startTime.isBefore(now)) {
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

  useEffect(() => {
    const fetchReviews = async () => {
      setReviewsLoading(true);
      const token = await getToken();

      // create a promises array to hold all fetch promises
      const promises = data.passed.map((booking) => {
        return fetch(
          `${import.meta.env.VITE_API_URL}/reviews/all-by-course/${
            booking.course_id
          }/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      });

      // run all fetch operations simultaneously
      const responses = await Promise.all(promises);

      // parse JSON for each response and build the reviews object
      const reviewsObj = {};
      for (let i = 0; i < responses.length; i++) {
        if (responses[i].ok) {
          const review = await responses[i].json();
          reviewsObj[data.passed[i].course_id] = review;
        } else {
          console.error(
            `Failed to fetch reviews for course ${data.passed[i].course_id}`
          );
        }
      }

      // update state with reviews
      setReviews(reviewsObj);
      setReviewsLoading(false);
    };

    if (data && data.passed.length > 0) {
      console.log("fetching reviews");
      fetchReviews();
      console.log("reviews", reviews);
    }
  }, [data]);

  // for every passed

  return (
    <div
      className="
        max-w-[1400px]
        mx-auto
        self-stretch
        w-full  
        flex
        justify-center
    "
    >
      <Tabs defaultValue="incoming" className="m-3 w-full lg:w-[800px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="incoming">Incoming Meetings</TabsTrigger>
          <TabsTrigger value="passed">Passed Meetings</TabsTrigger>
        </TabsList>
        <TabsContent value="incoming">
          <div className="space-y-2">
            {isLoading ? (
              <>
                <Card className="animate-pulse mb-2">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center justify-between p-1">
                      <div className="flex items-center">
                        <div className="w-64 h-6 bg-gray-200 rounded-sm"></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-48 h-4 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className=" space-y-2">
                      <div className="w-64 h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="w-10/12 h-4 bg-gray-200 rounded"></div>
                      <div className="w-10/12 h-4 bg-gray-200 rounded"></div>
                      <div className="w-96 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full flex justify-between">
                      <div className="w-32 h-8 bg-gray-200 rounded mb-2"></div>
                      <div className="w-32 h-8 bg-gray-200 rounded"></div>
                    </div>
                  </CardFooter>
                </Card>
                <Card className="animate-pulse">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center justify-between p-1">
                      <div className="flex items-center">
                        <div className="w-64 h-6 bg-gray-200 rounded-sm"></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-48 h-4 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className=" space-y-2">
                      <div className="w-64 h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="w-10/12 h-4 bg-gray-200 rounded"></div>
                      <div className="w-10/12 h-4 bg-gray-200 rounded"></div>
                      <div className="w-96 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full flex justify-between">
                      <div className="w-32 h-8 bg-gray-200 rounded mb-2"></div>
                      <div className="w-32 h-8 bg-gray-200 rounded"></div>
                    </div>
                  </CardFooter>
                </Card>
              </>
            ) : data.incoming.length === 0 ? (
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl">No meetings yet</p>
                <p className="text-sm text-muted-foreground">
                  You have upcoming meetings scheduled yet. You can schedule a
                  meeting by clicking the button below.
                </p>
                <Button variant="secondary" className="mt-2">
                  Create a new meeting
                </Button>
              </div>
            ) : (
              data.incoming.map((booking) => (
                <Booking booking={booking} key={booking.id} />
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
                {reviewsLoading ? <p>Loading...</p> : <h1>Reviews</h1>}
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
