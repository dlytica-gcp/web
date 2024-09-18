// pages/individual.js
import Head from "next/head";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProfileCard from "@/components/profile-card";
import TabContent from "@/components/individual/loan-account-tab/funded-loan-tab";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Breadcrumb from "@/pages/breadcrump";
export default function FundedLoan() {
  const [individual, setIndividual] = useState([]);
  const router = useRouter();
  const { inv_id, foracid, cif_id } = router.query;
  // Fetch data from the API
  const fetchData = async () => {
    try {
      const token = Cookies.get("token");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/individual_info/10000057`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIndividual(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const breadcrumbLinks = [
    { href: "/individ", label: "Individual" },
    { href: `/individuals/loan?inv_id=${cif_id}`, label: "Loan" },
    {
      href: `/individuals/loan-account/funded-loan?inv_id=${inv_id}&foracid=${foracid}&cif_id=${cif_id}`,
      label: "Funded Loan",
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
            <Navbar onToggleSidebar={handleToggleSidebar}  inv_id={cif_id} />
          </nav>
          <main className="content">
            <div className="container-fluid p-0">
              <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
                  <h3>
                    <strong>Funded </strong>Loan Account
                  </h3>
                </div>
                <Breadcrumb links={breadcrumbLinks} />
              </div>
              <div className="row">
                <ProfileCard individual={individual} />
                <TabContent individual={individual} />
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}