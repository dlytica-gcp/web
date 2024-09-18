// pages/individual.js
import Head from 'next/head';
import Link from 'next/link';
import InnerPageSidebar from "@/components/inner-page-sidebar";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ProfileCard from '@/components/profile-card';
import TabContent from '@/components/individual/loan-account-tab/non-funded-loan-tab';
import { useState, useEffect } from 'react';

export default function FundedLoan() {
  const [individual, setIndividual] = useState([]);
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
  useEffect(()=>{
    fetchData();
  },[]);
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
        <nav id="sidebar" className="sidebar js-sidebar">
          <InnerPageSidebar />
        </nav>

        <div className="main">
          <nav className="navbar navbar-expand navbar-light navbar-bg">
            <Navbar />
          </nav>
          <main className="content">
            <div className="container-fluid p-0">
              <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
                  <h3>
                    <strong>Non Funded </strong>Loan Account 
                  </h3>
                  <span>
                    <Link href="/individ" className="text-link">
                      Individual
                    </Link>
                    &gt;&gt;
                    <Link href="/individuals/loan" className="text-link">
                      Loan
                    </Link>
                    &gt;&gt;
                    <Link href="/individuals/loan-account/non-funded-loan" className="text-link">
                      Non Funded Loan
                    </Link>
                  </span>
                </div>
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
