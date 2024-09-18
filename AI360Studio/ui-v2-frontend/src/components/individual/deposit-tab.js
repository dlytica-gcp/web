// components/TabContent.js
import Link from "next/link";
import { useEffect, useState,useRef,useCallback } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { renderCharts } from "../charts/individual-chart";
import supersetService from "@/services/superset_service";
import Loader from "../shared/loader";
import depositFetchData from "../../services/deposit_service";
import { convertDateToYMD } from "@/lib/utils/date_to_month";
const TabContent = (props) => {
  const { individual, inv_id } = props;
  const hasFetched = useRef(false);

  // const [individual, setIndividual] = useState([]);
  const [loading, setLoading] = useState(true);
  const [depositDataSaving, setDepositDataSaving] = useState([]);
  const [depositDataFixed, setDepositDataFixed] = useState([]);

  const fetchData = useCallback(async (id) => {
    try {
      // Fetch the individual data
      const result = await depositFetchData.getdeposit_details(id);

      const depositDataSavings = result.filter(
        (item) =>
          item["dim_product.product_scheme_category"] === "Deposit" &&
          item["dim_product.product_scheme_sub_category"] === "Savings"
      );
      const depositDataFixed = result.filter(
        (item) =>
          item["dim_product.product_scheme_category"] === "Deposit" &&
          item["dim_product.product_scheme_sub_category"] === "Fixed"
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
      setDepositDataSaving(depositDataSavings);
      setDepositDataFixed(depositDataFixed);
    } catch (error) {
      console.error("Error fetching saving deposit data:", error);
    } finally {
      setLoading(false);
    }
  },[inv_id]);
  useEffect(() => {
    // if (!hasFetched.current) {
      fetchData(inv_id);
      // hasFetched.current = true
    // }
  }, [inv_id,fetchData]);

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
              Breakdown
            </a>
          </li>
          {/* <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              href="#primary-tab-5"
              data-bs-toggle="tab"
              role="tab"
              aria-selected="false"
              tabIndex="-1"
            >
              Aggregated Insights
            </a>
          </li> */}
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
              {/* <h4 className="tab-title">Basic Info</h4> */}
              <div className="row">
                <div className="col-md-12 mb-4">
                  <div className="basic-card card">
                    <p>
                      <span>Total Deposit: </span>
                      <span className="value">$10,000</span>
                    </p>
                    <p>
                      <span>Average Deposit: </span>
                      <span className="value">$2,000</span>
                    </p>
                    <p>
                      <span>Interest Paid: </span>
                      <span className="value">$150</span>
                    </p>
                    <p>
                      <span>No. of DR transactions YTD: </span>
                      <span className="value">50</span>
                    </p>
                    <p>
                      <span>No. of CR transactions YTD: </span>
                      <span className="value">60</span>
                    </p>
                    <p>
                      <span>Amount of DR Transactions YTD: </span>
                      <span className="value">$5,000</span>
                    </p>
                    <p>
                      <span>Employment Status: </span>
                      <span className="value">Employed</span>
                    </p>
                    <p>
                      <span>CR Transaction Amount: </span>
                      <span className="value">$7,000</span>
                    </p>
                    <p>
                      <span>Fees and Commissions: </span>
                      <span className="value">$100</span>
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
                        <span>Total Deposit :</span>
                        <span className="value"> 100000</span>
                      </p>
                      <p>
                        <span>Average Deposit :</span>
                        <span className="value">
                          100000<span className="value"></span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="tab-pane" id="primary-tab-3" role="tabpanel">
            {/* <h4 className="tab-title">Details Info</h4> */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Savings</h5>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Account No</th>
                          <th>Account Open Date</th>
                          <th className="d-none d-md-table-cell">
                            Scheme Type
                          </th>
                          <th>Scheme Code</th>
                          <th>Scheme Desc</th>
                          <th>Current Balance</th>
                          <th>Available Balance</th>
                          <th>Min Balance</th>
                          <th>Account Status (Active/Closed)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {depositDataSaving && depositDataSaving?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <Link
                                href={`/individuals/deposit-account/saving-deposit?foracid=${item["dim_gam.foracid"]}&cif_id=${item["dim_customers.cif_id"]}`}
                              >
                                {item["dim_gam.foracid"]}
                              </Link>
                            </td>
                            <td>
                              {convertDateToYMD(item["dim_gam.acct_opn_date_date_part"]) || "N/A"}
                            </td>
                            <td className="d-none d-md-table-cell">
                              {item["dim_product.product_scheme_type"] || "N/A"}
                            </td>
                            <td>
                              {item["dim_product.product_scheme_code"] || "N/A"}
                            </td>
                            <td>
                              {item["dim_product.product_scheme_description"] ||
                                "N/A"}
                            </td>
                            <td>no data</td>
                            <td>
                              $
                              {item["dim_deposit_accounts.available_amount"] ||
                                "0.00"}
                            </td>
                            <td>
                              $
                              {item["dim_deposit_accounts.minimum_balance"] ||
                                "0.00"}
                            </td>
                            <td>
                              {item["dim_gam.acct_cls_flg"] === "Y"
                                ? "Closed"
                                : "Active"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Fixed Deposit</h5>
                  </div>
                  <div className="table-scrollable">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Account No</th>
                          <th>Account Open Date</th>
                          <th className="d-none d-md-table-cell">
                            Scheme Type
                          </th>
                          <th>Scheme Code</th>
                          <th>Scheme Desc</th>
                          <th>Current Balance</th>
                          <th>Maturity Date</th>
                          <th>Account Status</th>
                          <th>Interest Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {depositDataFixed && depositDataFixed?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <Link
                                href={`/individuals/deposit-account/fixed-deposit?foracid=${item["dim_gam.foracid"]}&cif_id=${item["dim_customers.cif_id"]}`}
                              >
                                {item["dim_gam.foracid"]
                                  ? item["dim_gam.foracid"]
                                  : "No data"}
                              </Link>
                            </td>
                            <td>
                              {item["dim_gam.acct_opn_date_date_part"]
                                ?  convertDateToYMD(item["dim_gam.acct_opn_date_date_part"])
                                : "No data"}
                            </td>
                            <td className="d-none d-md-table-cell">
                              {item["dim_product.product_scheme_type"]
                                ? item["dim_product.product_scheme_type"]
                                : "No data"}
                            </td>
                            <td>
                              {item["dim_product.product_scheme_code"]
                                ? item["dim_product.product_scheme_code"]
                                : "No data"}
                            </td>
                            <td>
                              {item["dim_product.product_scheme_description"]
                                ? item["dim_product.product_scheme_description"]
                                : "No data"}
                            </td>
                            <td>No data</td>
                            <td>
                              $
                              {item["dim_deposit_accounts.available_amount"]
                                ? item["dim_deposit_accounts.available_amount"]
                                : "0.00"}
                            </td>
                            <td>
                              $
                              {item["dim_deposit_accounts.minimum_balance"]
                                ? item["dim_deposit_accounts.minimum_balance"]
                                : "0.00"}
                            </td>
                            <td>
                              {item["dim_gam.acct_cls_flg"] === "Y"
                                ? "Closed"
                                : "Active"}
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
          <div className="tab-pane" id="primary-tab-4" role="tabpanel">
            {/* <h4 className="tab-title">Breakdown Info</h4> */}
            <div className="row">
              <div className="col-sm-6 col-xxl-6 col-md-12">
                <div className="breakdown-card card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Savings</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <span className="label">Total Deposit:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Average Deposit:</span>
                      <span className="value">$2,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Interest Paid:</span>
                      <span className="value">$150</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of DR Transactions:</span>
                      <span className="value">50</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of CR Transactions:</span>
                      <span className="value">60</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Amount of DR transactions:</span>
                      <span className="value">$5,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">CR transaction amount:</span>
                      <span className="value">$7,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Fees and Commissions:</span>
                      <span className="value">$100</span>
                    </li>
                  </ul>
                </div>
                <div className="breakdown-card card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Current</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <span className="label">Total Deposit:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Average Deposit:</span>
                      <span className="value">$2,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Interest Paid:</span>
                      <span className="value">$150</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of DR Transactions:</span>
                      <span className="value">50</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of CR Transactions:</span>
                      <span className="value">60</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Amount of DR transactions:</span>
                      <span className="value">$5,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">CR transaction amount:</span>
                      <span className="value">$7,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Fees and Commissions:</span>
                      <span className="value">$100</span>
                    </li>
                  </ul>
                </div>
                <div className="breakdown-card card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Call</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <span className="label">Total Deposit:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Average Deposit:</span>
                      <span className="value">$2,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Interest Paid:</span>
                      <span className="value">$150</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of DR Transactions:</span>
                      <span className="value">50</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of CR Transactions:</span>
                      <span className="value">60</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Amount of DR transactions:</span>
                      <span className="value">$5,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">CR transaction amount:</span>
                      <span className="value">$7,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Fees and Commissions:</span>
                      <span className="value">$100</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-xxl-6 col-md-12">
                <div className="breakdown-card card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Fixed Deposit</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <span className="label">Total Deposit:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Average Deposit:</span>
                      <span className="value">$2,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Interest Paid:</span>
                      <span className="value">$150</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of DR Transactions:</span>
                      <span className="value">50</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of CR Transactions:</span>
                      <span className="value">60</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Amount of DR transactions:</span>
                      <span className="value">$5,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">CR transaction amount:</span>
                      <span className="value">$7,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Fees and Commissions:</span>
                      <span className="value">$100</span>
                    </li>
                  </ul>
                </div>
                <div className="breakdown-card card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Margin</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <span className="label">Total Deposit:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Average Deposit:</span>
                      <span className="value">$2,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Interest Paid:</span>
                      <span className="value">$150</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of DR Transactions:</span>
                      <span className="value">50</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of CR Transactions:</span>
                      <span className="value">60</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Amount of DR transactions:</span>
                      <span className="value">$5,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">CR transaction amount:</span>
                      <span className="value">$7,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Fees and Commissions:</span>
                      <span className="value">$100</span>
                    </li>
                  </ul>
                </div>
                <div className="breakdown-card card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">
                      Overdraft Positive Amount
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <span className="label">Total Deposit:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Average Deposit:</span>
                      <span className="value">$2,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Interest Paid:</span>
                      <span className="value">$150</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of DR Transactions:</span>
                      <span className="value">50</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of CR Transactions:</span>
                      <span className="value">60</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Amount of DR transactions:</span>
                      <span className="value">$5,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">CR transaction amount:</span>
                      <span className="value">$7,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Fees and Commissions:</span>
                      <span className="value">$100</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="tab-pane" id="primary-tab-5" role="tabpanel">
            <h4 className="tab-title">Aggregated insights</h4>
            <div className="row"> */}
          {/* <div
                id="deposit-dashboard"
                style={{ width: "100%", height: "800px" }}
              /> */}
          {/* </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TabContent;