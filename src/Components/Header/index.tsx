import Image from "next/image";
import React from "react";
import HeaderSearch from "./HeaderSearch";
import ProfileActions from "../ProfileActions";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 bg-white z-20">
      <div className="px-5 py-2 border-b bg-white">
        <div className="container mx-auto flex justify-between items-start">
          <div className="logo cursor-pointer ">
            <Link href={"/"}>
              <Image
                src="/assets/images/logo.png"
                alt="Logo"
                width={130}
                height={40}
              />
            </Link>
          </div>
          <HeaderSearch />
          <ProfileActions />
        </div>
      </div>
    </header>
  );
};

export default Header;
