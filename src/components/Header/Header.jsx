import { navbarConfig } from "../../config/navbar";
import { cn } from "../../utils/utils";
import Navbar from "./Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown";

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Moon,
  Plus,
  PlusCircle,
  Settings,
  Sun,
  Twitter,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { useClerk, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../utils/ThemeContext";
import { useUserType } from "../../utils/UserTypeContext";

export function Header() {
  const { user } = useUser();
  const { isTutor } = useUserType();
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { darkMode, setDarkMode } = useTheme();
  return (
    <header className="container z-40 bg-background">
      <div className="flex h-20 items-center justify-between py-6">
        <Navbar items={navbarConfig.navbar} />
        <nav>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <Avatar>
                    <AvatarImage
                      src={user.profileImageUrl}
                      alt={user.fullName}
                    />
                    <AvatarFallback>
                      {/* {user.fullName[0].toUpperCase()} */}
                      {/* take the first letter from first two names */}
                      {user.fullName
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {isTutor && (
                  <DropdownMenuGroup>
                    {" "}
                    <DropdownMenuItem
                      onSelect={() => navigate("/tutors/" + user.id)}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Tutor Page</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onSelect={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => setDarkMode(!darkMode)}>
                  {darkMode ? (
                    <Sun className="mr-2 h-4 w-4" />
                  ) : (
                    <Moon className="mr-2 h-4 w-4" />
                  )}
                  <span>Toggle Theme</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    signOut();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/sign-in">
              <Button variant="ghost">Sign in</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
