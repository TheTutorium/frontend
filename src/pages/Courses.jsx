import { useUserType } from "../utils/UserTypeContext";
import { useEffect, useState } from "react";
// import { CourseForm } from "./CourseForm";
import { useAuth, useUser } from "@clerk/clerk-react";
// import { CourseCard } from "./CourseCard";
import { CourseCard } from "../components/CourseCard";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { set } from "date-fns";
export function Courses() {
  const { isTutor, typeLoading } = useUserType();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { getToken } = useAuth();
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [coursePic, setCoursePic] = useState("");
  const [open, setOpen] = useState(false);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitting");
    setLoading(true);
    console.log(name, description, duration, coursePic);

    const token = await getToken();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        course_pic: coursePic,
        description: description,
        duration: duration,
        name: name,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    setCourses((prevCourses) => [...prevCourses, data]);
    setLoading(false);
    setOpen(false);
  };

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
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Create Course</Button>
                </DialogTrigger>
                <DialogContent as="form" className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create a course</DialogTitle>
                    <DialogDescription>
                      Enter the required information and click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className=" items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className=""
                      />
                    </div>
                    <div className=" items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>

                      <Input
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className=""
                      />
                    </div>
                    <div className=" items-center gap-4">
                      <Label htmlFor="duration" className="text-right">
                        Duration (minutes)
                      </Label>
                      <Input
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className=""
                      />
                    </div>
                    <div className=" items-center gap-4">
                      <Label htmlFor="Picture" className="text-right">
                        Picture
                      </Label>

                      <Input
                        id="picture"
                        value={coursePic}
                        onChange={(e) => setCoursePic(e.target.value)}
                        className=""
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <div className={"w-full flex justify-between"}>
                      {loading && <p>Loading...</p>}
                      <Button type="submit" onClick={handleSubmit}>
                        Save changes
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ) : (
          <h1>Student Dashboard</h1>
        )}
      </div>
    </>
  );
}
