// pages/individual.js
import Head from "next/head";
import IndividualStatistics from "@/components/individual/individual-statistics";
import Sidebar from "@/components/sidebar";
import Navbar from "../pages/outer-navbar";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";

export default function Individual() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <Head>
        <title>Individual Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      </Head>

      <div className="wrapper">
        <nav
          id="sidebar"
          className={`sidebar js-sidebar ${isCollapsed ? "collapsed" : ""}`}
        >
          <Sidebar />
        </nav>

        <div className="main">
          <nav className="navbar navbar-expand navbar-light navbar-bg">
            <Navbar onToggleSidebar={handleToggleSidebar} />
          </nav>
          <main className="content">
            <div className="container-fluid p-0">
              <IndividualStatistics />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
