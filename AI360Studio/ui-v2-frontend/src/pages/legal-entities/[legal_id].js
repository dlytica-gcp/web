import Head from "next/head";
import Link from "next/link";
import LegalProfileCard from "@/components/legal-profile-card";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import TabComponent from "../../components/legal-entity/legal-entity-tab";
import Footer from "@/components/footer";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Breadcrumb from "../breadcrump";
export default function CustomerInfo() {
  const router = useRouter();
  const { legal_id, branch_name } = router.query;
  const [legal, setLegal] = useState([]);
  const [detailsInfo, setDetailsInfo] = useState([]);
  const hasFetched = useRef(false); // Use ref to track data fetch

  useEffect(() => {
    // If legal_id is present and data has not been fetched
    if (legal_id && !hasFetched.current) {
      // fetchData();
      hasFetched.current = true; // Mark data as fetched
    }
  }, [legal_id]); // Depend on legal_id to fetch data when it changes

  // const fetchData = async () => {
  //   try {
  //     const token = Cookies.get("token");

  //     // Parallel data fetching using Promise.all
  //     const [legalRes, detailsInfoRes] = await Promise.all([
  //       axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/legal_info?id=${legal_id}&branch_name=${branch_name}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       ),
  //       axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/details_info/${legal_id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       ),
  //     ]);
  //     setLegal(legalRes.data);
  //     setDetailsInfo(detailsInfoRes.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const breadcrumbLinks = [
    { href: "/legal-entity", label: "Legal Entity" },
    {
      href: `/legal-entities/customer-info/${legal_id}`,
      label: "Customer Info",
    },
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
            <Navbar onToggleSidebar={handleToggleSidebar} legal_id={legal_id} />
          </nav>
          <main className="content">
            <div className="container-fluid p-0">
              <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
                  <h3>
                    <strong>Legal Entity </strong> Customer Info
                  </h3>
                </div>
                <Breadcrumb links={breadcrumbLinks} />
              </div>
              <div className="row">
                <LegalProfileCard legal={legal} legal_id={legal_id} />
                <TabComponent
                  legal={legal}
                  detailsInfo={detailsInfo}
                  legal_id={legal_id}
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