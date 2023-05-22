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

import { CalendarClock, StarHalf, User2, XCircle } from "lucide-react";
import { Star } from "lucide-react";
import { Button } from "../components/ui/button";
import moment from "moment";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";

export default function Review({ id, comment, rating, reviewer, updatedAt }) {
  const [reviewerData, setReviewer] = useState("");
  const { getToken } = useAuth();
  const [canEdit, setCanEdit] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { user } = useUser();

  const handleDeleteReview = async (id) => {
    const token = await getToken();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setIsAlertOpen(false);
        window.location.reload();
      } else {
        setIsAlertOpen(false);
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.id === reviewer) {
      setCanEdit(true);
    }
    const fetchUser = async () => {
      const token = await getToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${reviewer}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const res = await response.json();
        setReviewer(res.first_name + " " + res.last_name);
      } else {
        console.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, [getToken, reviewer]);
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center justify-between p-1">
          <div className="flex items-center">
            <User2 className="w-5 h-5 mr-2 inline-block" />
            <CardTitle>{reviewerData}</CardTitle>
          </div>
          <div className="flex items-center">
            <CalendarClock className="w-4 h-4 mr-2 inline-block text-muted-foreground" />
            <CardDescription>
              {moment(updatedAt).format("dddd, MMMM Do YYYY")}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex space-x-2">
          <p className=" text-md text-secondary-foreground px-5">{comment}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div
          className={`w-full flex ${
            canEdit ? "justify-between" : "justify-center"
          }`}
        >
          <div className="text-yellow-500">
            {Array(5)
              .fill()
              .map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 inline-block ${
                    i < rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
          </div>
          {canEdit && (
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
                    This will delete the review. You can post a new one later.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    as="button"
                    onClick={() => handleDeleteReview(id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
