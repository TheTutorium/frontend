import { useState } from "react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useAuth } from "@clerk/clerk-react";

export default function CourseMutate({ setCourses, course, edit }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(course?.name || "");
  const [description, setDescription] = useState(course?.description || "");
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState(course?.duration || 30);
  const { getToken } = useAuth();
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitting");
    setLoading(true);

    const token = await getToken();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/courses/${course?.id}/picture`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // close the dialog and reload
      setOpen(false);
      // window.location.reload();
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/`, {
      method: edit ? "PUT" : "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        description: description,
        duration: duration,
        name: name,
        id: course?.id,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    edit
      ? setCourses((prevCourses) =>
          prevCourses.map((prevCourse) => {
            if (prevCourse.id === data.id) {
              return data;
            } else {
              return prevCourse;
            }
          })
        )
      : setCourses((prevCourses) => [...prevCourses, data]);
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {edit ? "Edit course" : "Create a course"}
        </Button>
      </DialogTrigger>
      <DialogContent as="form" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{edit ? "Edit course" : "Create a course"}</DialogTitle>
          <DialogDescription>
            Enter the required information and click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="courses" className="p-3 w-full lg:w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            {edit && (
              <>
                <TabsTrigger value="picture">Picture</TabsTrigger>
                {/* <TabsTrigger value="materials">Materials</TabsTrigger> */}
              </>
            )}
          </TabsList>
          <TabsContent value="courses">
            <div className="grid gap-4 py-4">
              <div className=" items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  placeholder="MATH260"
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
                  placeholder="In this session I will explain the concepts. related.."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className=""
                />
              </div>
              <div className=" items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Duration
                </Label>

                <Input
                  id="duration"
                  type="number"
                  step="15"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              {/* <div className=" items-center gap-4">
                <Label htmlFor="Picture" className="text-right">
                  Picture
                </Label>

                <Input
                  id="picture"
                  value={coursePic}
                  onChange={(e) => setCoursePic(e.target.value)}
                  className=""
                />
              </div> */}
            </div>
          </TabsContent>
          {edit && (
            <>
              <TabsContent value="picture">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </TabsContent>
              {/* <TabsContent value="materials">
                <h1>sa</h1>{" "}
              </TabsContent> */}
            </>
          )}
        </Tabs>
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
  );
}
