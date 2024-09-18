import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import legalFetchData from "@/services/legal_service";
const LegalProfileCard = (props) => {
  const { legal, legal_id } = props;
  const [profile, setProfile] = useState([]);

  const fetchAllData = async () => {
    try {
      // Fetch all data concurrently
      const [basicInfo] = await Promise.all([
        legalFetchData.get_basic_derived_info(legal_id),
      ]);

      // Set all data states
      setProfile(basicInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (legal_id) {
      fetchAllData();
    }
  }, [legal_id]);
  return (
    <>
      <div className="col-md-4 col-xl-3">
        {profile?.map((data, index) => (
          <div key={`${data.c_id}-${index}`}>
            <div className="card mb-3">
              <div className="card-header">
                <h5 className="card-title mb-0">Profile Details</h5>
              </div>
              <div className="card-body text-center">
                {/* <Image
                  src="/img/avatars/dlytica-logo.png"
                  alt={
                    data["dim_customer_legal_entity_details.corporate_name"] ||
                    "Dlytica Logo"
                  }
                  className="img-fluid mb-2"
                  width={128}
                  height={128}
                /> */}
                <h5 className="card-title mb-0">
                  {data["dim_customer_legal_entity_details.corporate_name"] ||
                    "Dlytica Inc"}
                </h5>
                <div className="text-muted mb-2">
                  {data[
                    "dim_customer_legal_entity_details.nature_of_business"
                  ] || "IT Company"}
                </div>
                <div>
                  <a className="btn btn-primary btn-sm btn-rc mb-2" style={{pointerEvents:"none"}}>
                    Risk Level:{" "}
                   N/A
                  </a>
                  <a className="btn btn-primary btn-sm btn-rc mb-2" style={{pointerEvents:"none"}}>
                    CIF ID:{" "}
                    {data["dim_customer_legal_entity_details.cif_id"] ||
                      "null"}
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
                      className="feather feather-map-pin feather-sm me-2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    From{" "}
                    <a style={{ pointerEvents: "none", color:"#3B7DDD" }}>
                      {data[
                        "dim_customer_legal_entity_details.type_of_entity"
                      ] || "Unknown"}
                    </a>
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
                      className="feather feather-map-pin feather-sm me-2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Contact:{" "}
                    <a style={{ pointerEvents: "none", color:"#3B7DDD" }}>
                      {data[
                        "dim_customer_legal_entity_details.keycontact_personname"
                      ] || "Unknown"}
                    </a>
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
                      className="feather feather-map-pin feather-sm me-2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Branch:{" "}
                    <a style={{ pointerEvents: "none", color:"#3B7DDD" }}>
                      {data["dim_customers.home_branch"] || "Unknown"}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LegalProfileCard;