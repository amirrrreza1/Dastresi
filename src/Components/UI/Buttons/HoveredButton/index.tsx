import { ReactNode } from "react";
import { Link } from "react-router-dom";

type HoveredButtonProps = {
  text: string;
  icon: ReactNode;
  className?: string;
};

const HoveredButton = ({ text, icon, className }: HoveredButtonProps) => {
  return (
    <button
      className={`${className} rounded-lg bg-white shadow p-2 cursor-pointer group flex items-center gap-2 hover:w-36 overflow-hidden
    text-white transition-all duration-300 ease-in-out`}
    >
      <div className="w-5 h-5">{icon}</div>
      <span className="whitespace-nowrap text-black text-sm font-semibold opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <Link to="/dashboard/new">{text}</Link>
      </span>
    </button>
  );
};

export default HoveredButton;
