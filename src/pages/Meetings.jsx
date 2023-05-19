import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  AlarmClock,
  CalendarClock,
  XCircle,
  Edit,
  StickyNote,
} from "lucide-react";
import moment from "moment";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alertDialog";

import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

import { useState } from "react";

export function Meetings() {
  const { getToken } = useAuth();
  const [data, setData] = useState(null);
  const [isLoadingTutorStatus, setIsLoadingTutorStatus] = useState(true);
  const [isLoadingCourse, setIsLoadingCourse] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchTutorStatus = async () => {
      const dataObj = {};
      setIsLoadingTutorStatus(true);

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
        const tutorStatusData = await response.json();
        console.log(tutorStatusData);

        const passed = [];
        const incoming = [];
        const now = moment();

        tutorStatusData.forEach((booking) => {
          const startTime = moment(booking.start_time);
          if (startTime.isBefore(now)) {
            passed.push(booking);
          } else {
            incoming.push(booking);
          }
        });

        const bookingsPromises = tutorStatusData.map(async (booking) => {
          const courseId = booking.course_id;
          setIsLoadingCourse(true);
          const courseResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/courses/${courseId}/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (courseResponse.ok) {
            const courseData = await courseResponse.json();
            booking.course = courseData;
            setIsLoadingCourse(false);

            setIsLoadingUsers(true);
            const usersResponse = await fetch(
              `${import.meta.env.VITE_API_URL}/users/${courseData.tutor_id}/`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (usersResponse.ok) {
              const usersData = await usersResponse.json();
              booking.tutor = usersData;
              setIsLoadingUsers(false);
            } else {
              console.error("Failed to fetch users");
              setIsLoadingUsers(false);
            }
          } else {
            console.error("Failed to fetch course");
            setIsLoadingCourse(false);
          }
        });

        await Promise.all(bookingsPromises);

        dataObj.passed = passed;
        dataObj.incoming = incoming;
        setData(dataObj);
      } else {
        console.error("Failed to fetch tutor status");
        setIsLoadingTutorStatus(false);
      }
      setIsLoadingTutorStatus(false);
    };
    fetchTutorStatus();
  }, []);

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
            {isLoadingTutorStatus || isLoadingCourse || isLoadingUsers ? (
              <p>Loading...</p>
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
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center justify-between p-1">
                      <div className="flex items-center">
                        <AlarmClock className="w-5 h-5 mr-2 inline-block" />
                        <CardTitle>
                          Meeting With {booking.tutor.first_name}{" "}
                          {booking.tutor.last_name[0]}.
                        </CardTitle>
                      </div>
                      <div className="flex items-center">
                        <CalendarClock className="w-4 h-4 mr-2 inline-block text-muted-foreground" />
                        <CardDescription>
                          {moment(booking.start_time).format(
                            "dddd, MMMM Do YYYY, h:mm a"
                          )}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex space-x-2">
                      <p className="text-sm text-muted-foreground">Course:</p>
                      <p className="text-sm text-primary">
                        {booking.course.name}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <p className="text-sm text-muted-foreground">Duration:</p>
                      <p className="text-sm text-primary">
                        {booking.course.duration} minutes
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full flex justify-between">
                      <Button className="mr-2">
                        <Edit className="w-4 h-4 mr-2 inline-block" />
                        Edit Course Material
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          {/* <Button className="mr-2" variant="destructive"> */}
                          <XCircle className="w-4 h-4 mr-2 inline-block " />
                          Cancel
                          {/* </Button> */}
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will cancel the meeting and notify the
                              student. You shouldn't do this unless you have a
                              good reason.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="passed">
          <div className="space-y-2">
            {isLoadingTutorStatus || isLoadingCourse || isLoadingUsers ? (
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
              data.passed.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center justify-between p-1">
                      <div className="flex items-center">
                        <AlarmClock className="w-5 h-5 mr-2 inline-block" />
                        <CardTitle>
                          Meeting With {booking.tutor.first_name}{" "}
                          {booking.tutor.last_name[0]}.
                        </CardTitle>
                      </div>
                      <div className="flex items-center">
                        <CalendarClock className="w-4 h-4 mr-2 inline-block text-muted-foreground" />
                        <CardDescription>
                          {moment(booking.start_time).format(
                            "dddd, MMMM Do YYYY, h:mm a"
                          )}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex space-x-2">
                      <p className="text-sm text-muted-foreground">Course:</p>
                      <p className="text-sm text-primary">
                        {booking.course.name}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <p className="text-sm text-muted-foreground">Duration:</p>
                      <p className="text-sm text-primary">
                        {booking.course.duration} minutes
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full flex justify-between">
                      <Button className="mr-2" variant="secondary">
                        <StickyNote className="w-4 h-4 mr-2 inline-block" />
                        See Course Material
                      </Button>
                      <Button className="mr-2" variant="secondary">
                        <Edit className="w-4 h-4 mr-2 inline-block" />
                        Comment
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
