import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { AlarmClock, CalendarClock, XCircle, Edit, Pen } from "lucide-react";
import { useState } from "react";
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
import { useUserType } from "../utils/UserTypeContext";
import moment from "moment";
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import ReviewBooking from "./ReviewBooking";

export default function Booking({ booking, isPassed }) {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [isStudent, setIsStudent] = useState(false);
  const [isTutor, setIsTutor] = useState(false);
  useEffect(() => {
    if (booking.student_id === user.id) {
      setIsStudent(true);
    }
    if (booking.tutor_id === user.id) {
      setIsTutor(false);
    }

    console.log("isStudent", booking.student_id === user.id);
    console.log("isTutor", booking.tutor_id === user.id);
    console.log("isPassed", isPassed);
  }, [booking]);

  return (
    <div>
      <div>
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center justify-between p-1">
              <div className="flex items-center">
                <AlarmClock className="w-5 h-5 mr-2 inline-block" />
                <CardTitle>{booking.course_name}</CardTitle>
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
              <p className="text-sm text-muted-foreground">Desc:</p>
              <p className="text-sm text-primary">
                {booking.course_description}
              </p>
            </div>
            <div className="flex space-x-2">
              <p className="text-sm text-muted-foreground">Tutor:</p>
              <p className="text-sm text-primary">
                {booking.tutor_first_name + " " + booking.tutor_last_name}
              </p>
            </div>
            <div className="flex space-x-2">
              <p className="text-sm text-muted-foreground">Duration:</p>
              <p className="text-sm text-primary">
                {booking.course_duration} minutes
              </p>
            </div>
            <div className="flex space-x-2 items-center">
              <p className="text-sm text-muted-foreground">Link:</p>
              <Button className="p-0" variant="link">
                <a
                  target="_blank"
                  href={`${import.meta.env.VITE_MEETING_URL}/${
                    isTutor
                      ? booking.student_meeting_code
                      : booking.tutor_meeting_code
                  }/${
                    isTutor
                      ? booking.tutor_meeting_code
                      : booking.student_meeting_code
                  }`}
                >
                  {`${import.meta.env.VITE_MEETING_URL}/${
                    isTutor
                      ? booking.student_meeting_code
                      : booking.tutor_meeting_code
                  }/${
                    isTutor
                      ? booking.tutor_meeting_code
                      : booking.student_meeting_code
                  }`}
                </a>
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-between">
              {isPassed && isStudent && (
                <ReviewBooking booking_id={booking.id} />
              )}
              {!isPassed && isTutor && (
                <Button className="mr-2">
                  <Edit className="w-4 h-4 mr-2 inline-block" />
                  Edit Course Material
                </Button>
              )}
              {!isPassed && (
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
                        This will cancel the meeting and notify the student. You
                        shouldn't do this unless you have a good reason.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
// const bookingsPromises = tutorStatusData.map(async (booking) => {
//     const courseId = booking.course_id;
//     setIsLoadingCourse(true);
//     const courseResponse = await fetch(
//       `${import.meta.env.VITE_API_URL}/courses/${courseId}/`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     if (courseResponse.ok) {
//       const courseData = await courseResponse.json();
//       booking.course = courseData;
//       setIsLoadingCourse(false);

//       setIsLoadingUsers(true);
//       const usersResponse = await fetch(
//         `${import.meta.env.VITE_API_URL}/users/${courseData.tutor_id}/`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (usersResponse.ok) {
//         const usersData = await usersResponse.json();
//         booking.tutor = usersData;
//         setIsLoadingUsers(false);
//       } else {
//         console.error("Failed to fetch users");
//         setIsLoadingUsers(false);
//       }
//     } else {
//       console.error("Failed to fetch course");
//       setIsLoadingCourse(false);
//     }
//   });
//   await Promise.all(bookingsPromises);
