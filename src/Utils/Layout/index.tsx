import React from "react";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";

const Layout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
