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

export default function ReviewBooking({ booking_id }) {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const token = await getToken();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews/`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        booking_id: booking_id,
        comment: comment,
        rating: rating,
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{"Review"}</Button>
      </DialogTrigger>
      <DialogContent as="form" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{"Review"}</DialogTitle>
          <DialogDescription>
            Enter the required information and click save when you're done.
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
          <div className=" items-center gap-4">
            <Label htmlFor="rating" className="text-right">
              Rating
            </Label>

            <Input
              id="rating"
              type="number"
              value={rating}
              max="5"
              placeholder="4.5"
              min="0"
              step="0.5"
              onChange={(e) => setRating(e.target.value)}
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
  );
}
