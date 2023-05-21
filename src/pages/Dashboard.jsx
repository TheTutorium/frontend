import { useEffect, useState } from "react";
import { TutorCard } from "../components/TutorCard";
import { CourseCard } from "../components/CourseCard";
import { Button } from "../components/ui/button";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useUserType } from "../utils/UserTypeContext";

export function Dashboard() {
  const { getToken } = useAuth();
  const { isTutor, typeLoading } = useUserType();
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setCoursesLoading(true);
      const token = await getToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/courses/all/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        setCourses(data);
        setCoursesLoading(false);

        // setCourses(coursesWithTutorNames);
      } else {
        console.error("Failed to fetch courses");
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto self-stretch w-full">
      {typeLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {coursesLoading ? (
            <div>Courses Loading...</div>
          ) : (
            <div className="flex flex-col justify-center w-full h-full md:px-5 py-5">
              {/* <div className="w-full border rounded-md mb-2">
                Some kind of filter #TODO
              </div> */}
              <div className="w-full">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
