import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsJustify } from "react-icons/bs";

const ProfileActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;
      if (
        !clickedElement.closest("#simple-menu") &&
        !clickedElement.closest("#open-menu")
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative ">
      <div className="profile-action">
        <button
          id="open-menu"
          className="flex items-center justify-center py-2 px-4 rounded-full border hover:shadow-md transition-all"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <span className="inline-block mr-2">
            <BsJustify className="text-2xl" />
          </span>
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "30px" }}
          >
            <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z" />
          </svg>
        </button>

        {isOpen && (
          <div
            id="simple-menu"
            className="flex flex-col font-light text-[15px] py-2 w-64 border rounded-xl shadow-menu transition-all absolute top-[3.5rem] right-0 bg-white"
          >
            <Link
              className="font-medium py-2 px-3 hover:bg-lightbg transition-all"
              href={"/signup_login"}
            >
              Sign up
            </Link>
            <Link
              className="py-2 px-3 hover:bg-lightbg transition-all"
              href={"/login"}
            >
              Login
            </Link>

            <div className="w-full bg-[#71717157] h-[1px] my-2">&nbsp;</div>

            <Link
              className="py-2 px-3 hover:bg-lightbg transition-all"
              href={"/hostshare-help"}
            >
              Hostshare your home
            </Link>
            <Link
              className="py-2 px-3 hover:bg-lightbg transition-all"
              href={"/help"}
            >
              Help
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileActions;
