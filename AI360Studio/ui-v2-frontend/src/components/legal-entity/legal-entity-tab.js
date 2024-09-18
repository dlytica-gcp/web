// components/TabContent.js
import { useEffect, useState, useRef, useCallback } from "react";
import { renderCharts, destroyCharts } from "../charts/individual-chart";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import Loader from "../../components/shared/loader";
import legalFetchData from "@/services/legal_service";
import supersetService from "@/services/superset_service";
import { convertDateToYMD } from "@/lib/utils/date_to_month";

const TabContent = (props) => {
  const { legal_id, detailsInfo, legal } = props;
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const [legalData, setLegalData] = useState([]);
  const [legalRegData, setLegalRegData] = useState([]);
  const [legalCommunicationData, setLegalCommunicationData] = useState([]);
  const [legaladdressData, setLegalAddressData] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     // Fetch the individual data
  //     const result = await legalFetchData.get_aggregatedinsights(legal_id);
  //     const digitalData = result.filter(
  //       (item) => item["fact_transactions.tran_channel_type"] === "DIGITAL"
  //     );

  //     const inBranchData = result.filter(
  //       (item) => item["fact_transactions.tran_channel_type"] === "IN_BRANCH"
  //     );

  //     // Extract data for DIGITAL
  //     const digitalLabels = digitalData.map(
  //       (item) => item["fact_transactions.tran_date_date_part"]
  //     );
  //     const digitalTxnCountData = digitalData.map(
  //       (item) => item["fact_transactions.txn_count"]
  //     );
  //     const digitalTranAmtVolData = digitalData.map(
  //       (item) => item["fact_transactions.tran_amt_vol"]
  //     );

  //     // Extract data for IN_BRANCH
  //     const inBranchLabels = inBranchData.map(
  //       (item) => item["fact_transactions.tran_date_date_part"]
  //     );
  //     const inBranchTxnCountData = inBranchData.map(
  //       (item) => item["fact_transactions.txn_count"]
  //     );
  //     const inBranchTranAmtVolData = inBranchData.map(
  //       (item) => item["fact_transactions.tran_amt_vol"]
  //     );
  //     destroyCharts();
  //     renderCharts(
  //       (lineX = inBranchLabels),
  //       (lineY = inBranchTranAmtVolData),
  //       (transactionX = inBranchLabels),
  //       (transactionY = inBranchTxnCountData),
  //       (barX = digitalLabels),
  //       (barY = digitalTranAmtVolData),
  //       (bar_countX = digitalLabels),
  //       (bar_countY = digitalTxnCountData)
  //     );
  //   } catch (error) {
  //     console.error("Error fetching legal data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [legal_id]);

  const fetchAllData = useCallback(async () => {
    try {
      // Fetch all data concurrently
      const [basicInfo, regData, commData, addressData] = await Promise.all([
        legalFetchData.get_basic_derived_info(legal_id),
        legalFetchData.get_registration_detail_info(legal_id),
        legalFetchData.get_communication_detail_info(legal_id),
        legalFetchData.get_address_detail_info(legal_id),
      ]);

      // Set all data states
      setLegalData(basicInfo);
      console.log("legal basic derived", basicInfo);
      setLegalRegData(regData);
      setLegalCommunicationData(commData);
      setLegalAddressData(addressData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [legal_id]);

  const dashboardElement = "legal-dashboard";
  useEffect(() => {
    fetchAllData();
    if (!hasFetched.current) {
      hasFetched.current = true;
    }
    const filters = {
      cif_id: legal_id,
      visible: false,
    };

    const embed = async () => {
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
  }, [legal_id, fetchAllData]);

  // const cubeFetchData = async () => {
  //   try {
  //   setLoading(true);
  //   const response = await axios.post(
  //     "http://4.206.122.42:4000/cubejs-api/v1/load",
  //     {
  //       query: {
  //         dimensions: [
  //           "fact_transactions.cif_id",
  //           "fact_transactions.tran_channel_type",
  //           "fact_transactions.tran_date_date_part",
  //         ],
  //         order: {
  //           "fact_transactions.txn_count": "desc",
  //         },
  //         measures: [
  //           "fact_transactions.txn_count",
  //           "fact_transactions.tran_amt_vol",
  //         ],
  //         timeDimensions: [
  //           {
  //             dimension: "fact_transactions.tran_date_timestamp",
  //             dateRange: "This year",
  //           },
  //         ],
  //         filters: [
  //           {
  //             member: "dim_customers.cif_id",
  //             operator: "equals",
  //             values: [legal_id],
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       headers: {
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjM1OTMzMjEsImV4cCI6MTcyMzY3OTcyMX0.UeOIIP68_y2oTnSsGJFmSLscxyaBbzyAxC1rFTkLkUY",
  //       },
  //     }
  //   );
  //   const result = await response.data.data;
  //   destroyCharts();
  //   renderCharts(result);

  //   // Process the data and update the component state
  //   } catch (error) {
  //     console.error("Error fetching data:", error);

  //   } finally {
  //     setLoading(false); // Set loading to false when fetching is complete
  //   }
  // };
  return (
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
          {loading && (
            <div className="d-flex justify-content-center mb-4">
              <Loader />
            </div>
          )}
          {/* basic/derived info */}
          {!loading && (
            <div
              className="tab-pane active show"
              id="primary-tab-1"
              role="tabpanel"
            >
              {legalData &&
                legalData?.map((data, index) => (
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
                                  ] || "N/A"}
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
                                  ] || "N/A"}
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
                                      Days Since Entity Registration
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
                                    "dim_customer_legal_entity_details.days_since_entity_registration"
                                  ] || "N/A"}
                                </h1>
                              </div>
                            </div>
                            <div className="card">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col mt-0">
                                    <h5 className="card-title">
                                      Last Transaction Time
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
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                                <h1 className="mt-1 mb-3">
                                  {data[
                                    "dim_customers.days_since_last_transaction"
                                  ] || "N/A"}
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-4">
                        <div className="card basic-card">
                          <p>
                            <span>Corporate Name: </span>
                            <span className="value">
                              {data[
                                "dim_customer_legal_entity_details.corporate_name"
                              ] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>CIF: </span>
                            <span className="value">
                              {data[
                                "dim_customer_legal_entity_details.cif_id"
                              ] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Entity Registration Date: </span>
                            <span className="value">
                              {convertDateToYMD(
                                data[
                                "dim_customer_legal_entity_details.entity_registration_date"
                                ]
                              ) || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Nature of Business: </span>
                            <span className="value">
                              {data[
                                "dim_customer_legal_entity_details.nature_of_business"
                              ] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Type of EntityGroup: </span>
                            <span className="value">
                              {data[
                                "dim_customer_legal_entity_details.type_of_entity"
                              ] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Group Name: </span>
                            <span className="value">
                              {data[
                                "dim_customer_legal_entity_details.group_name"
                              ] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Key Contact Person Name: </span>
                            <span className="value">
                              {data[
                                "dim_customer_legal_entity_details.keycontact_personname"
                              ] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Mobile Number: </span>
                            <span className="value">N/A</span>
                          </p>
                          <p>
                            <span>Country of Incorporation: </span>
                            <span className="value">N/A</span>
                          </p>
                          <p>
                            <span>Corporate Key: </span>
                            <span className="value">N/A</span>
                          </p>
                          <p>
                            <span>Rating: </span>
                            <span className="value">N/A</span>
                          </p>
                          <p>
                            <span>PAN: </span>
                            <span className="value">N/A</span>
                          </p>
                          <p>
                            <span>Constitution_Code: </span>
                            <span className="value">N/A</span>
                          </p>
                          <p>
                            <span>Segmentation Class: </span>
                            <span className="value">N/A</span>
                          </p>
                          <p>
                            <span>Introducer Id: </span>
                            <span className="value">N/A</span>
                          </p>
                          <p>
                            <span>Purgermarks: </span>
                            <span className="value">N/A</span>
                          </p>
                          <p>
                            <span>Customer Health: </span>
                            <span className="value">N/A</span>
                          </p>
                          <p>
                            <span>TDS TBL: </span>
                            <span className="value">N/A</span>
                          </p>
                          <p>
                            <span>Subsegment: </span>
                            <span className="value">
                              {data[
                                "dim_customer_legal_entity_details.subsegment"
                              ] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Business Type: </span>
                            <span className="value">
                              {data[
                                "dim_customer_legal_entity_details.business_type"
                              ] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Sector: </span>
                            <span className="value">
                              {data[
                                "dim_customer_legal_entity_details.sector"
                              ] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Subsector: </span>
                            <span className="value">
                              {data[
                                "dim_customer_legal_entity_details.subsector"
                              ] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>TAXID: </span>
                            <span className="value">TX123456789</span>
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
                          <th>Document ID</th>
                          <th>Type of Document</th>
                          <th className="d-none d-md-table-cell">Issued By</th>
                          <th>Issued Date</th>
                          <th>Validity Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {legalRegData &&
                          legalRegData?.map((item, index) => (
                            <tr key={index}>
                              <td>{item["dim_document.document_sk"]}</td>
                              <td>
                                {item["dim_document.document_description"]}
                              </td>
                              <td className="d-none d-md-table-cell">
                                {item["dim_document.issued_by"]}
                              </td>
                              <td>
                                {convertDateToYMD(
                                  item["dim_document.issued_date"]
                                ) || "null"}
                              </td>
                              <td>
                                {convertDateToYMD(
                                  item["dim_document.validity_date"]
                                ) || "null"}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Relationship Card */}

                {/* Communication Card */}
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Communication Channels</h5>
                  </div>
                  <div className="table-scrollable">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Communication Channel</th>
                          <th>Contact Detail</th>
                          <th className="d-none d-md-table-cell">Is Primary</th>
                          <th>Is Preferred</th>
                          <th>Unsubscribed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {legalCommunicationData &&
                          legalCommunicationData?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {item[
                                  "dim_communications.communication_type"
                                ] || "N/A"}
                              </td>
                              <td>
                                {item["dim_communications.phoneno"] || "N/A"}
                              </td>
                              <td className="d-none d-md-table-cell">
                                {item["dim_communications.is_preferred"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {item["dim_communications.is_preferred"] === "N"
                                  ? "No"
                                  : "Yes"}
                              </td>
                              <td>
                                {item["dim_communications.unsubscribed"] ||
                                  "N/A"}
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
                          <th>Ward</th>
                          <th>Address Type</th>
                          <th className="d-none d-md-table-cell">Country</th>
                          <th>Province</th>
                          <th>District</th>
                          <th>City</th>
                          <th>Street</th>
                          <th>House Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        {legaladdressData &&
                          legaladdressData?.map((item, index) => (
                            <tr key={index}>
                              <td>{item["dim_cust_address.ward"] || "N/A"}</td>
                              <td>
                                {item["dim_cust_address.address_type"] || "N/A"}
                              </td>
                              <td className="d-none d-md-table-cell">
                                {item["dim_cust_address.country"] || "N/A"}
                              </td>
                              <td>
                                {item["dim_cust_address.province"] || "N/A"}
                              </td>
                              <td>
                                {item["dim_cust_address.address_line"] || "N/A"}
                              </td>
                              <td>{item["dim_cust_address.city"] || "N/A"}</td>
                              <td>
                                {item["dim_cust_address.address_city"] || "N/A"}
                              </td>
                              <td>
                                {item["dim_cust_address.house_number"] || "N/A"}
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
              {/* Filter Form */}
              {/* <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Filters</h5>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="year" className="form-label">
                          Year
                        </label>
                        <select
                          id="year"
                          name="year"
                          className="form-select"
                          value={filters.year}
                          onChange={handleFilterChange}
                        >
                          <option value="">Select Year</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="month" className="form-label">
                          Month
                        </label>
                        <select
                          id="month"
                          name="month"
                          className="form-select"
                          value={filters.month}
                          onChange={handleFilterChange}
                        >
                          <option value="">Select Month</option>
                          {months.map((month, index) => (
                            <option key={index} value={index + 1}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="branch" className="form-label">
                          Branch
                        </label>
                        <select
                          id="branch"
                          name="branch"
                          className="form-select"
                          value={filters.branch}
                          onChange={handleFilterChange}
                        >
                          {branches.map((branch) => (
                            <option key={branch} value={branch}>
                              {branch}
                            </option>
                          ))}
                        </select>
                      </div>
                    </form>
                  </div>
                </div>
              </div> */}
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
                id="legal-dashboard"
                style={{ width: "100%", height: "800px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabContent;