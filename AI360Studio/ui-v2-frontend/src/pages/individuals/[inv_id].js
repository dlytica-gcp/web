import Head from "next/head";
import Link from "next/link";
import ProfileCard from "@/components/profile-card";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import TabComponent from "@/components/individual/individual-tab";
import Footer from "@/components/footer";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Breadcrumb from "../breadcrump";

export default function CustomerInfo() {
  const router = useRouter();
  const { inv_id } = router.query;

  const [individual, setIndividual] = useState([]);
  const [detailsInfo, setDetailsInfo] = useState([]);
  const hasFetched = useRef(false); // Use ref to track data fetch

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    // If inv_id is present and data has not been fetched
    if (inv_id && !hasFetched.current) {
      // fetchData();
      hasFetched.current = true; // Mark data as fetched
    }
  }, [inv_id]); // Depend on inv_id to fetch data when it changes

  // const fetchData = async () => {
  //   try {
  //     const token = Cookies.get("token");

  //     // Parallel data fetching using Promise.all
  //     const [individualRes, detailsInfoRes] = await Promise.all([
  //       axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/individual_info?id=${inv_id}&branch=${branch_name}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       ),
  //       axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/details_info/${inv_id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       ),
  //     ]);
  //     setIndividual(individualRes.data);
  //     setDetailsInfo(detailsInfoRes.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const breadcrumbLinks = [
    { href: "/individ", label: "Individual" },
    { href: `/individuals/${inv_id}`, label: "Customer Info" },
  ];

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
            <Navbar onToggleSidebar={handleToggleSidebar} inv_id={inv_id} />
          </nav>
          <main className="content">
            <div className="container-fluid p-0">
              <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
                  <h3>
                    <strong>Customer</strong> Info
                  </h3>
                </div>
                <Breadcrumb links={breadcrumbLinks} />
              </div>
              <div className="row">
                <ProfileCard individual={individual} inv_id={inv_id} />
                <TabComponent
                  individual={individual}
                  detailsInfo={detailsInfo}
                  inv_id={inv_id}
                />
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}