"use client"
import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiCheckSquare, FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import userImg from "../../../public/avatar.png";
import { useGetUserProfileQuery } from "@/src/app/redux/features/auth/authAPI";
import { useDispatch } from "react-redux";
import { clearAccessToken } from "@/src/app/redux/features/auth/authSlice";
import { toast } from "sonner";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isTodosActive = pathname === "/";
  const isAccountActive = pathname === "/account";

  const { data: userProfile } = useGetUserProfileQuery();

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearAccessToken());

    localStorage.removeItem("persist:root");

    // Remove cookies
    Cookies.remove("access_token");

    toast("Logged out successfully!", {
      duration: 3000,
    });

    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 500);
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-5 left-5 z-50 p-2 bg-blue-700 rounded-md text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <aside
        className={`
          fixed lg:static top-0 left-0 h-full w-64 lg:w-[340px] bg-[#0D224A] text-white flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 z-40
        `}
      >
        <div className="p-6 border-b border-blue-700 mt-20 lg:mt-20">
          <div className="w-24 h-24 rounded-full mx-auto mb-3 border-3 border-white relative overflow-hidden bg-gray-400 flex items-center justify-center">
            <Image
              src={userProfile?.profile_image || userImg}
              alt="User image"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center">
            <div className="font-semibold text-base text-white">
              {userProfile?.first_name} {userProfile?.last_name}
            </div>
            <div className="text-sm text-white">{userProfile?.email}</div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <Link
            href="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isTodosActive
                ? "bg-gradient-to-r from-[#1D3474] to-[#0D224A] text-white"
                : "text-blue-100 hover:bg-gradient-to-r from-[#1D3474] to-[#0D224A]"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <FiCheckSquare className="w-5 h-5 text-[#8CA3CD]" />
            <span>Todos</span>
          </Link>

          <Link
            href="/account"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isAccountActive
                ? "bg-gradient-to-r from-[#1D3474] to-[#0D224A] text-white"
                : "text-blue-100 hover:bg-gradient-to-r from-[#1D3474] to-[#0D224A]"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <FiUser className="w-5 h-5" />
            <span>Account Information</span>
          </Link>
        </nav>

        <div className="p-6">
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-gradient-to-r from-[#1D3474] to-[#0D224A] transition-colors w-full"
            onClick={handleLogout}
          >
            <FiLogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
