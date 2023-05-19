import { useEffect, useState } from "react";
import { TutorCard } from "../components/TutorCard";
import { CourseCard } from "../components/CourseCard";
import { Button } from "../components/ui/button";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useUserType } from "../utils/UserTypeContext";

export function Dashboard() {
  const tutor = {
    fullName: "Hasan Huseyin Doeganoglullari",
    profileImageUrl: "https://i.pravatar.cc/300",
    description:
      "I Never Ask My Clients to judge me on my winners, I ask them to judge me on my losers because i have so few",
    hours: 10,
    rating: 4.5,
    badges: 5,
    id: 1,
  };
  const { getToken } = useAuth();
  const { isTutor, typeLoading } = useUserType();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
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
        const coursePromises = data.map(async (course) => {
          const tutorResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/users/${course.tutor_id}/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (tutorResponse.ok) {
            const tutorData = await tutorResponse.json();
            return {
              ...course,
              tutor_name: `${tutorData.first_name} ${tutorData.last_name}`,
            };
          } else {
            console.error(`Failed to fetch tutor for course ${course.id}`);
            return course;
          }
        });
        const coursesWithTutorNames = await Promise.all(coursePromises);
        setCourses(coursesWithTutorNames);
      } else {
        console.error("Failed to fetch courses");
      }
    };
    fetchCourses();
  }, []);

  return (
    <div
      className="
        max-w-[1400px]
        mx-auto
        self-stretch
        w-full  
    "
    >
      {typeLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex flex-col justify-center w-full h-full md:px-5 py-5">
            {/* <div className="w-full border rounded-md mb-2">
              Some kind of filter #TODO
            </div> */}
            {false ? (
              <div className="w-full border rounded-md mb-2">
                <Button variant="primary" className="w-full">
                  Create a new meeting
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
