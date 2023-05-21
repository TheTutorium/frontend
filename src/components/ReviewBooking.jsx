import { useEffect, useState } from "react";
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
import { is } from "date-fns/locale";

export default function ReviewBooking({ booking_id }) {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [isReviewed, setIsReviewed] = useState(false);
  const [reviewId, setReviewId] = useState(null);

  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    setLoading(true);
    const fetchReview = async () => {
      setLoading(true);
      const token = await getToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews/by-booking/${booking_id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setComment(data.comment);
      setRating(data.rating);
      setIsReviewed(true);
      setReviewId(data.id);
      setLoading(false);
    };

    fetchReview();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("is reviewed", isReviewed);
    // return;

    setLoading(true);

    const token = await getToken();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews/`, {
      method: isReviewed ? "PUT" : "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: reviewId,
        booking_id: booking_id,
        comment: comment,
        rating: Number(rating),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">{"Review"}</Button>
        </DialogTrigger>
        <DialogContent as="form" className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{"Review"}</DialogTitle>
            <DialogDescription>
              {isReviewed
                ? "You have already reviewed this booking. You can edit your review below."
                : "Please leave a review for this booking."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className=" items-center gap-4">
              <Label htmlFor="comment" className="text-right">
                Comment
              </Label>
              <Input
                id="commment"
                value={comment}
                placeholder="Very good course! I learned a lot!"
                onChange={(e) => setComment(e.target.value)}
                className=""
              />
            </div>
            <div className="items-center gap-4">
              <Label htmlFor="rating" className="text-right">
                Rating
              </Label>

              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="border rounded-lg p-2 w-full bg-primary text-secondary"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <div className={"w-full flex justify-between"}>
              <Button type="submit" onClick={handleSubmit}>
                Save changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
