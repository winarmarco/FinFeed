import { cn } from "@/lib/utils";
import Link from "next/link";

export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  link: string;
  type?: "primary" | "secondary",
}

const SidebarItem: React.FC<SidebarItemProps> = ({icon, label, link, type}) => {
  return (
    <Link
      href={link}
      className={cn((type === "secondary") ? "bg-green-500 text-white hover:bg-gray-800" : "hover:bg-slate-100","flex flex-row gap-x-2 py-2 my-2 items-center justify-center md:justify-start px-0 md:px-2 group relative  aspect-square md:aspect-auto rounded-lg md:w-full transition-colors" )}
    >
      <div className="w-8 h-8 flex items-center justify-center">{icon}</div>
      <p className="hidden md:block">{label}</p>

      <div className="block sm:hidden absolute left-10 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-100 px-2 py-1 rounded text-[9px] shadow-md">
        <p>{label}</p>
      </div>
    </Link>
  );
};

export default SidebarItem;
