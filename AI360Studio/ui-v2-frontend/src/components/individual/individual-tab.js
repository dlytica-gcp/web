import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import { renderCharts, destroyCharts } from "../charts/individual-chart";
import Loader from "../../components/shared/loader";
import individualCustomerFetchData from "@/services/cube_service";
import supersetService from "@/services/superset_service";
import { convertDateToYMD } from "@/lib/utils/date_to_month";

const TabContent = (props) => {
  const { individual, detailsInfo, inv_id } = props;
  const hasFetched = useRef(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [individualData, setIndividualData] = useState([]);
  const [individualRegData, setIndividualRegData] = useState([]);
  const [individualAddressData, setIndividualAddressData] = useState([]);
  const [individualCommunicationData, setIndividualCommunicationData] =
    useState([]);
  const [individualRelData, setIndividualRelData] = useState([]);

  const fetchData = async () => {
    try {
      // Fetch the individual data
      const result = await individualCustomerFetchData.get_aggregatedinsights(
        inv_id
      );
      const digitalData = result.filter(
        (item) => item["fact_transactions.tran_channel_type"] === "DIGITAL"
      );
      const inBranchData = cust_data.filter(
        (item) => item["fact_transactions.tran_channel_type"] === "IN_BRANCH"
      );

      // Extract data for DIGITAL
      const digitalLabels = digitalData.map(
        (item) => item["fact_transactions.tran_date_date_part"]
      );
      const digitalTxnCountData = digitalData.map(
        (item) => item["fact_transactions.txn_count"]
      );
      const digitalTranAmtVolData = digitalData.map(
        (item) => item["fact_transactions.tran_amt_vol"]
      );

      // Extract data for IN_BRANCH
      const inBranchLabels = inBranchData.map(
        (item) => item["fact_transactions.tran_date_date_part"]
      );
      const inBranchTxnCountData = inBranchData.map(
        (item) => item["fact_transactions.txn_count"]
      );
      const inBranchTranAmtVolData = inBranchData.map(
        (item) => item["fact_transactions.tran_amt_vol"]
      );
      destroyCharts();
      renderCharts({
        lineX: inBranchLabels,
        lineY: inBranchTranAmtVolData,
        transactionX: inBranchLabels,
        transactionY: inBranchTxnCountData,
        barX: digitalLabels,
        barY: digitalTranAmtVolData,
        bar_countX: digitalLabels,
        bar_countY: digitalTxnCountData,
      });
    } catch (error) {
      console.error("Error fetching individual data:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [inv_id]);

  const fetchAllData = useCallback(async () => {
    try {
      // Fetch all data concurrently
      const [basicInfo, regData, commData, addressData, relData] =
        await Promise.all([
          individualCustomerFetchData.getindivid_basicinfo_derived(inv_id),
          individualCustomerFetchData.getindivid_registration(inv_id),
          individualCustomerFetchData.getindivid_communication(inv_id),
          individualCustomerFetchData.getindivid_address(inv_id),
          individualCustomerFetchData.getindivid_relation(inv_id),
        ]);

      // Set all data states
      setIndividualData(basicInfo);
      setIndividualRegData(regData);
      setIndividualCommunicationData(commData);
      setIndividualAddressData(addressData);
      setIndividualRelData(relData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [inv_id]);

  // const getToken = async () => {
  //   const response = await fetch("http://localhost:5000/api/guest-token");
  //   const token_values = await response.json();
  //   console.log("token..............", token_values.token);
  //   return token_values.token;
  // };

  const dashboardElement = "individ-dashboard";
  useEffect(() => {
    fetchAllData();
    if (!hasFetched.current) {
      const filters = {
        cif_id: inv_id,
        visible: false,
      };

      const embed = async () => {
        // const dashboardId = "00923d54-0a1f-4f3e-beeb-77776d633c4b";
        const dashboardId = "4eeaee01-9174-40ee-960a-d0fe71ff2447";
        const token = await supersetService.getToken(dashboardId);
        supersetService.embedDashboardWithToken(
          dashboardId,
          filters,
          dashboardElement,
          token
        );

        // access the dashboard element's children
        const dashboardContainer = document.getElementById(dashboardElement);
        if (dashboardContainer && dashboardContainer.children[0]) {
          dashboardContainer.children[0].width = "100%";
          dashboardContainer.children[0].height = "100%";
        }
      };
      if (document.getElementById(dashboardElement)) {
        embed();
      }
      hasFetched.current = true
    }
  }, [
    fetchAllData
  ]);

  return (
    <>
      <div className="col-md-8 col-xl-9">
        <div className="tab">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                href="#primary-tab-1"
                data-bs-toggle="tab"
                role="tab"
                aria-selected="true"
              >
                Basic
              </a>
            </li>
            {/* <li className="nav-item" role="presentation">
            <a className="nav-link" href="#primary-tab-2" data-bs-toggle="tab" role="tab" aria-selected="false" tabIndex="-1">
              Derived Info
            </a>
          </li> */}
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                href="#primary-tab-3"
                data-bs-toggle="tab"
                role="tab"
                aria-selected="false"
                tabIndex="-1"
              >
                Detail
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                href="#primary-tab-4"
                data-bs-toggle="tab"
                role="tab"
                aria-selected="false"
                tabIndex="-1"
              >
                Insights
              </a>
            </li>
          </ul>

          <div className="tab-content">
            {/* basic/derived info */}
            {loading && (
              <div className="d-flex justify-content-center mb-4">
                <Loader />
              </div>
            )}
            {!loading && (
              <div
                className="tab-pane active show"
                id="primary-tab-1"
                role="tabpanel"
              >
                {individualData &&
                  individualData.map((data, index) => (
                    <div key={`${data.c_id}-${index}`}>
                      {/* <h4 className="tab-title">Basic Info</h4> */}
                      <div className="row">
                        <div
                          className="tab-pane"
                          id="primary-tab-2"
                          role="tabpanel"
                        >
                          {/* <h4 className="tab-title">Derived Info</h4> */}
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="card">
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col mt-0">
                                      <h5 className="card-title">
                                        Customer Relationship
                                      </h5>
                                    </div>
                                    <div className="col-auto">
                                      <div className="stat text-primary">
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
                                          className="feather feather-handshake align-middle"
                                        >
                                          <path d="M18 12h-3c-1.1 0-2 .9-2 2v0h-4v0c-1.1 0-2-.9-2-2H6l-4 4v4h4v-3c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v3h4v-4l-4-4z"></path>
                                          <path d="M12 2L8 6h8L12 2z"></path>
                                          <path d="M12 6v2M8 6v2M16 6v2M12 10v4"></path>
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                  <h1 className="mt-1 mb-3">
                                    {data[
                                      "dim_customers.cust_relationship_start_days"
                                    ]
                                      ? data[
                                      "dim_customers.cust_relationship_start_days"
                                      ] + " Days"
                                      : "Null"}
                                  </h1>
                                </div>
                              </div>
                              <div className="card">
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col mt-0">
                                      <h5 className="card-title">
                                        Account Relationship
                                      </h5>
                                    </div>
                                    <div className="col-auto">
                                      <div className="stat text-primary">
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
                                          className="feather feather-users align-middle"
                                        >
                                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                          <circle cx="9" cy="7" r="4"></circle>
                                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                  <h1 className="mt-1 mb-3">
                                    {data[
                                      "dim_customers.account_relationship_days"
                                    ]
                                      ? data[
                                      "dim_customers.account_relationship_days"
                                      ] + " Days"
                                      : "Null"}
                                  </h1>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="card">
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col mt-0">
                                      <h5 className="card-title">
                                        Days Since Last KYC Review
                                      </h5>
                                    </div>
                                    <div className="col-auto">
                                      <div className="stat text-primary">
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
                                          className="feather feather-file-check align-middle"
                                        >
                                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                          <polyline points="14 2 14 8 20 8"></polyline>
                                          <path d="M9 15l2 2 4-4"></path>
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                  <h1 className="mt-1 mb-3">
                                    {data[
                                      "dim_customers.days_since_last_kyc_review"
                                    ]
                                      ? data[
                                      "dim_customers.days_since_last_kyc_review"
                                      ] + " Days"
                                      : "Null"}
                                  </h1>
                                </div>
                              </div>
                              <div className="card">
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col mt-0">
                                      <h5 className="card-title">
                                        Days Since Last Transaction
                                      </h5>
                                    </div>
                                    <div className="col-auto">
                                      <div className="stat text-primary">
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
                                          className="feather feather-clock align-middle"
                                        >
                                          <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                          ></circle>
                                          <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                  <h1 className="mt-1 mb-3">
                                    {data[
                                      "dim_customers.days_since_last_transaction"
                                    ]
                                      ? data[
                                      "dim_customers.days_since_last_transaction"
                                      ] + " Days"
                                      : "Null"}
                                  </h1>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 mb-4">
                          <div className="card basic-card">
                            <div className="section-title">Contact Details</div>
                            <p>
                              <span>First Name: </span>
                              <span className="value">
                                {data["dim_customers.cust_first_name"] ||
                                  "null"}
                              </span>
                            </p>
                            <p>
                              <span>Middle Name: </span>
                              <span className="value">
                                {data["dim_customers.cust_middle_name"] ||
                                  "null"}
                              </span>
                            </p>
                            <p>
                              <span>Last Name: </span>
                              <span className="value">
                                {data["dim_customers.cust_last_name"] || "null"}
                              </span>
                            </p>
                            <p>
                              <span>Full Name: </span>
                              <span className="value">
                                {data["dim_customers.full_name"] || "null"}
                              </span>
                            </p>
                            <p>
                              <span>Introducer: </span>
                              <span className="value">
                                {data["dim_customers.introducername"] || "null"}
                              </span>
                            </p>
                            <p>
                              <span>Literate/Thumb: </span>
                              <span className="value">
                                {data["dim_customers.education"] || "null"}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="card basic-card">
                            <div className="section-title">Demographics</div>
                            <p>
                              <span>DOB: </span>
                              <span className="value">
                                {convertDateToYMD(
                                  data["dim_customers.cust_dob"]
                                ) || "null"}
                              </span>
                            </p>
                            <p>
                              <span>Gender: </span>
                              <span className="value">
                                {data["dim_customers.gender"] || "null"}
                              </span>
                            </p>
                            <p>
                              <span>Employment Status: </span>
                              <span className="value">
                                {data["dim_customers.employment_status"] ||
                                  "null"}
                              </span>
                            </p>
                            <p>
                              <span>Employer Name: </span>
                              <span className="value">
                                {data["dim_customers.employersname"] || "null"}
                              </span>
                            </p>
                            <p>
                              <span>Home Branch: </span>
                              <span className="value">
                                {data["dim_customers.home_branch"] || "null"}
                              </span>
                            </p>
                            <p>
                              <span>Marital Status: </span>
                              <span className="value">
                                {data["dim_customers.marital_status"] || "null"}
                              </span>
                            </p>
                            <p>
                              <span>Occupation: </span>
                              <span className="value">
                                {data["dim_customers.occupation"] || "null"}
                              </span>
                            </p>
                            <p>
                              <span>Nationality: </span>
                              <span className="value">
                                {data["dim_customers.nationality"] || "null"}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-12 mb-4">
                          <div className="card basic-card">
                            <div className="section-title">Banking</div>
                            <p>
                              <span>Customer Risk Rating: </span>
                              <span className="value">
                                {data["dim_customers.riskrating"] || "null"}
                              </span>
                            </p>
                            <p>
                              <span>Gross Salary Per Month: </span>
                              <span className="value">
                                {data["dim_customers.salary_per_month"] ||
                                  "null"}
                              </span>
                            </p>
                            <p>
                              <span>BlackList Customer: </span>
                              <span className="value">
                                {data["dim_customers.blacklisted"] === "N"
                                  ? "No"
                                  : "Yes"}
                              </span>
                            </p>
                            <p>
                              <span>CIF Created Date: </span>
                              <span className="value">
                                {convertDateToYMD(
                                  data[
                                  "dim_customers.cust_relationship_start_date"
                                  ]
                                ) || "null"}
                              </span>
                            </p>
                            <p>
                              <span>Resident Flag: </span>
                              <span className="value">
                                {data["dim_customers.customernreflg"] === "N"
                                  ? "No"
                                  : "Yes"}
                              </span>
                            </p>
                            <p>
                              <span>Minor Flag: </span>
                              <span className="value">
                                {data["dim_customers.customerminor"] === "N"
                                  ? "No"
                                  : "Yes"}
                              </span>
                            </p>
                            <p>
                              <span>Staff Flag: </span>
                              <span className="value">
                                {data["dim_customers.staffflag"] === "N"
                                  ? "No"
                                  : "Yes"}
                              </span>
                            </p>
                            <p>
                              <span>Staff Employee ID: </span>
                              <span className="value">
                                {data["dim_customers.staffemployeeid"] ||
                                  "null"}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg mb-4">
                          <div className="card basic-card">
                            <div className="section-title">Misc</div>
                            <p>
                              <span>TDS_TBL: </span>
                              <span className="value">
                                {data["dim_customers.tds_tbl"] || "null"}
                              </span>
                            </p>
                            <p>
                              <span>Customer Community: </span>
                              <span className="value">
                                {data["dim_customers.cust_community"] || "null"}
                              </span>
                            </p>
                            <p>
                              <span>Customer Health: </span>
                              <span className="value">
                                {data["dim_customers.cust_hlth"] || "null"}
                              </span>
                            </p>
                            <p>
                              <span>PAN: </span>
                              <span className="value">
                                {data["dim_customers.pan"] || "null"}
                              </span>
                            </p>
                            <p>
                              <span>Status: </span>
                              <span className="value">
                                {data["dim_customers.status"] || "null"}
                              </span>
                            </p>
                            <p>
                              <span>Constitution_Code Desc: </span>
                              <span className="value">
                                {data["dim_customers.constitution_code_desc"] ||
                                  "null"}
                              </span>
                            </p>
                            <p>
                              <span>Constitution_Code: </span>
                              <span className="value">
                                {data["dim_customers.constitution_code"] ||
                                  "null"}
                              </span>
                            </p>
                            <p>
                              <span>Segmentation Class: </span>
                              <span className="value">
                                {data["dim_customers.segmentation_class"] ||
                                  "null"}
                              </span>
                            </p>
                            <p>
                              <span>Introd_Status: </span>
                              <span className="value">
                                {data["dim_customers.introd_status"] || "null"}
                              </span>
                            </p>
                            <p>
                              <span>Purgermarks: </span>
                              <span className="value">
                                {data["dim_customers.purgeremarks"] || "null"}
                              </span>
                            </p>
                            <p>
                              <span>Cardholders: </span>
                              <span className="value">
                                {data["dim_customers.card_holder"] === "N"
                                  ? "No"
                                  : "Yes"}
                              </span>
                            </p>
                            <p>
                              <span>Introducer ID: </span>
                              <span className="value">
                                {data["dim_customers.introducerid"] || "null"}
                              </span>
                            </p>
                            <p>
                              <span>Introducer Name: </span>
                              <span className="value">
                                {data["dim_customers.introducername"] || "null"}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* details info */}
            <div className="tab-pane" id="primary-tab-3" role="tabpanel">
              {/* <h4 className="tab-title">Details Info</h4> */}
              <div className="row">
                <div className="col-sm-12">
                  {/* Registration Card */}
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">Registration Documents</h5>
                    </div>
                    <div className="table-scrollable">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            {/* <th>Document ID</th> */}
                            <th>Type of Document</th>
                            <th className="d-none d-md-table-cell">
                              Issued By
                            </th>
                            <th>Issued Date</th>
                            <th>Validity Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {individualRegData &&
                            individualRegData?.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  {item["dim_document.document_description"]}
                                </td>
                                <td>
                                  {item["dim_document.issued_by"] || "N/A"}
                                </td>
                                <td className="d-none d-md-table-cell">
                                  {convertDateToYMD(
                                    item["dim_document.issued_date"]
                                  ) || "N/A"}
                                </td>
                                <td>
                                  {convertDateToYMD(
                                    item["dim_document.validity_date"]
                                  ) || "N/A"}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Relationship Card */}
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">Individual Relationships</h5>
                    </div>
                    <div className="table-scrollable">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            {/* <th>CIF ID</th> */}
                            <th>Relationship Type</th>
                            <th>Name</th>
                            {/* <th className="d-none d-md-table-cell">Full Name</th>
                          <th>First Name</th>
                          <th>Middle Name</th>
                          <th>Last Name</th>
                          <th>Mobile Number</th>
                          <th>Registration Document Id</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {individualRelData &&
                            individualRelData?.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  {item["dim_indiv_relationship.relation"] ||
                                    "N/A"}
                                </td>
                                <td className="d-none d-md-table-cell">
                                  {item["dim_indiv_relationship.name"] || "N/A"}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Communication Card */}
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">Communication Channel</h5>
                    </div>
                    <div className="table-scrollable">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Communication Channel</th>
                            <th>Contact Detail</th>
                            {/* <th className="d-none d-md-table-cell">Is Primary</th> */}
                            <th>Is Preferred</th>
                            <th>Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {individualCommunicationData &&
                            individualCommunicationData?.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  {
                                    item[
                                    "dim_communications.communication_type"
                                    ]
                                  }
                                </td>
                                <td>
                                  {item["dim_communications.phoneno"] || "N/A"}
                                </td>
                                {/* <td className="d-none d-md-table-cell">
                                {item["dim_communications.is_preferred"] === "Y"
                                  ? "Yes"
                                  : "No"}
                              </td> */}
                                <td>
                                  {item["dim_communications.is_preferred"] ===
                                    "N"
                                    ? "No"
                                    : "Yes"}
                                </td>
                                <td>
                                  {item["dim_communications.email"] || "N/A"}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Address Card */}
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">Address</h5>
                    </div>
                    <div className="table-scrollable">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Address Type</th>
                            <th>Province</th>
                            <th className="d-none d-md-table-cell">City</th>
                            <th>Address Line</th>
                            {/* <th>District</th>
                          <th>City</th>
                          <th>Street</th>
                          <th>House Number</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {individualAddressData &&
                            individualAddressData?.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  {item["dim_cust_address.address_type"] ||
                                    "N/A"}
                                </td>
                                <td>
                                  {item["dim_cust_address.province"] || "N/A"}
                                </td>
                                <td className="d-none d-md-table-cell">
                                  {item["dim_cust_address.city"] || "N/A"}
                                </td>
                                <td>
                                  {item["dim_cust_address.address_line"] ||
                                    "N/A"}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* aggregated insights */}
            <div className="tab-pane" id="primary-tab-4" role="tabpanel">
              {/* <h4 className="tab-title">Aggregated Insights</h4> */}
              <div className="row">
                {/* <div className="col-12 col-lg-6">
                  <div className="card flex-fill w-100">
                    <div className="card-header">
                      <h5 className="card-title">
                        Total Transaction (Vol) from Branch ytd
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="chart chart-sm">
                        <canvas
                          id="chartjs-line"
                          style={{
                            display: "block",
                            width: "405px",
                            height: "300px",
                          }}
                          width="405"
                          height="300"
                          className="chartjs-render-monitor"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="card flex-fill w-100">
                    <div className="card-header">
                      <h5 className="card-title">
                        Total Transaction (Count) from Branch ytd
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="chart chart-sm">
                        <canvas
                          id="chartjs-transaction"
                          style={{
                            display: "block",
                            width: "405px",
                            height: "300px",
                          }}
                          width="405"
                          height="300"
                          className="chartjs-render-monitor"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">
                        Total Transaction (Vol) from Digital Channel ytd
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="chart">
                        <canvas
                          id="chartjs-bar"
                          style={{
                            display: "block",
                            width: "405px",
                            height: "300px",
                          }}
                          width="405"
                          height="300"
                          className="chartjs-render-monitor"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">
                        Total Transaction (Count) from Digital Channel ytd
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="chart">
                        <canvas
                          id="chartjs-bar-count"
                          style={{
                            display: "block",
                            width: "405px",
                            height: "300px",
                          }}
                          width="405"
                          height="300"
                          className="chartjs-render-monitor"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="card flex-fill w-100">
                    <div className="card-header">
                      <h5 className="card-title">Total Interest Paid by YTD</h5>
                    </div>
                    <div className="card-body">
                      <div className="chart chart-sm">
                        <canvas
                          id="chartjs-pie"
                          style={{
                            display: "block",
                            width: "405px",
                            height: "250px",
                          }}
                          width="405"
                          height="250"
                          className="chartjs-render-monitor"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">
                        Total Interest Earning by YTD
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="chart">
                        <canvas
                          id="chartjs-bar1"
                          style={{
                            display: "block",
                            width: "405px",
                            height: "300px",
                          }}
                          width="405"
                          height="300"
                          className="chartjs-render-monitor"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">
                        Total number of unique products/services as of date
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="chart">
                        <canvas
                          id="chartjs-unique-count"
                          style={{
                            display: "block",
                            width: "405px",
                            height: "300px",
                          }}
                          width="405"
                          height="300"
                          className="chartjs-render-monitor"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">
                        Average Product Fees and Commission YTD
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="chart">
                        <canvas
                          id="chartjs-bar3"
                          style={{
                            display: "block",
                            width: "405px",
                            height: "300px",
                          }}
                          width="405"
                          height="300"
                          className="chartjs-render-monitor"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div
                  id="individ-dashboard"
                  style={{ width: "100%", height: "800px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabContent;