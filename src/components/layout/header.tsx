import Image from "next/image";
import {   FiGrid, FiPlusSquare } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
const Header = () => {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const dateStr = today.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  return (
    <div>
      <header className="bg-white border-b border-gray-200   px-8 py-4 flex items-center justify-end lg:justify-between gap-10">
        <div>
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </div>
        <div className="flex items-center justify-center gap-4 text-gray-600">
          <div className="flex items-center gap-3">
            <button className=" bg-secondary hover:bg-[#5272FF] rounded-lg transition-colors p-2">
              <IoIosNotificationsOutline size={20}  className=" text-white" />
            </button>
            
          </div>
         <div className="p-2 bg-secondary hover:bg-secondary rounded-lg transition-colors">
             <SlCalender size={20}  className=" text-white" />
         </div>
          <div className="flex items-center flex-col">
            <span className="font-semibold text-primary">{dayName}</span>
            <span className="text-sm text-primary">{dateStr}</span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
