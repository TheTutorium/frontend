import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useMediaQuery } from "../hooks/use-media-query";
import { Badge } from "../components/ui/badge";
// import { Popover } from "./ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";
import { Button } from "../components/ui/button";
import {
  CalendarDays,
  Link2,
  Pen,
  Pencil,
  School,
  StarHalf,
  User2,
} from "lucide-react";
import { Link as LinkIcon } from "lucide-react";
import { Star } from "lucide-react";
// import madalion from lucide-react
import { Medal } from "lucide-react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  AlarmClock,
  CalendarClock,
  XCircle,
  Edit,
  StickyNote,
} from "lucide-react";
import moment from "moment";

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
import { School2 } from "lucide-react";
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
function Tutor() {
  const { id } = useParams();
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div
      className="
      flex
      sm:flex-row
      flex-col
  "
    >
      <div
        className="sm:w-1/4 min-w-[300px]
      rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col
      h-fit ml-2
      "
      >
        <div className="flex flex-col space-y-1.5 p-3 md:p-5 pb-1 md:pb-1 w-full">
          <div className="flex justify-center">
            <Avatar
              style={{
                width: isMobile ? "120px" : "160px",
                height: isMobile ? "120px" : "160px",
                borderRadius: "9px",
              }}
            >
              <AvatarImage src={tutor.profileImageUrl} alt={tutor.fullName} />
              <AvatarFallback
                style={{ fontSize: "1.5rem", borderRadius: "9px" }}
              >
                {/* {user.fullName[0].toUpperCase()} */}
                {/* take the first letter from first two names */}
                {tutor.fullName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-3 ">
            <h3 className="text-lg font-semibold">
              {tutor.fullName.split(" ").slice(0, -1).join(" ") +
                " " +
                tutor.fullName.split(" ").slice(-1)[0][0] +
                "."}
            </h3>
            <div className="">
              <div className="flex space-x-2">
                {/* 5 times map */}
                {[...Array(2)].map((_, i) => (
                  <HoverCard key={i}>
                    <HoverCardTrigger asChild>
                      <div className={"cursor-pointer"}>
                        <Badge>CS202/A-</Badge>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <Avatar>
                          <AvatarImage src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Bilkent_University_Crest.svg/316px-Bilkent_University_Crest.svg.png?20210813000718" />
                          <AvatarFallback>BU</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">CS-202/A+</h4>
                          <p className="text-sm">
                            This user completed the CS-202 course at Bilkent
                            with an A+ grade.
                          </p>
                          <div className="flex items-center pt-2">
                            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                              December 2021
                            </span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
            {/* description */}
            <div className="mt-2">
              <p className="text-sm text-muted-foreground italic">
                {tutor.description}
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 justify-center p-3 ">
          <div className="flex items-center space-x-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{tutor.hours} hours</p>
          </div>
          <div className="flex items-center space-x-2">
            <Medal className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {tutor.badges} badges
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {tutor.rating} rating
            </p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Tabs defaultValue="courses" className="p-3 w-full lg:w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
          <TabsContent value="courses">
            <div className="space-y-2">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center justify-between p-1">
                    <div className="flex items-center">
                      <Pencil className="w-5 h-5 mr-2 inline-block" />
                      <CardTitle>CS202 Class help</CardTitle>
                    </div>
                    <div className="flex items-center">
                      <LinkIcon className="w-4 h-4 mr-2 inline-block text-muted-foreground" />
                      <CardDescription>online at Tutoryum.com</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex space-x-2">
                    <p className="text-sm text-muted-foreground">
                      Description:
                    </p>
                    <p className=" text-sm text-primary">
                      With this course you can finally learn about the CS202
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="text-sm text-muted-foreground">Duration:</p>
                    <p className=" text-sm text-primary">60 minutes</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full flex justify-end">
                    <Button className="mr-2">
                      <Edit className="w-4 h-4 mr-2 inline-block" />
                      Edit Course Material
                    </Button>
                    <Button className="mr-2">
                      <Edit className="w-4 h-4 mr-2 inline-block" />
                      Book Meeting
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center justify-between p-1">
                    <div className="flex items-center">
                      <Pencil className="w-5 h-5 mr-2 inline-block" />
                      <CardTitle>Math260 Class help</CardTitle>
                    </div>
                    <div className="flex items-center">
                      <LinkIcon className="w-4 h-4 mr-2 inline-block text-muted-foreground" />
                      <CardDescription>online at Tutoryum.com</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex space-x-2">
                    <p className="text-sm text-muted-foreground">
                      Description:
                    </p>
                    <p className=" text-sm text-primary">
                      With this course you can finally learn about the prob and
                      stat
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="text-sm text-muted-foreground">Duration:</p>
                    <p className=" text-sm text-primary">60 minutes</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full flex justify-end">
                    <Button className="mr-2">
                      <Edit className="w-4 h-4 mr-2 inline-block" />
                      Edit Course Material
                    </Button>
                    <Button className="mr-2">
                      <Edit className="w-4 h-4 mr-2 inline-block" />
                      Book Meeting
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="comments">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center justify-between p-1">
                  <div className="flex items-center">
                    <User2 className="w-5 h-5 mr-2 inline-block" />
                    <CardTitle>Oguzhan O.</CardTitle>
                  </div>
                  <div className="flex items-center">
                    <CalendarClock className="w-4 h-4 mr-2 inline-block text-muted-foreground" />
                    <CardDescription>
                      {moment("2023-05-05T10:00:00.000Z").format(
                        "dddd, MMMM Do YYYY, h:mm a"
                      )}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex space-x-2">
                  <p className=" text-md text-secondary-foreground px-5">
                    Senin silah arkadaslarin sana haklarini helal etmeden
                    olduler, sen silah arkadaslarinin bedduasini almis adamsin
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full flex justify-center">
                  <div className="text-yellow-500">
                    <Star className="w-4 h-4 mr-2 inline-block" />
                    <Star className="w-4 h-4 mr-2 inline-block" />
                    <StarHalf className="w-4 h-4 mr-2 inline-block" />
                  </div>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center justify-between p-1">
                  <div className="flex items-center">
                    <User2 className="w-5 h-5 mr-2 inline-block" />
                    <CardTitle>Cagri D.</CardTitle>
                  </div>
                  <div className="flex items-center">
                    <CalendarClock className="w-4 h-4 mr-2 inline-block text-muted-foreground" />
                    <CardDescription>
                      {moment("2023-05-05T10:00:00.000Z").format(
                        "dddd, MMMM Do YYYY, h:mm a"
                      )}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex space-x-2">
                  <p className=" text-md text-secondary-foreground px-5">
                    Keske ben bu hoca olsaydim bu yorumu da o atiyor olsaydi
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full flex justify-center">
                  <div className="text-yellow-500">
                    <Star className="w-4 h-4 mr-2 inline-block" />
                    <Star className="w-4 h-4 mr-2 inline-block" />
                    <Star className="w-4 h-4 mr-2 inline-block" />
                    <Star className="w-4 h-4 mr-2 inline-block" />
                    <Star className="w-4 h-4 mr-2 inline-block" />
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Tutor;
