import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useMediaQuery } from "../hooks/use-media-query";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  CalendarDays,
  Clock,
  Edit,
  Link as LinkIcon,
  Pencil,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
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
import BookCourse from "./BookCourse";
import CourseMutate from "./CourseMutate";
import { useAuth } from "@clerk/clerk-react";
export function CourseCard({
  course,
  canEdit,
  handleDeleteCourse,
  setCourses,
  isTutor,
}) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [coursePic, setCoursePic] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const getCoursePic = async () => {
      const token = await getToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/courses/${course.id}/picture/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const imageBlob = await response.blob();

      // Create a URL for the image blob
      const imageURL = URL.createObjectURL(imageBlob);

      // Set the image URL to the course pic state variable
      setCoursePic(imageURL);
    };

    getCoursePic();
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center justify-between p-1">
          <div className="flex items-center">
            <Pencil className="w-5 h-5 mr-2 inline-block" />
            <CardTitle>{course.name}</CardTitle>
          </div>
          <div className="flex items-center">
            <LinkIcon className="w-4 h-4 mr-2 inline-block text-muted-foreground" />
            <CardDescription>online at Tutoryum.com</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex">
          <AvatarComponent
            isMobile={isMobile}
            coursePic={coursePic}
            course={course}
          />
          <div className="p-3 w-full flex flex-col justify-center">
            <div className="flex space-x-2 items-center">
              <p className=" text-muted-foreground">Tutor:</p>
              <Button
                className="p-0"
                variant="link"
                onClick={() => {
                  console.log("clicked");
                }}
              >
                <a href={`/tutors/${course.tutor_id}`}>
                  {course.tutor_first_name + " " + course.tutor_last_name}
                </a>
              </Button>
            </div>
            <div className="flex space-x-2">
              {" "}
              <p className="text-muted-foreground">
                {"Description: "}
                <span className="text-primary italic">
                  {course.description}
                </span>
              </p>
            </div>
            <div className="flex space-x-2">
              <p className="text-muted-foreground">Duration:</p>
              <p className="text-primary ">{course.duration} minutes</p>
            </div>
            {!canEdit && !isTutor && (
              <div className="mt-2">
                <BookCourse courseId={course.id} duration={course.duration} />
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {canEdit && (
          <div className="w-full flex items-center justify-between">
            <CourseMutate course={course} edit={true} setCourses={setCourses} />
            <AlertDialog open={isAlertOpen} setOpen={setIsAlertOpen}>
              <Button
                variant="destructive"
                onClick={() => setIsAlertOpen(true)}
              >
                <XCircle className="w-4 h-4 mr-2 inline-block " />
                Delete
              </Button>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will deactivate the course. Comments and bookings data
                    will not be deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    as="button"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
const AvatarComponent = ({ isMobile, coursePic, course }) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    console.log("coursePic", coursePic);
  }, [coursePic]);

  return (
    <div
      style={{
        width: isMobile ? "120px" : "200px",
        height: isMobile ? "120px" : "160px",
        borderRadius: "9px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.5rem",
        backgroundColor: "#ccc", // placeholder color
        color: "#000", // text color
      }}
    >
      {!imageError ? (
        <img
          src={coursePic}
          alt={course.name}
          onError={() => setImageError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      ) : (
        <span>{course.name[0].toUpperCase()}</span>
      )}
    </div>
  );
};
