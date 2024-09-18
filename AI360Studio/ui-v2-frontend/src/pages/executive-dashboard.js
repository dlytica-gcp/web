// pages/individual.js
import Head from "next/head";
import Sidebar from "@/components/sidebar";
import Navbar from '../pages/outer-navbar';
import Footer from "@/components/footer";
import feather from "feather-icons";
import supersetService from "@/services/superset_service";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Individual() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.login === "success") {
      toast.success("Login successful!");
    }
  }, []);

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  useEffect(() => {
    feather.replace();
  }, []);

  const dashboardElement = "executive-dashboard";
  useEffect(() => {
    const embed = async () => {
      try {
        const filters = {};
        const dashboardId = "b2ac745e-a17b-4091-8bf7-ba2b5b38c2a2";
        const token = await supersetService.getToken(dashboardId);
        supersetService.embedDashboardWithToken(
          dashboardId,
          filters,
          dashboardElement,
          token
        );
        // access the dashboard element's children
        const dashboardContainer = document.getElementById(dashboardElement);
        if (dashboardContainer && dashboardContainer.children[0]) {
          dashboardContainer.children[0].width = "100%";
          dashboardContainer.children[0].height = "100%";
        }
        if (document.getElementById(dashboardElement)) {
          embed();
        }
      } catch (error) {
        console.error("error embedding:", error);
      }
    }
  }, []);
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
              {/* <ExecutiveDashboard /> */}
              <div
                id="executive-dashboard"
                style={{ width: "100%", height: "800px" }}
              />
            </div>
          </main>
          <Footer />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
