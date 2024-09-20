// components/TabContent.js
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import supersetService from "@/services/superset_service";
import { renderCharts, destroyCharts } from "../../charts/individual-chart";
import Loader from "../../shared/loader";
import legalDepositFetchData from "@/services/legal_deposit_service";
import { useRouter } from "next/router";
const TabContent = (props) => {
  const { individual, legal_id } = props;
  const router = useRouter();
  const { foracid, cif_id } = router.query; // Get the acid from the URL query
  const hasFetched = useRef(false);
  const [loading, setLoading] = useState(true);
  const [individualData, setIndividualData] = useState([]);
  const [lienData, setLienData] = useState([]);
  const [interestRateData, setInterestRateData] = useState([]);
  const [nomineeData, setNomineeData] = useState([]);
  const [signatoriesData, setSignatoriesData] = useState([]);
  const fetchData = async () => {
    try {
      // Fetch the individual data
      const result = await legalDepositFetchData.getSavingDepos("10000050");

      const depositDataSavings = result.filter(
        (item) =>
          item["dim_product.product_scheme_category"] === "Deposit" &&
          item["dim_product.product_scheme_sub_category"] === "Savings"
      );
      // TODO: needs to be kept in respective components
      // const depositDataFixed = result.filter(
      //   (item) =>
      //     item["dim_product.product_scheme_category"] === "Deposit" &&
      //     item["dim_product.product_scheme_sub_category"] === "Fixed"
      // );
      // const LoanData = result.filter(
      //   (item) => item["dim_product.product_scheme_category"] === "Loan"
      // );
      // Extract data for Deposit
      const depositLabels = depositDataSavings.map(
        (item) => item["fact_transactions.tran_date_date_part"]
      );
      const depositDebitTransVol = depositDataSavings.map(
        (item) => item["fact_transactions.total_debit_tran_vol"]
      );
      const depositDebitTransCount = depositDataSavings.map(
        (item) => item["fact_transactions.total_debit_tran_count"]
      );
      const depositCreditTransCount = depositDataSavings.map(
        (item) => item["fact_transactions.total_credit_tran_count"]
      );

      const depositCreditTransVol = depositDataSavings.map(
        (item) => item["fact_transactions.total_credit_tran_vol"]
      );

      // TODO: Extract data for Loan
      // const loanLabels = LoanData.map(
      //   (item) => item["fact_transactions.tran_date_date_part"]
      // );
      // const loanDebitTransVol = LoanData.map(
      //   (item) => item["fact_transactions.total_debit_tran_vol"]
      // );
      // const loanDebitTransCount = LoanData.map(
      //   (item) => item["fact_transactions.total_debit_tran_count"]
      // );
      // const loanCreditTransCount = LoanData.map(
      //   (item) => item["fact_transactions.total_credit_tran_count"]
      // );
      // const loanCreditTransVol = LoanData.map(
      //   (item) => item["fact_transactions.total_credit_tran_vol"]
      // );

      destroyCharts();
      renderCharts({
        lineX: depositLabels,
        lineY: depositDebitTransVol,
        transactionX: depositLabels,
        transactionY: depositDebitTransCount,
        barX: depositLabels,
        barY: depositCreditTransCount,
        bar_countX: depositLabels,
        bar_countY: depositCreditTransVol,
      });
    } catch (error) {
      console.error("Error fetching saving deposit data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllData = async () => {
    try {
      // Fetch all data concurrently
      const [basicInfo, lienData, interestrate, nominee, signatories] =
        await Promise.all([
          legalDepositFetchData.getsavingdepo_basicinfo_derived(
            foracid,
            cif_id,
            "Savings"
          ),
          legalDepositFetchData.getsaving_deposit_lien_details(foracid, cif_id),
          legalDepositFetchData.getsaving_deposit_interest_rate_details(
            foracid,
            cif_id
          ),
          legalDepositFetchData.getsaving_deposit_nominee_details(
            foracid,
            cif_id
          ),
          legalDepositFetchData.getsaving_deposit_signatories_details(
            foracid,
            cif_id
          ),
        ]);

      // Filter basicInfo based on specific conditions
      // const filteredBasicInfo = basicInfo.filter(
      //   (item) =>
      //     item["dim_product.product_scheme_category"] === "Deposit" &&
      //     item["dim_product.product_scheme_sub_category"] === "Savings"
      // );

      // Set all data states
      setIndividualData(basicInfo);
      setLienData(lienData);
      setInterestRateData(interestrate);
      setNomineeData(nominee);
      setSignatoriesData(signatories);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const dashboardElement = "legal-saving-deposit-dashboard";
  useEffect(() => {
    // if (foracid && cif_id) {
    fetchAllData();
    // }
    if (!hasFetched.current) {
      const filters = {
        cif_id: cif_id,
        foracid: foracid,
        product_scheme_sub_category: "Savings",
      };

      const embed = async () => {
        const dashboardId = "1ec06ade-a8a3-4f4a-9d0f-6c1c577f3c4b";
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
      hasFetched.current = true;
    }
  }, [foracid, cif_id]);

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
                  <div key={`${data.c_id}-${index}`}>
                    {/* <h4 className="tab-title">Basic Info</h4> */}
                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <div className="card basic-card">
                          <p>
                            <span>Account Name :</span>
                            <span className="value">
                              {data["dim_gam.acct_name"] || "null"}
                            </span>
                          </p>
                          <p>
                            <span>Account Number :</span>
                            <span className="value">
                              {data["dim_gam.foracid"] || "null"}
                            </span>
                          </p>
                          <p>
                            <span>Scheme Type :</span>
                            <span className="value">
                              {data[
                                "dim_product.product_scheme_sub_category"
                              ] || "null"}
                            </span>
                          </p>
                          <p>
                            <span>Scheme Code :</span>
                            <span className="value">
                              {data["dim_product.product_scheme_code"] ||
                                "null"}
                            </span>
                          </p>
                          <p>
                            <span>Scheme Description:</span>
                            <span className="value">
                              {data["dim_product.product_scheme_description"] ||
                                "null"}
                            </span>
                          </p>
                          <p>
                            <span>Account Open Date:</span>
                            <span className="value">
                              {data["dim_gam.acct_opn_date"] || "null"}
                            </span>
                          </p>
                          <p>
                            <span>Account Status:</span>
                            <span className="value">
                              {data["dim_gam.account_status"] || "null"}
                            </span>
                          </p>
                          <p>
                            <span>Account Balance:</span>
                            <span className="value">
                              {data["dim_gam.account_balance"] || "null"}
                            </span>
                          </p>
                          <p>
                            <span>Interest Rate :</span>
                            <span className="value">
                              {" "}
                              {data["dim_gam.interest_rate"] || "null"}
                            </span>
                          </p>
                          <p>
                            <span>Total Lien Amount:</span>
                            <span className="value">
                              {" "}
                              {data["dim_gam.lien_amt"] || "-"}
                            </span>
                          </p>
                          <p>
                            <span>Dormant Status:</span>
                            <span className="value">
                              {data["dim_deposit_accounts.dormant_status"] ||
                                "No"}
                            </span>
                          </p>
                          <p>
                            <span>Dormant Date :</span>
                            <span className="value">
                              {data["dim_deposit_accounts.dormant_date"] || "-"}
                            </span>
                          </p>
                          <p>
                            <span>Min Balance:</span>
                            <span className="value">
                              {data["dim_deposit_accounts.minimum_balance"] ||
                                "-"}
                            </span>
                          </p>
                          <p>
                            <span>Available Amount:</span>
                            <span className="value">
                              {data["dim_deposit_accounts.available_amount"] ||
                                "-"}
                            </span>
                          </p>
                          <p>
                            <span>Close Status :</span>
                            <span className="value">
                              {data["dim_gam.acct_cls_flg"] === "Y"
                                ? "Closed"
                                : "Open"}
                            </span>
                          </p>
                          <p>
                            <span>Last Txn Date:</span>
                            <span className="value">
                              {data["dim_gam.last_transaction_date"] || "-"}
                            </span>
                          </p>
                          <p>
                            <span>Last Digital Txn Date:</span>
                            <span className="value">
                              {data["dim_gam.last_digital_transaction_date"] ||
                                "-"}
                            </span>
                          </p>
                          <p>
                            <span>Last Branch Txn Date :</span>
                            <span className="value">
                              {data["dim_gam.last_branch_transaction_date"] ||
                                "-"}
                            </span>
                          </p>
                          <p>
                            <span>Account Branch :</span>
                            <span className="value">
                              {data["dim_branch.branch_description"] || "-"}
                            </span>
                          </p>
                          {/* <p>
                            <span>Transaction Limit:</span>
                            <span className="value">$50,000</span>
                          </p> */}
                          <p>
                            <span>Freeze Status:</span>
                            <span className="value">
                              {data["dim_deposit_accounts.freeze_status"] ===
                              "N"
                                ? "No"
                                : "Yes"}
                            </span>
                          </p>
                          <p>
                            <span>Freeze Code :</span>
                            <span className="value">
                              {data["dim_deposit_accounts.freeze_code"] || "-"}
                            </span>
                          </p>
                          <p>
                            <span>Freeze Reason:</span>
                            <span className="value">
                              {data["dim_deposit_accounts.freeze_reason"] ||
                                "-"}
                            </span>
                          </p>
                          <p>
                            <span>Last Freeze Date:</span>
                            <span className="value">
                              {data["dim_deposit_accounts.last_freeze_date"] ||
                                "-"}
                            </span>
                          </p>
                          <p>
                            <span>Last Unfreeze Date :</span>
                            <span className="value">
                              {data[
                                "dim_deposit_accounts.last_unfreeze_date"
                              ] || "-"}
                            </span>
                          </p>
                          <p>
                            <span>First Customer Induced Txn Date :</span>
                            <span className="value">
                              {data[
                                "dim_deposit_accounts.first_customer_induced_transaction_date"
                              ] || "-"}
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
                            {/* <p>
                              <span>First Account From CIF Creation :</span>
                              <span className="value">
                                {data[
                                  "fact_transaction_details.first_account_from_cif_creation"
                                ] || "-"}
                              </span>
                            </p> */}
                            <p>
                              <span>First Account Since :</span>
                              <span className="value">
                                {data["dim_customers.account_relationship_days"]
                                  ? data[
                                      "dim_customers.account_relationship_days"
                                    ] + " days"
                                  : "-"}
                              </span>
                            </p>
                            <p>
                              <span>Dormant Since :</span>
                              <span className="value">
                                {data["dim_deposit_accounts.days_since_dormant"]
                                  ? data[
                                      "dim_deposit_accounts.days_since_dormant"
                                    ] + " days"
                                  : "-"}
                              </span>
                            </p>
                            <p>
                              <span>Freeze Since :</span>
                              <span className="value">
                                {data["dim_deposit_accounts.days_since_freeze"]
                                  ? data[
                                      "dim_deposit_accounts.days_since_freeze"
                                    ] + " days"
                                  : "-"}
                              </span>
                            </p>
                            <p>
                              <span>Last Customer Induced Transaction:</span>
                              <span className="value">
                                {data[
                                  "dim_gam.days_since_last_customer_induced_transaction"
                                ]
                                  ? data[
                                      "dim_gam.days_since_last_customer_induced_transaction"
                                    ] + " days"
                                  : "-"}
                              </span>
                            </p>
                            <p>
                              <span>Last Digital Txn Since:</span>
                              <span className="value">
                                {data[
                                  "dim_gam.days_since_last_digital_transaction"
                                ]
                                  ? data[
                                      "dim_gam.days_since_last_digital_transaction"
                                    ] + " days"
                                  : "-"}
                              </span>
                            </p>
                            <p>
                              <span>Last Branch Txn Since:</span>
                              <span className="value">
                                {data[
                                  "dim_gam.days_since_last_branch_transaction"
                                ]
                                  ? data[
                                      "dim_gam.days_since_last_branch_transaction"
                                    ] + " days "
                                  : "-"}
                              </span>
                            </p>
                            <p>
                              <span>
                                Days Since First Customer Induced Txn:
                              </span>
                              <span className="value">
                                {data[
                                  "dim_deposit_accounts.days_since_first_customer_induced_transaction"
                                ]
                                  ? data[
                                      "dim_deposit_accounts.days_since_first_customer_induced_transaction"
                                    ] + " days"
                                  : "-"}
                              </span>
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
                    <h5 className="card-title">Lien Details</h5>
                  </div>
                  <div className="table-scrollable">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Lien Start Date</th>
                          <th>Lien Expiry Date</th>
                          {/* <th className="d-none d-md-table-cell">
                            Lien Amount
                          </th> */}
                          <th>Lien Remarks</th>
                          <th>Lien Reason Code</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lienData &&
                          lienData?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {item["dim_lien.lien_start_date"] || "N/A"}
                              </td>
                              <td>
                                {item["dim_lien.lien_expiry_date"] || "N/A"}
                              </td>
                              <td className="d-none d-md-table-cell">
                                {item["dim_lien.lien_remarks"] || "N/A"}
                              </td>
                              <td>
                                {item["dim_lien.lien_reason_code"] || "Unknown"}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Interest Rate Exchange</h5>
                  </div>
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Effective Start Date</th>
                        <th>Effective End Date</th>
                        <th className="d-none d-md-table-cell">
                          Interest Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {interestRateData &&
                        interestRateData?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {item["dim_interest_rate.start_date"] || "N/A"}
                            </td>
                            <td>
                              {item["dim_interest_rate.end_date"] || "N/A"}
                            </td>
                            <td className="d-none d-md-table-cell">
                              {item["dim_interest_rate.interest_rate"] || "N/A"}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="card">
                  <h5 className="card-title">Account Status Change Details</h5>
                </div>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Effective Start Date</th>
                      <th>Effective End Date</th>
                      <th className="d-none d-md-table-cell">Account Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2023-01-01</td>
                      <td>2023-06-30</td>
                      <td className="d-none d-md-table-cell">Active</td>
                    </tr>
                    <tr className="table-primary">
                      <td>2022-12-15</td>
                      <td>2023-12-14</td>
                      <td className="d-none d-md-table-cell">Inactive</td>
                    </tr>
                    <tr>
                      <td>2023-03-20</td>
                      <td>2024-03-19</td>
                      <td className="d-none d-md-table-cell">Closed</td>
                    </tr>
                    <tr className="table-primary">
                      <td>2023-05-10</td>
                      <td>2024-05-09</td>
                      <td className="d-none d-md-table-cell">Suspended</td>
                    </tr>
                    <tr>
                      <td>2023-07-01</td>
                      <td>2024-06-30</td>
                      <td className="d-none d-md-table-cell">Active</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Nominee Details</h5>
                </div>
                <div className="table-scrollable">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Nominee Name</th>
                        <th>Nominee Address</th>
                        <th className="d-none d-md-table-cell">
                          Nominee Relationship
                        </th>
                        <th>Nominee ID</th>
                        <th>Nominee Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nomineeData &&
                        nomineeData?.map((item, index) => (
                          <tr key={index}>
                            <td>{item["dim_nominee.nominee_name"] || "N/A"}</td>
                            <td>
                              {item["dim_nominee.nominee_address"] || "N/A"}
                            </td>
                            <td className="d-none d-md-table-cell">
                              {item["dim_nominee.nominee_id"] || "N/A"}
                            </td>
                            <td>N/A</td>
                            <td>N/A</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Guardian Details</h5>
                </div>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Minor Guardian Name</th>
                      <th>Relationship</th>
                      <th className="d-none d-md-table-cell">
                        Minor attain Major Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>John Smith</td>
                      <td>Parent</td>
                      <td className="d-none d-md-table-cell">2025-02-28</td>
                    </tr>
                    <tr className="table-primary">
                      <td>Jane Doe</td>
                      <td>Grandparent</td>
                      <td className="d-none d-md-table-cell">2024-11-15</td>
                    </tr>
                    <tr>
                      <td>Michael Johnson</td>
                      <td>Uncle</td>
                      <td className="d-none d-md-table-cell">2023-09-30</td>
                    </tr>
                    <tr className="table-primary">
                      <td>Susan Brown</td>
                      <td>Aunt</td>
                      <td className="d-none d-md-table-cell">2022-12-20</td>
                    </tr>
                    <tr>
                      <td>David Wilson</td>
                      <td>Sibling</td>
                      <td className="d-none d-md-table-cell">2023-06-10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Joint Account Holder's Info</h5>
                </div>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Effective Start Date</th>
                      <th>Effective End Date</th>
                      <th className="d-none d-md-table-cell">Account Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2023-01-01</td>
                      <td>2023-12-31</td>
                      <td className="d-none d-md-table-cell">Active</td>
                    </tr>
                    <tr className="table-primary">
                      <td>2022-06-15</td>
                      <td>2022-12-31</td>
                      <td className="d-none d-md-table-cell">Closed</td>
                    </tr>
                    <tr>
                      <td>2024-03-10</td>
                      <td>2024-08-31</td>
                      <td className="d-none d-md-table-cell">Active</td>
                    </tr>
                    <tr className="table-primary">
                      <td>2021-11-01</td>
                      <td>2022-05-31</td>
                      <td className="d-none d-md-table-cell">Closed</td>
                    </tr>
                    <tr>
                      <td>2025-02-01</td>
                      <td>2025-12-31</td>
                      <td className="d-none d-md-table-cell">Active</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Signatories</h5>
                </div>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Signatory Name</th>
                      <th>Signatory Relationship Type</th>
                      <th className="d-none d-md-table-cell">
                        Signatory Relationship Code
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {signatoriesData &&
                      signatoriesData?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {item["dim_signatories.signatory_name"] || "N/A"}
                          </td>

                          <td className="d-none d-md-table-cell">
                            {item[
                              "dim_signatories.signatory_relationship_type"
                            ] || "N/A"}
                          </td>
                          <td>N/A</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="tab-pane" id="primary-tab-4" role="tabpanel">
            {/* <h4 className="tab-title">Aggregated Insights</h4> */}
            <div className="row">
              {/* <div className="col-12 col-lg-6">
                <div className="card flex-fill w-100">
                  <div className="card-header">
                    <h5 className="card-title">
                      Total Transaction (Vol) from CR
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
                      Total Transaction (Count) from CR
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
                      Total Transaction (Vol) from DR
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
                      Total Transaction (Count) from DR
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
              </div> */}
              <div
                id="legal-saving-deposit-dashboard"
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
