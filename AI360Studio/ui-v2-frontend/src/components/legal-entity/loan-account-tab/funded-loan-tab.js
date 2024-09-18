// components/TabContent.js
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Loader from "../../shared/loader";
import legalLoanFetchData from "@/services/legal_loan_service";
import { convertDateToYMD } from "@/lib/utils/date_to_month";
import { useRouter } from "next/router";

const TabContent = (props) => {
  const { individual, legal_id } = props;
  const router = useRouter();
  const { foracid } = router.query;
  const hasFetched = useRef(false);
  const [loading, setLoading] = useState(true);
  const [individualData, setIndividualData] = useState([]);

  const fetchAllData = async () => {
    try {
      // Fetch all data concurrently
      const [basicInfo] = await Promise.all([
        legalLoanFetchData.getfunded_loan_basic_derived_info(foracid),
      ]);
      // Set all data states
      setIndividualData(basicInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardElement = "legal-funded-loan-account-dashboard";
  useEffect(() => {
    if (!hasFetched.current) {
      fetchAllData();
      hasFetched.current = true;
    }
    const filters = {
      foracid: foracid,
      visible: false,
    };

    const embed = async () => {
      const dashboardId = "da6b06c3-6b61-4a40-9843-a2829e426e1c";
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
  }, [foracid]);

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
          <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              href="#primary-tab-5"
              data-bs-toggle="tab"
              role="tab"
              aria-selected="false"
              tabIndex="-1"
            >
              Breakdown
            </a>
          </li>
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
          {!loading && (
            <div
              className="tab-pane active show"
              id="primary-tab-1"
              role="tabpanel"
            >
              {individualData &&
                individualData.map((data, index) => (
                  <div key={index}>
                    {/* <h4 className="tab-title">Basic Info</h4> */}
                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <div className="card basic-card">
                          <p>
                            <span>Loan Account Number</span>
                            <span className="value">
                              {data["dim_gam.acid"] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Account Name</span>
                            <span className="value">
                              {data["dim_gam.acct_name"] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Facility</span>
                            <span className="value">
                              {data["dim_loan_accounts_funded.facility"] ||
                                "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Type</span>
                            <span className="value">
                              {data["dim_loan_accounts_funded.categoryid"] ||
                                "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>RA Unit</span>
                            <span className="value">
                              {data["dim_loan_accounts_funded.ra_unit"] ||
                                "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>glsh code</span>
                            <span className="value">
                              {data["dim_loan_accounts_funded.groupid_code"] ||
                                "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Account Branch</span>
                            <span className="value">
                              {data["dim_loan_accounts_funded.group_name"] ||
                                "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Province</span>
                            <span className="value">
                              {data["dim_loan_accounts_funded.sector_code"] ||
                                "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Sub Province</span>
                            <span className="value">
                              {data[
                                "dim_loan_accounts_funded.sub_sector_code"
                              ] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Customer ID</span>
                            <span className="value">
                              {data["dim_customers.cif_id"] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>NIC Asia Product</span>
                            <span className="value">
                              {data[
                                "dim_loan_accounts_funded.nic_asia_product"
                              ] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Transanction Limit</span>
                            <span className="value">
                              {data[
                                "dim_loan_accounts_funded.sanction_limit"
                              ] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Outdrawing Power</span>
                            <span className="value">
                              {data["dim_loan_accounts_funded.drwng_power"] ||
                                "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Outstanding balance</span>
                            {/* <span className="value">N/A</span> */}
                          </p>
                          <p>
                            <span>Limit sanction date</span>
                            <span className="value">
                              {convertDateToYMD(data[
                                "dim_loan_accounts_funded.limit_sanction_date"
                              ]) || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Limit Expiry date</span>
                            <span className="value">
                              {convertDateToYMD(data[
                                "dim_loan_accounts_funded.limit_expiry_date"
                              ]) || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Review Date</span>
                            <span className="value">
                              {convertDateToYMD(data[
                                "dim_loan_accounts_funded.limit_review_date"
                              ]) || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Multi Banking Code</span>
                            <span className="value">
                              {data[
                                "dim_loan_accounts_funded.multi_banking_code"
                              ] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Sector Code</span>
                            <span className="value">
                              {data["dim_loan_accounts_funded.sector_code"] ||
                                "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Sub Sector Code</span>
                            <span className="value">
                              {data[
                                "dim_loan_accounts_funded.sub_sector_code"
                              ] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Customer Group</span>
                            {/* <span className="value">N/A</span> */}
                          </p>
                          <p>
                            <span>Group Code</span>
                            {/* <span className="value">N/A</span> */}
                          </p>
                          <p>
                            <span>Group ID</span>
                            {/* <span className="value">N/A</span> */}
                          </p>
                          <p>
                            <span>Accrued Interest</span>
                            {/* <span className="value">N/A</span> */}
                          </p>
                          <p>
                            <span>Scheme Code</span>
                            {/* <span className="value">N/A</span> */}
                          </p>
                          <p>
                            <span>Overdue amt</span>
                            {/* <span className="value">N/A</span> */}
                          </p>
                          <p>
                            <span>Full Rate</span>
                            {/* <span className="value">N/A</span> */}
                          </p>
                          <p>
                            <span>Base Rate</span>
                            {/* <span className="value">N/A</span> */}
                          </p>
                          <p>
                            <span>Preference Rate</span>
                            {/* <span className="value">N/A</span> */}
                          </p>
                          <p>
                            <span>Currency</span>
                            <span className="value">
                              {data["dim_loan_accounts_funded.currency"] ||
                                "N/A"}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane"
                      id="primary-tab-2"
                      role="tabpanel"
                    >
                      {/* <h4 className="tab-title">Derived Info</h4> */}
                      <div className="row">
                        <div className="col-md-12 mb-4">
                          <div className="card basic-card">
                            <p>
                              <span>
                                Days Between Account Opening and Loan Transaction

                              </span>
                              <span className="value"> {data["dim_loan_accounts_funded.days_between_account_opening_and_loan_sanction"] ? data["dim_loan_accounts_funded.days_between_account_opening_and_loan_sanction"] + " days" :
                                "N/A"}</span>
                            </p>
                            <p>
                              <span>Limit Expiry days In</span>
                              <span className="value"> {data["dim_loan_accounts_funded.limit_expiry_days_in"] ? data["dim_loan_accounts_funded.limit_expiry_days_in"] + " days" :
                                "N/A"}</span>
                            </p>
                            <p>
                              <span>Days Since Last Renewal</span>
                              {/* <span className="value">365</span> */}
                            </p>
                            <p>
                              <span>
                                Next Interest Demand Remaining Date in
                              </span>
                              {/* <span className="value">30</span> */}
                            </p>
                            <p>
                              <span>Next Principal Demand In</span>
                              {/* <span className="value">60</span> */}
                            </p>
                            <p>
                              <span>Limit Review days In</span>
                              <span className="value"> {data["dim_loan_accounts_funded.limit_review_days_in"] ? data["dim_loan_accounts_funded.limit_review_days_in"] + " days" :
                                "N/A"}</span>
                            </p>
                            <p>
                              <span>Days Since First Overdue Loan Amount</span>
                              {/* <span className="value">45</span> */}
                            </p>
                            <p>
                              <span>Days Past Dues</span>
                              {/* <span className="value">15</span> */}
                            </p>
                            <p>
                              <span>Installment Delay Days</span>
                              {/* <span className="value">10</span> */}
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
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Loan Information</h5>
                  </div>
                  <div className="table-scrollable">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Limit Change History</th>
                          <th>Overdue Details</th>
                          <th className="d-none d-md-table-cell">
                            EMI Details
                          </th>
                          <th>Payment History</th>
                          <th>Insurance Details</th>
                          <th>Interest Rate Changes/Revision History</th>
                          <th>Repayment Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table-primary">
                          <td>
                            Limit increased from $50,000 to $60,000 on
                            2023-05-12
                          </td>
                          <td>Overdue of $1,000 on 2023-04-10</td>
                          <td className="d-none d-md-table-cell">
                            EMI of $500 due monthly
                          </td>
                          <td>Payment of $500 received on 2023-06-01</td>
                          <td>Insured for $60,000 with XYZ Insurance</td>
                          <td>
                            Interest rate revised from 5% to 4.5% on 2023-03-15
                          </td>
                          <td>Repayment started on 2022-01-01</td>
                        </tr>
                        <tr>
                          <td>
                            Limit decreased from $60,000 to $55,000 on
                            2024-01-20
                          </td>
                          <td>Overdue of $500 on 2023-08-15</td>
                          <td className="d-none d-md-table-cell">
                            EMI of $550 due monthly
                          </td>
                          <td>Payment of $550 received on 2023-07-01</td>
                          <td>Insured for $55,000 with ABC Insurance</td>
                          <td>
                            Interest rate revised from 4.5% to 4% on 2024-01-05
                          </td>
                          <td>Repayment due on 2023-12-31</td>
                        </tr>
                        <tr>
                          <td>
                            Limit increased from $55,000 to $65,000 on
                            2024-06-30
                          </td>
                          <td>Overdue of $1,200 on 2024-04-12</td>
                          <td className="d-none d-md-table-cell">
                            EMI of $600 due monthly
                          </td>
                          <td>Payment of $600 received on 2024-05-01</td>
                          <td>Insured for $65,000 with DEF Insurance</td>
                          <td>
                            Interest rate revised from 4% to 3.5% on 2024-06-10
                          </td>
                          <td>Repayment due on 2024-11-30</td>
                        </tr>
                        <tr>
                          <td>
                            Limit decreased from $65,000 to $50,000 on
                            2025-02-15
                          </td>
                          <td>Overdue of $700 on 2024-09-20</td>
                          <td className="d-none d-md-table-cell">
                            EMI of $450 due monthly
                          </td>
                          <td>Payment of $450 received on 2024-10-01</td>
                          <td>Insured for $50,000 with GHI Insurance</td>
                          <td>
                            Interest rate revised from 3.5% to 3% on 2025-01-01
                          </td>
                          <td>Repayment due on 2025-06-30</td>
                        </tr>
                        <tr>
                          <td>
                            Limit increased from $50,000 to $70,000 on
                            2025-12-01
                          </td>
                          <td>Overdue of $900 on 2025-05-25</td>
                          <td className="d-none d-md-table-cell">
                            EMI of $650 due monthly
                          </td>
                          <td>Payment of $650 received on 2025-06-01</td>
                          <td>Insured for $70,000 with JKL Insurance</td>
                          <td>
                            Interest rate revised from 3% to 2.5% on 2025-11-10
                          </td>
                          <td>Repayment due on 2026-01-31</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="primary-tab-4" role="tabpanel">
            <div
              id="legal-funded-loan-account-dashboard"
              style={{ width: "100%", height: "800px" }}
            />
          </div>
        </div>
        <div className="tab-pane" id="primary-tab-5" role="tabpanel">
          <h4 className="tab-title">Breakdown Info</h4>
          <div className="row">
            <div className="col-md-12 col-sm-6 mb-4">
              <div className="card basic-card">
                <p>
                  <span>Total Interest Income:</span>
                  <span className="value">500,000</span>
                </p>
                <p>
                  <span>Total Fees and Commission:</span>
                  <span className="value">30,000</span>
                </p>
                <p>
                  <span>Count of Revised Limit:</span>
                  <span className="value">3</span>
                </p>
                <p>
                  <span>Count of Revised Interest Rate:</span>
                  <span className="value">2</span>
                </p>
                <p>
                  <span>Count of Delayed Payments:</span>
                  <span className="value">5</span>
                </p>
                <p>
                  <span>Total Overdue Amount:</span>
                  <span className="value">50,000</span>
                </p>
                <p>
                  <span>
                    Count of Missed Installment/Installment Due (Q/M):
                  </span>
                  <span className="value">4</span>
                </p>
                <p>
                  <span>Count of Principal Demand Due Days:</span>
                  <span className="value">10</span>
                </p>
                <p>
                  <span>Total Penal Amount:</span>
                  <span className="value">2,000</span>
                </p>
                <p>
                  <span>Count of Penal Days:</span>
                  <span className="value">15</span>
                </p>
                <p>
                  <span>Utilization Percentage:</span>
                  <span className="value">85%</span>
                </p>
                <p>
                  <span>Avg Time to Approval:</span>
                  <span className="value">5 days</span>
                </p>
                <p>
                  <span>Avg Processing Time:</span>
                  <span className="value">3 days</span>
                </p>
                <p>
                  <span>Count of Limit Expired Loans:</span>
                  <span className="value">1</span>
                </p>
                <p>
                  <span>Count of Overdue Days:</span>
                  <span className="value">20</span>
                </p>
                <p>
                  <span>Count of Interest Demand Due Days:</span>
                  <span className="value">7</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabContent;