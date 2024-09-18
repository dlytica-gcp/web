// components/ProfileCard.js
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import individualCustomerFetchData from "@/services/cube_service";

const ProfileCard = (props) => {
  const { individual, inv_id } = props;
 
  const [profile, setProfile] = useState([]);
  const fetchAllData = async () => {
    try {
      // Fetch all data concurrently
      const [basicInfo] = await Promise.all([
        individualCustomerFetchData.getindivid_basicinfo_derived(inv_id),
      ]);

      // Set all data states
      setProfile(basicInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (inv_id) {
      fetchAllData();
    }
  }, [inv_id]);
  // const fetchIndividualProfile = async () => {
  //   try {
  //     // Fetch the individual data
  //     const result = await cubeFetchData.getindivid_basicinfo_derived(
  //       "10000050"
  //     );

  //     setProfile(result);

  //     // Extract data for DIGITAL
  //   } catch (error) {
  //     console.error("Error fetching individual data:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchIndividualProfile();
  // }, []);

  // if (!individual || individual.length === 0) {
  //   return <Loader />;
  // }

  return (
    <div className="col-md-4 col-xl-3">
      {profile?.map((data, index) => (
        <div key={`${data.c_id}-${index}`}>
          <div className="card mb-3">
            <div className="card-header">
              <h5 className="card-title mb-0">Profile Details</h5>
            </div>
            <div className="card-body text-center">
              {/* <Image
                src="/img/avatars/avatar-4.jpg"
                alt="Profile Image"
                className="img-fluid rounded-circle mb-2"
                width={128}
                height={128}
              /> */}
              <h5 className="card-title mb-0">
                {data["dim_customers.full_name"] || "null"}
              </h5>
              <div className="text-muted mb-2">
                {data["dim_customers.occupation"] || "null"}
              </div>
              <div>
               
                  <a className="btn btn-primary btn-rc btn-sm mb-2" style={{pointerEvents:"none"}}>
                    Risk Rating: {data["dim_customers.riskrating"] || "null"}
                  </a>
               
               
                  <a className="btn btn-primary btn-rc btn-sm mb-2" style={{pointerEvents:"none"}}>
                    CIF ID: {data["dim_customers.cif_id"] || "null"}
                  </a>
                
              </div>
            </div>
            <hr className="my-0" />
            <div className="card-body">
              <h5 className="h6 card-title">About</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-map-pin feather-sm me-1"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  From{" "}
                  
                    <a style={{ pointerEvents: "none", color:"#3B7DDD" }}>{data["dim_customers.address_line"]}</a>
                 
                </li>
                <li className="mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-map-pin feather-sm me-1"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Marital Status:{" "}
                 
                    <a style={{ pointerEvents: "none", color:"#3B7DDD" }}>{data["dim_customers.marital_status"]}</a>
                
                </li>
                <li className="mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-map-pin feather-sm me-1"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Segmentation Class:{" "}
                
                    <a style={{ pointerEvents: "none", color:"#3B7DDD" }}>{data["dim_customers.segmentation_class"]}</a>
                
                </li>
                <li className="mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-map-pin feather-sm me-1"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Employment Status:{" "}
                  
                    <a style={{ pointerEvents: "none", color:"#3B7DDD" }}>{data["dim_customers.employment_status"] || "N/A"}</a>
                  
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileCard;