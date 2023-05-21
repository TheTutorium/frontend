import { useUserType } from "../utils/UserTypeContext";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { CourseCard } from "../components/CourseCard";
import CourseMutate from "../components/CourseMutate";

export function Courses() {
  const { isTutor, typeLoading } = useUserType();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setCoursesLoading(true);
      const token = await getToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/courses/all-by-tutor/${user.id}`,
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
      } else {
        console.error("Failed to fetch courses");
      }
      setCoursesLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <>
      <div className="max-w-[1400px] mx-auto self-stretch w-full p-5">
        {typeLoading ? (
          <h1>Loading...</h1>
        ) : isTutor ? (
          <div>
            {coursesLoading ? (
              <h1>Loading...</h1>
            ) : courses.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {courses.map((course) => (
                  <CourseCard course={course} key={course.id} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold">You have no courses</h1>
                <p className="text-xl">Create a course to get started</p>
              </div>
            )}
            <div>
              <CourseMutate setCourses={setCourses} />
            </div>
          </div>
        ) : (
          <h1>Student Dashboard</h1>
        )}
      </div>
    </>
  );
}
