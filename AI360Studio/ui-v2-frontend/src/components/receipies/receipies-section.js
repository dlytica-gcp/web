import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import feather from "feather-icons"; // Import Feather icons
import Link from "next/link";
import Cookies from "js-cookie";
import styles from '../../styles/recepies.module.css';

const Receipies = () => {
  const [individuals, setIndividuals] = useState([]);
  const hasFetched = useRef(false); // Use ref to track data fetch

  useEffect(() => {
    feather.replace(); // Initialize Feather icons

    // Check if data has already been fetched
    if (!hasFetched.current) {
      fetchData();
      hasFetched.current = true; // Mark data as fetched
    }
  }, []);

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const token = Cookies.get("token");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/individual_statistics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIndividuals(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    
  <>
        <div className="container-fluid">
        <div className={`alert alert-primary ${styles.alertPrimary}`} role="alert">
          <h3 className={styles.titleH3}>All Recipes:</h3>
        </div>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src="img/photos/loan.png"
                className={`card-img-top ${styles.cardImgTop}`}
                alt="Loan Delinquency Prediction"
              />
              <div className="card-body">
                <h5 className={`${styles.cardtitle} text-center ${styles.cardTitle}`}>
                  Loan Delinquency Prediction
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src="img/photos/first-time.png"
                className={`card-img-top ${styles.cardImgTop}`}
                alt="First Time Home Buyer"
              />
              <div className="card-body">
                <h5 className={`${styles.cardtitle} text-center ${styles.cardTitle}`}>
                  First Time Home Buyer
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src="img/photos/fraud.png"
                className={`card-img-top ${styles.cardImgTop}`}
                alt="Fraud Prediction"
              />
              <div className="card-body">
                <h5 className={`${styles.cardtitle} text-center ${styles.cardTitle}`}>
                  Fraud Prediction
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src="img/photos/next-best.png"
                className={`card-img-top ${styles.cardImgTop}`}
                alt="Next Best Offer"
              />
              <div className="card-body">
                <h5 className={`${styles.cardtitle} text-center ${styles.cardTitle}`}>
                  Next Best Offer
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src="img/photos/churn.png"
                className={`card-img-top ${styles.cardImgTop}`}
                alt="Churn Prediction"
              />
              <div className="card-body">
                <h5 className={`${styles.cardtitle} text-center ${styles.cardTitle}`}>
                  Churn Prediction
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src="img/photos/ptmm.png"
                className={`card-img-top ${styles.cardImgTop}`}
                alt="Personalized Targeted Marketing Prediction"
              />
              <div className="card-body">
                <h5 className={`${styles.cardtitle} text-center ${styles.cardTitle}`}>
                  Personalized Targeted Marketing Prediction
                </h5>
              </div>
            </div>
          </div>
        </div>
       </div>
    
  </>


  );
};

export default Receipies;
