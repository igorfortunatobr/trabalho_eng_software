import Footer from "../footer/Footer";
import NavigationBar from "../navbar/Navbar";
import React from "react";

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template(props: TemplateProps) {
  return (
    <>
      <NavigationBar />
      <div style={{ minHeight: "70vh" }}>{props.children}</div>
      <Footer />
    </>
  );
}
