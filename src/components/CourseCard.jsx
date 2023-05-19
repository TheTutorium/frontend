import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useMediaQuery } from "../hooks/use-media-query";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { Medal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function CourseCard({ course }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-4/5 md:w-full lg:max-w-none mx-auto my-auto flex flex-col lg:justify-start">
      <div className="flex flex-col lg:flex-row space-y-1.5 lg:space-y-0 p-3 md:p-5 pb-1 md:pb-1 w-full">
        <div className="flex justify-center">
          <Avatar
            style={{
              width: isMobile ? "120px" : "160px",
              height: isMobile ? "120px" : "160px",
              borderRadius: "9px",
            }}
          >
            <AvatarImage src={course.course_pic} alt={course.name} />
            <AvatarFallback style={{ fontSize: "1.5rem", borderRadius: "9px" }}>
              {course.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="ml-3 lg:w-1/2 xl:w-3/5">
          <h3 className="text-lg font-semibold">{course.name}</h3>

          {/* Tutor Information */}
          <h4 className="text-md font-semibold mt-2">
            Tutor: {course.tutor_name}
          </h4>
          <div className="mt-1">
            <p className="text-sm text-muted-foreground italic">{"asd"}</p>
          </div>

          {/* Course Description */}
          <div className="mt-2">
            <p className="text-sm text-muted-foreground italic">
              {course.description}
            </p>
          </div>

          {/* Tutor Profile */}
          <div className="mt-2 flex justify-center">
            <Button variant="link">
              <Link to={`/tutors/${course.tutor_id}`}>View Tutor</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 justify-center p-3 ">
        <div className="flex items-center space-x-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(course.created_at), {
              addSuffix: true,
            })}{" "}
            created
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Medal className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {course.duration} duration
          </p>
        </div>
      </div>
    </div>
  );
}
