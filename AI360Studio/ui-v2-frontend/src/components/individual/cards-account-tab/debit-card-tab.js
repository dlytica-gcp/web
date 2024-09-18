// components/TabContent.js
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import supersetService from "@/services/superset_service";
import { useRouter } from "next/router";
import cardFetchData from "@/services/card_service";
import { decryptCardNumber } from "@/lib/utils/card_number_hasher";
import { convertDateToYMD } from "@/lib/utils/date_to_month";
import { maskCardNumber } from "@/lib/utils/card_number_hasher";
import Loader from "@/components/shared/loader";

const TabContent = (props) => {
  const router = useRouter();
  const { cif_id, card_id } = router.query;
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const [debitCardDetail, setDebitCardDetail] = useState(null);
  const fetchData =  useCallback(async () => {
    try {
      const [basicinfo] =
        await Promise.all([
          cardFetchData.get_debit_card_info(cif_id, decryptCardNumber
            (
              decodeURIComponent
                (card_id))),
        ]);
      setDebitCardDetail(basicinfo);

    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
    finally {
      setLoading(false);
    }
  },[cif_id,card_id]);
  useEffect(() => {
    fetchData();
    if (!hasFetched.current) {
      const dashboardElement = "debit-card-dashboard";
      const card_number = decryptCardNumber(decodeURIComponent(card_id));
      const filters = {
        card_number: card_number,
      };
      const embed = async () => {
        const dashboardId = "7dd2f8b1-8b55-4c5a-9221-055cdc5712dd";
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
  }, [cif_id, card_id, debitCardDetail]);

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
              href="#primary-tab-5"
              data-bs-toggle="tab"
              role="tab"
              aria-selected="false"
              tabIndex="-1"
            >
              Breakdown Info
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
              Detail
            </a>
          </li> */}

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
          {loading ? (
            <div className="d-flex justify-content-center mb-4">
              <Loader />
            </div>
          ) : (
            <div
              className="tab-pane active show"
              id="primary-tab-1"
              role="tabpanel"
            >
              {debitCardDetail && debitCardDetail.map((item,index) => (
                <div key={index}>
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <div className="card basic-card">
                        {/* <p><span>First Name: </span><span className="value">{item["dim_cards_credit_card.car_numb"]}</span></p> */}
                        {/* <p><span>Debit Card (Yes/No): </span><span className="value">Yes</span></p> */}
                        <p><span>Card Number: </span><span className="value">{maskCardNumber(item["dim_cards_debit_card.car_numb"])}</span></p>
                        {/* <p><span>Debit Card Program: </span><span className="value">Platinum</span></p> */}
                        {/* <p><span>Limit: </span><span className="value">NRs.{item["dim_cards_credit_card.car_numb"]}</span></p> */}
                        <p><span>Linked Account Number: </span><span className="value">{item["dim_cards_debit_card.acc_numb"]}</span></p>
                        <p><span>Created Date: </span><span className="value">{convertDateToYMD(item["dim_cards_debit_card.car_firs_crea_date"])}</span></p>
                        {/* <p><span>Card Registration Date: </span><span className="value">{item["dim_cards_credit_card.car_numb"]}</span></p> */}
                        <p><span>Card Activation Date/ First Pin Set Date: </span><span className="value">{convertDateToYMD(item["dim_cards_debit_card.card_activation_from_reg_date"])}</span></p>
                        <p><span>Card First Txn Date: </span><span className="value">{convertDateToYMD(item["dim_cards_debit_card.first_transaction_date"])}</span></p>
                        <p><span>Card Last Txn Date: </span><span className="value">{convertDateToYMD(item["dim_cards_debit_card.last_txn_date"])}</span></p>
                        <p><span>Card Status: </span><span className="value">{item["dim_cards_debit_card.card_status"]}</span></p>
                        {/* <p><span>Blocked Reason: </span><span className="value">{item["dim_cards_debit_card.last_txn_date"]}</span></p> */}
                        <p><span>Blocked Date: </span><span className="value">{convertDateToYMD(item["dim_cards_debit_card.blocked_date"])}</span></p>
                        {/* <p><span>Expiry Date: </span><span className="value">{item["dim_cards_debit_card.last_txn_date"]}</span></p> */}
                        {/* <p><span>Next Renewal Date: </span><span className="value">{item["dim_cards_debit_card.last_txn_date"]}</span></p> */}
                        {/* <p><span>Linked Email: </span><span className="value">john.doe@example.com</span></p> */}
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="primary-tab-2" role="tabpanel">
                    {/* <h4 className="tab-title">Derived Info</h4> */}
                    <div className="row">
                      <div class="col-md-12 mb-4">
                        <div class="card basic-card">
                          <p><span>Days between First Account Opening and Card Registration: </span><span class="value">{(item["dim_cards_debit_card.card_registration_from_acc_opn_date"]) ? item["dim_cards_debit_card.card_registration_from_acc_opn_date"] + " Days" : "-"}</span></p>
                          <p><span>Days between Card Registration and First Card Transaction: </span><span class="value">{(item["dim_cards_debit_card.cardtxn_from_reg_date"]) ? item["dim_cards_debit_card.cardtxn_from_reg_date"] + " Days" : "-"}</span></p>
                          <p><span>Days since last Ecom Txn: </span><span class="value">{(item["dim_cards_debit_card.last_ecom_txn_since"]) ? item["dim_cards_debit_card.last_ecom_txn_since"] + " Days" : "-"}</span></p>
                          <p><span>Days since last blocked date: </span><span class="value">{(item["dim_cards_debit_card.last_block_since"]) ? item["dim_cards_debit_card.last_block_since"] + " Days" : "-"}</span></p>

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
                    <h5 className="card-title">Savings</h5>
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Account No</th>
                          <th>Account Open Date</th>
                          <th className="d-none d-md-table-cell">Scheme Type</th>
                          <th>Scheme Code</th>
                          <th>Scheme Desc</th>
                          <th>Current Balance</th>
                          <th>Available Balance</th>
                          <th>Min Balance</th>
                          <th>Account Status(Active/Closed)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>11</td>
                          <td>2023-01-15</td>
                          <td className="d-none d-md-table-cell">Savings</td>
                          <td>12345</td>
                          <td>Basic Savings Account</td>
                          <td>$5000.00</td>
                          <td>$4500.00</td>
                          <td>$1000.00</td>
                          <td>Active</td>
                        </tr>
                        <tr className="table-primary">
                          <td>12</td>
                          <td>2023-03-20</td>
                          <td className="d-none d-md-table-cell">Fixed Deposit</td>
                          <td>54321</td>
                          <td>5-Year Fixed Deposit</td>
                          <td>$10000.00</td>
                          <td>$10000.00</td>
                          <td>$5000.00</td>
                          <td>Active</td>
                        </tr>
                        {/* Add more rows as needed */}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Fixed Deposit</h5>
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Account No</th>
                          <th>Account Open Date</th>
                          <th className="d-none d-md-table-cell">Scheme Type</th>
                          <th>Scheme Code</th>
                          <th>Scheme Desc</th>
                          <th>Current Balance</th>
                          <th>Maturity Date</th>
                          <th>Account Status</th>
                          <th>Interest Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>11</td>
                          <td>2023-01-15</td>
                          <td className="d-none d-md-table-cell">Fixed Deposit</td>
                          <td>FD12345</td>
                          <td>5-Year Fixed Deposit</td>
                          <td>$10000.00</td>
                          <td>2028-01-15</td>
                          <td>Active</td>
                          <td>5.5%</td>
                        </tr>
                        <tr className="table-primary">
                          <td>12</td>
                          <td>2023-03-20</td>
                          <td className="d-none d-md-table-cell">Fixed Deposit</td>
                          <td>FD54321</td>
                          <td>3-Year Fixed Deposit</td>
                          <td>$5000.00</td>
                          <td>2026-03-20</td>
                          <td>Active</td>
                          <td>4.75%</td>
                        </tr>
                        {/* Add more rows as needed */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="primary-tab-4" role="tabpanel">
            <div className="row">
              <div
                id="debit-card-dashboard"
                style={{ width: "100%", height: "800px" }}
              />
            </div>
          </div>
          <div className="tab-pane" id="primary-tab-5" role="tabpanel">
            <h4 className="tab-title">Breakdown Info</h4>
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
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Interest Paid:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of DR Transactions:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of CR Transactions:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Amount of DR transactions:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">CR transaction amount:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Fees and Commissions:</span>
                      <span className="value">$10,000</span>
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
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Interest Paid:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of DR Transactions:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of CR Transactions:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Amount of DR transactions:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">CR transaction amount:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Fees and Commissions:</span>
                      <span className="value">$10,000</span>
                    </li>
                  </ul>
                </div>
                <div className="breakdown-card card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Calls</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <span className="label">Total Deposit:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Average Deposit:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Interest Paid:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of DR Transactions:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of CR Transactions:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Amount of DR transactions:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">CR transaction amount:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Fees and Commissions:</span>
                      <span className="value">$10,000</span>
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
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Interest Paid:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of DR Transactions:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of CR Transactions:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Amount of DR transactions:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">CR transaction amount:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Fees and Commissions:</span>
                      <span className="value">$10,000</span>
                    </li>
                  </ul>
                </div>
                <div className="breakdown-card card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Margins</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <span className="label">Total Deposit:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Average Deposit:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Interest Paid:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of DR Transactions:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of CR Transactions:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Amount of DR transactions:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">CR transaction amount:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Fees and Commissions:</span>
                      <span className="value">$10,000</span>
                    </li>
                  </ul>
                </div>
                <div className="breakdown-card card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Overdraft Positive Amount</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <span className="label">Total Deposit:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Average Deposit:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Interest Paid:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of DR Transactions:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">No of CR Transactions:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Amount of DR transactions:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">CR transaction amount:</span>
                      <span className="value">$10,000</span>
                    </li>
                    <li className="list-group-item">
                      <span className="label">Fees and Commissions:</span>
                      <span className="value">$10,000</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default TabContent;