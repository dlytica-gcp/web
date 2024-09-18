// pages/individual.js
import Head from 'next/head';
import Link from 'next/link';
import IndividualStatistics from '@/components/individual/individual-statistics';
import Receipies from '@/components/receipies/receipies-section';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { useState } from 'react';

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
      <nav id="sidebar" className={`sidebar js-sidebar ${isCollapsed ? "collapsed" : ""}`}>
          <Sidebar />
        </nav>
        
        <div className="main">
          <nav className="navbar navbar-expand navbar-light navbar-bg">
          <Navbar onToggleSidebar={handleToggleSidebar} />
          </nav>
          <main className="content">
          <div class="container-fluid pb-30 bg-color-gray">
            <Receipies/>
            </div>
          </main>
          <Footer/>
        </div>
      </div>
    </div>
  );
}
