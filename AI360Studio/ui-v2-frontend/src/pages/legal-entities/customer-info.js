import Head from "next/head";
import Link from "next/link";
import LegalProfileCard from "@/components/legal-profile-card";
import LegalPageSidebar from "@/components/legal-innerpage-sidebar";
import Navbar from "@/components/navbar";
import TabComponent from '../../components/legal-entity/legal-entity-tab';
import Footer from "@/components/footer";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function CustomerInfo() {
  const router = useRouter();
  const { inv_id } = router.query;
  const [individual, setIndividual] = useState([]);
  const [detailsInfo, setDetailsInfo] = useState([]);
  const hasFetched = useRef(false); // Use ref to track data fetch

  useEffect(() => {
    // If inv_id is present and data has not been fetched
    if (inv_id && !hasFetched.current) {
      fetchData();
      hasFetched.current = true; // Mark data as fetched
    }
  }, [inv_id]); // Depend on inv_id to fetch data when it changes

  const fetchData = async () => {
    try {
      const token = Cookies.get("token");

      // Parallel data fetching using Promise.all
      const [individualRes, detailsInfoRes] = await Promise.all([
        axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/individual_info/${inv_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/details_info/${inv_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
      ]);
      setIndividual(individualRes.data);
      setDetailsInfo(detailsInfoRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
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
        
 <nav id="sidebar" className={`sidebar js-sidebar ${isCollapsed ? "collapsed" : ""}`}>
          <LegalPageSidebar />
        </nav>

        <div className="main">
          <nav className="navbar navbar-expand navbar-light navbar-bg">
            
            <Navbar onToggleSidebar={handleToggleSidebar} />
          </nav>
          <main className="content">
            <div className="container-fluid p-0">
              <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
                  <h3>
                    <strong>Legal Entity </strong> Customer Info
                  </h3>
                  <span>
                    <Link href="/legal-entity" className="text-link">
                      Legal Entity
                    </Link>
                    &gt;&gt;
                    <Link href="/legal-entities/customer-info" className="text-link">
                      Customer Info
                    </Link>
                  </span>
                </div>
              </div>
              <div className="row">
                <LegalProfileCard />
                <TabComponent
                  individual={individual}
                  detailsInfo={detailsInfo}
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
