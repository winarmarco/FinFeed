import { UserButton, UserProfile } from "@clerk/nextjs";
import Logo from "../logo";
import { User } from "@clerk/nextjs/server";
import SidebarItem, { SidebarItemProps } from "./sidebar-item";
import { Bell, Bookmark, Home, Save } from "lucide-react";
import { api } from "@/_trpc/server";

const sidebarItems: SidebarItemProps[] = [
  {
    label: "Home",
    link: "/",
    icon: <Home />,
  },
  {
    label: "Saved",
    link: "/saved",
    icon: <Bookmark />,
  },
  {
    label: "Notification",
    link: "/notification",
    icon: <Bell />,
  },

];

const Sidebar = async () => {
  const user = await api.user.getUser.query();

  return (
    <nav className="min-h-screen divide-y w-20 md:w-[300px]">
      <div className="fixed w-20 md:w-[300px] h-full top-0 flex flex-col divide-y justify-center md:px-4 py-10">
        <Logo />
        <div className="flex flex-col items-center md:items-start flex-1 gap-y-2">
          {sidebarItems.map((sidebarItem) => (
            <SidebarItem key={sidebarItem.label} {...sidebarItem} />
          ))}
        </div>

        <div className="flex items-center justify-center md:justify-start">
          <SidebarItem label="Profile" icon={<UserButton />} link={`/profile/${user.id}`}/>
        </div>
      </div>
    </nav>
  );
};


export default Sidebar;