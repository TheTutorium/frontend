import { useEffect, useState } from "react";
import { TutorCard } from "../components/TutorCard";
import { CourseCard } from "../components/CourseCard";
import { Button } from "../components/ui/button";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useUserType } from "../utils/UserTypeContext";
import Skeleton from "../components/Skeleton";

export function Dashboard() {
  const { getToken } = useAuth();
  const { user } = useUser();
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
        // console.log("data", data);
        // filter the courses to only show the ones that are active
        const activeCourses = data.filter((course) => !course.deactivated);
        setCourses(activeCourses);
        setCoursesLoading(false);

        // setCourses(coursesWithTutorNames);
      } else {
        console.error("Failed to fetch courses");
      }
    };
    fetchCourses();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    console.log("delete course", courseId);
    const token = await getToken();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/courses/deactivate/${courseId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setCourses((courses) => courses.filter((c) => c.id !== courseId));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto self-stretch w-full">
      {typeLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex flex-col justify-center w-full h-full md:px-5 py-5">
            <div className="w-full  space-y-2">
              {coursesLoading ? (
                <div className=" space-y-2">
                  <Skeleton />
                  <Skeleton />
                </div>
              ) : (
                courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    isTutor={isTutor}
                    canEdit={user.id === course.tutor_id}
                    course={course}
                    setCourses={setCourses}
                    handleDeleteCourse={handleDeleteCourse}
                  />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
