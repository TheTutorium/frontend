import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useMediaQuery } from "../hooks/use-media-query";
import { CalendarDays, CalendarClock, StarHalf, User2 } from "lucide-react";
import { Star } from "lucide-react";
// import madalion from lucide-react
import { Medal } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import Skeleton from "../components/Skeleton";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import BookCourse from "../components/BookCourse";
import { CourseCard } from "../components/CourseCard";
import CourseMutate from "../components/CourseMutate";
import Review from "../components/Review";
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

function Tutor() {
  const { id } = useParams();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [tutor, setTutor] = useState({});
  const [tutorLoading, setTutorLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const { getToken } = useAuth();
  const [canEdit, setCanEdit] = useState(false);
  const [description, setDescription] = useState("");
  const { user } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleTutorUpdate = async (event) => {
    event.preventDefault();
    const token = await getToken();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        description: description,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      setCoursesLoading(true);
      const token = await getToken();
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/courses/all-by-tutor/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setCourses(data);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setCoursesLoading(false);
      }
    };

    const fetchTutor = async () => {
      const token = await getToken();
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setTutor(data);
          setDescription(data.description);
          if (user.id === data.id) {
            setCanEdit(true);
          }
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTutor();
    fetchCourses();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      setReviewsLoading(true);

      const token = await getToken();
      // create a promises array to hold all fetch promises
      const promises = courses.map((course) => {
        return fetch(
          `${import.meta.env.VITE_API_URL}/reviews/all-by-course/${course.id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      });
      // run all fetch operations simultaneously
      const responses = await Promise.all(promises);
      // parse JSON for each response and build the reviews object
      const reviewsObj = {};
      for (let i = 0; i < responses.length; i++) {
        if (responses[i].ok) {
          const review = await responses[i].json();
          reviewsObj[courses[i].id] = review;
        } else {
          console.error(`Failed to fetch reviews for course ${courses[i].id}`);
        }
      }
      // // update state with reviews
      setReviews(reviewsObj);
      console.log(reviewsObj);
      setReviewsLoading(false);
    };

    if (courses && courses.length > 0) {
      console.log("courses", courses);
      console.log("fetching reviews");
      fetchReviews();
    }
  }, [courses]);

  return (
    <div className="max-w-[1400px] mx-auto self-stretch w-full h-full  justify-center">
      <div className=" flex sm:flex-row flex-col ">
        <div className="w-full">
          <Tabs
            defaultValue="courses"
            className="p-3 w-full flex flex-col justify-center"
          >
            <TabsList>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            <div className="flex flex-col md:flex-row space-x-2 w-full justify-start">
              <div className="md:w-1/4 min-w-[300px] rounded-lg bg-card text-card-foreground flex flex-col mt-2">
                <div className="flex flex-col space-y-1.5 p-3 md:p-5 pb-1 md:pb-1 w-full">
                  <div className="flex justify-center">
                    <Avatar
                      style={{
                        width: isMobile ? "120px" : "160px",
                        height: isMobile ? "120px" : "160px",
                        borderRadius: "9px",
                      }}
                    >
                      <AvatarImage
                        src={tutor.profile_pic}
                        alt={tutor.first_name}
                      />
                      <AvatarFallback
                        style={{ fontSize: "1.5rem", borderRadius: "9px" }}
                      >
                        {tutor.first_name}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-3 ">
                    <h3 className="text-lg font-semibold">
                      {tutor.first_name}
                    </h3>

                    {/* description */}
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground italic">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
                {
                  // if the user is the tutor, show edit button
                  canEdit && (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-12 mx-auto">
                          {"Edit"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent as="form" className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>{"Edit"}</DialogTitle>
                          <DialogDescription>
                            Enter the required information and click save when
                            you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col space-y-2">
                          <div className="flex flex-col space-y-1">
                            <label
                              htmlFor="description"
                              className="text-sm font-medium text-muted-foreground"
                            >
                              Description
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              rows={3}
                              className="text-primary-foreground shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                              placeholder="Enter a description"
                            />
                          </div>
                          <div className="flex flex-col space-y-1"></div>
                        </div>
                        <DialogFooter>
                          <div className={"w-full flex justify-between"}>
                            <Button type="submit" onClick={handleTutorUpdate}>
                              Save changes
                            </Button>
                          </div>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )
                }
                <div className="flex space-x-2 justify-center p-3 ">
                  <div className="flex items-center space-x-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {tutor.hours_given} hours
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {tutor.rating === -1 ? "N/A" : tutor.rating} rating
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <TabsContent value="courses">
                  <div className="space-y-2">
                    {coursesLoading ? (
                      <Skeleton />
                    ) : courses.length === 0 ? (
                      <div className="flex justify-center">
                        <div>
                          <div className="flex justify-center">
                            No courses found
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {courses.map((course) => (
                          <CourseCard
                            key={course.id}
                            course={course}
                            canEdit={canEdit}
                            handleDeleteCourse={handleDeleteCourse}
                            setCourses={setCourses}
                          />
                        ))}
                      </div>
                    )}
                    {canEdit && (
                      <div className={"flex justify-center"}>
                        <CourseMutate setCourses={setCourses} />
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="comments" className="w-full">
                  {/* for every course display the name and reviews */}
                  <div className="space-y-2 w-full">
                    {reviewsLoading ? (
                      <div className="flex justify-center">
                        <p className="text-muted-foreground">Loading...</p>
                      </div>
                    ) : Object.keys(reviews).length === 0 ? (
                      <div className="flex w-full">
                        <div>
                          <div className="flex justify-center">
                            No reviews found
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {Object.keys(reviews).map((courseId) => {
                          const course = courses.find(
                            (c) => c.id === Number(courseId)
                          );
                          const courseReviews = reviews[courseId];

                          if (!courseReviews || courseReviews.length === 0) {
                            return null; // Don't render if there are no reviews
                          }

                          return (
                            <div key={courseId}>
                              <div className="flex justify-start">
                                <h3 className="text-lg font-semibold">
                                  {course.name}
                                </h3>
                              </div>
                              <div className="w-full">
                                <div className="flex flex-col space-y-2">
                                  {courseReviews.map((review) => (
                                    <Review
                                      key={review.id}
                                      id={review.id}
                                      comment={review.comment}
                                      rating={review.rating}
                                      updatedAt={review.updated_at}
                                      reviewer={review.student_id}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Tutor;
