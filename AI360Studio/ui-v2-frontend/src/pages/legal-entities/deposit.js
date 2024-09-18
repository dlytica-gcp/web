// pages/individual.js
import Head from "next/head";
import Link from "next/link";
import IndividualStatistics from "@/components/individual/individual-statistics";
import InnerPageSidebar from "../../components/inner-page-sidebar";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import LegalProfileCard from "@/components/legal-profile-card";
import Sidebar from "@/components/sidebar";
import TabComponent from "../../components/legal-entity/deposit-tab";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Breadcrumb from "../breadcrump";

export default function Deposit() {
  const [individual, setIndividual] = useState([]);
  const router = useRouter();
  const { legal_id } = router.query;
  const [legal, setLegal] = useState([]);
  const hasFetched = useRef(false);
  // Fetch data from the API
  // const fetchData = async () => {
  //   try {
  //     const token = Cookies.get("token");
  //     console.log(c_id);
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/individual_info/10000057`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setIndividual(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  // useEffect(()=>{
  //   fetchData();
  // },[]);
  useEffect(() => {
    // If legal_id is present and data has not been fetched
    if (legal_id && !hasFetched.current) {
      // fetchData();
      hasFetched.current = true; // Mark data as fetched
    }
  }, [legal_id]);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const breadcrumbLinks = [
    { href: "/legal-entity", label: "Legal Entity" },
    { href: `/legal-entities/deposit/${legal_id}`, label: "Deposit" },
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
            <Navbar onToggleSidebar={handleToggleSidebar} legal_id={legal_id}/>
          </nav>
          <main className="content">
            <div className="container-fluid p-0">
              <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
                  <h3>
                    <strong>Deposit</strong>
                  </h3>
                </div>
                <Breadcrumb links={breadcrumbLinks} />
              </div>
              <div className="row">
                <LegalProfileCard legal={legal} legal_id={legal_id} />
                <TabComponent individual={individual} legal_id={legal_id} />
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}