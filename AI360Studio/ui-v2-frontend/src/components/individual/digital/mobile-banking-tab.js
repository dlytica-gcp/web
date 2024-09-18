// components/TabContent.js
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Loader from "../../shared/loader";
import mobileFetchData from "@/services/mobile_banking_service";
import supersetService from "@/services/superset_service";
import { convertDateToYMD } from "@/lib/utils/date_to_month";

const TabContent = (props) => {
  const { mobilebanking, inv_id } = props;
  const hasFetched = useRef(false);
  const [loading, setLoading] = useState(true);
  const [mobilebankingData, setMobilebankingData] = useState([]);
  const fetchAllData = async () => {
    try {
      // Fetch all data concurrently
      const [basicInfo] = await Promise.all([
        mobileFetchData.getindivid_mobile_basic_derived_info(inv_id),
      ]);

      // Set all data states
      setMobilebankingData(basicInfo);
      console.log(basicInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const dashboardElement = "individ-mobile-banking-dashboard";
  useEffect(() => {

    fetchAllData();
    if (!hasFetched.current) {
      hasFetched.current = true

      const filters = {
        cif_id: inv_id,
        // nepali_fiscal_year: "2080/2081",
      };

      const embed = async () => {
        const dashboardId = "894383a3-11a2-434f-8e82-f545e051e81c";
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
    }
    hasFetched.current = true;
  }, [inv_id, mobilebankingData]);
  // useEffect(() => {
  //     renderCharts();
  //   }, []);

  // Fetch data from the API
  // const fetchData = async () => {
  //   try {
  //     const token = Cookies.get("token");
  //     console.log(c_id);
  //     const response = await axios.get(
  //       `http://127.0.0.1:8000/api/individual_info/${c_id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     // setIndividual(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  // useEffect(() => {
  //   // feather.replace();
  //   fetchData();
  // }, []);

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
          {/* <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              href="#primary-tab-3"
              data-bs-toggle="tab"
              role="tab"
              aria-selected="false"
              tabIndex="-1"
            >
              Details Info
            </a>
          </li> */}
          {/* <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              href="#primary-tab-4"
              data-bs-toggle="tab"
              role="tab"
              aria-selected="false"
              tabIndex="-1"
            >
              Breakdown Info
            </a>
          </li> */}
          <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              href="#primary-tab-5"
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
          {!loading && (
            <div
              className="tab-pane active show"
              id="primary-tab-1"
              role="tabpanel"
            >
              {mobilebankingData && mobilebankingData.map((data, index) => (
                <div key={`${data.c_id}-${index}`}>
                  {/* <h4 className="tab-title">Basic Info</h4> */}
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <div className="card basic-card">
                        <p>
                          <span>Registered Mobile Number :</span>
                          <span className="value">
                            {data["dim_mob_customers.mobile_number"] || "N/A"}
                          </span>
                        </p>
                        <p>
                          <span>CIF :</span>
                          <span className="value">
                            {data["dim_mob_customers.cbs_id"] || "N/A"}
                          </span>
                        </p>
                        <p>
                          <span>Primary Account :</span>
                          <span className="value">
                            {data["dim_mob_bank_account.account_number"] ||
                              "N/A"}
                          </span>
                        </p>
                        <p>
                          <span>Registered On :</span>
                          <span className="value">
                            {convertDateToYMD(data["dim_mob_bank_account.added_date"]) || "N/A"}
                          </span>
                        </p>
                        <p>
                          <span>Profile :</span>
                          <span className="value">{data["dim_mob_profile.profile_name"] || "N/A"}</span>
                        </p>
                        {/* <p>
                          <span>Block Status :</span>
                          <span className="value">N/A</span>
                        </p> */}
                        <p>
                          <span>Block Reason :</span>
                          <span className="value">{data["dim_mob_application_user.login_block_remarks"] || "N/A"}</span>
                        </p>
                        <p>
                          <span>Next Renewal Date:</span>
                          <span className="value">
                            {convertDateToYMD(data["dim_mob_bank_account.renew_date"]) || "N/A"}
                          </span>
                        </p>
                        <p>
                          <span>First Login Date:</span>
                          <span className="value">
                            {" "}
                            {convertDateToYMD(data[
                              "dim_mob_customer_login.first_login_date_date_part"
                            ]) || "N/A"}
                          </span>
                        </p>
                        <p>
                          <span>First Financial Txn Date:</span>
                          <span className="value">
                            {convertDateToYMD(data["dim_mob_customers.first_txn_date"]) || "N/A"}
                          </span>
                        </p>
                        <p>
                          <span>Security Question Setup:</span>
                          <span className="value">
                            {data["dim_mob_customers.has_security_question"]
                              ? "Yes"
                              : "No"}
                          </span>
                        </p>
                        <p>
                          <span>Blocked Date:</span>
                          <span className="value"> {" "}
                            {convertDateToYMD(data[
                              "dim_mob_application_user.login_block_date"
                            ]) || "N/A"}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane" id="primary-tab-2" role="tabpanel">
                    {/* <h4 className="tab-title">Derived Info</h4> */}
                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <div className="basic-card card">
                          <p>
                            <span>
                              MobBank Registration Time from AC Opening :
                            </span>
                            <span className="value"> {data["dim_mob_customers.mob_reg__time_from_acopen"] ? data["dim_mob_customers.mob_reg__time_from_acopen"] + " days" : "N/A"}</span>
                          </p>
                          <p>
                            <span>MobBank Login Time From Created Date :</span>
                            <span className="value"> {data["dim_mob_customers.first_login_from_creation"] ? data["dim_mob_customers.first_login_from_creation"] + " days" : "N/A"}</span>
                          </p>

                          <p>
                            <span>Renew since :</span>
                            <span className="value"> {data["dim_mob_customers.renew_since"] ? data["dim_mob_customers.renew_since"] + " days" : "N/A"}</span>
                          </p>
                          <p>
                            <span>First Transaction Since :</span>
                            <span className="value"> {data["dim_mob_customers.first_txn_from_creation"] ? data["dim_mob_customers.first_txn_from_creation"] + " days" : "N/A"}</span>
                          </p>
                          <p>
                            <span>First Login Since :</span>
                            <span className="value"> {data["dim_mob_customers.first_login_from_creation"] ? data["dim_mob_customers.first_login_from_creation"] + " days" : "N/A"}</span>
                          </p>
                          <p>
                            <span>Blocked Since :</span>
                            <span className="value"> {data["dim_mob_customers.blocked_since"] ? data["dim_mob_customers.blocked_since"] + " days" : "N/A"}</span>
                          </p>
                          <p>
                            <span>
                              Days Between Account Creation and Approved :
                            </span>
                            <span className="value"> {data["dim_mob_customers.days_bet_approved_created"] ? data["dim_mob_customers.days_bet_approved_created"] + " days" : "N/A"}.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="tab-pane" id="primary-tab-3" role="tabpanel">
            {/* <h4 className="tab-title">Details Info</h4> */}
            <div className="row">
              <div className="col-sm-12">
                {/* Funded Loan Table */}
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Funded Loan</h5>
                  </div>
                  <div className="table-scrollable">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Account No</th>
                          <th>Scheme Type</th>
                          <th className="d-none d-md-table-cell">RAUNIT</th>
                          <th>Scheme Code</th>
                          <th>Scheme Desc</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <a href="#">11</a>
                          </td>
                          <td>gg</td>

                          <td className="d-none d-md-table-cell">hbxh</td>
                          <td>N/A</td>
                          <td>shbdhj</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="primary-tab-4" role="tabpanel">
            {/* <h4 className="tab-title">Breakdown Info</h4> */}
            <div className="row">
              <div className="col-sm-6 col-xxl-6 col-md-12">
                <div className="breakdown-card card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Funded Loan</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <span className="label">Total No of Loans:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Total Loan Amount:</span>
                      <span className="value">$2,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Total Transaction Limit:</span>
                      <span className="value">$150</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">
                        Total Outdrawing Power Limit:
                      </span>
                      <span className="value">50</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">
                        Total Outstanding Balance limit:
                      </span>
                      <span className="value">60</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Total Overdue amount:</span>
                      <span className="value">$5,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">
                        Total Principal Overdue amt:
                      </span>
                      <span className="value">$7,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Total Interest Overdue Amt:</span>
                      <span className="value">$100</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Total Interest Paid:</span>
                      <span className="value">$5,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Total Penal Amount:</span>
                      <span className="value">$7,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">
                        Count of missed installment:
                      </span>
                      <span className="value">$100</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="primary-tab-5" role="tabpanel">
            {/* <h4 className="tab-title">Aggregated Insights</h4> */}
            <div className="row">
              <div
                id="individ-mobile-banking-dashboard"
                style={{ width: "100%", height: "800px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default TabContent;