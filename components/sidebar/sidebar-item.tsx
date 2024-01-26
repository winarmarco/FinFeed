import Link from "next/link";

export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  link: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({icon, label, link}) => {
  return (
    <Link
      href={link}
      className="flex flex-row gap-x-2 py-4 my-2 items-center justify-center md:justify-start px-0 md:px-2 group relative hover:bg-slate-100 aspect-square md:aspect-auto transition-bg rounded md:w-full" 
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
