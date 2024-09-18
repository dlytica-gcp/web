// components/TabContent.js
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import cardFetchData from "@/services/card_service";
import { decryptCardNumber } from "@/lib/utils/card_number_hasher";
import { convertDateToYMD } from "@/lib/utils/date_to_month";
import supersetService from "@/services/superset_service";
import { maskCardNumber } from "@/lib/utils/card_number_hasher";
import Loader from "@/components/shared/loader";
const TabContent = (props) => {
  const router = useRouter();
  const { cif_id, card_id } = router.query;
  const [loading, setLoading] = useState(true);
  const [creditCardDetail, setCreditCardDetail] = useState(null);
  const hasFetched = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      // const decryptNumber = decryptCardNumber(card_id)
      // console.log("decrypted"+decryptNumber);
      const [basicinfo] =
        await Promise.all([
          cardFetchData.get_credit_card_info(cif_id, decryptCardNumber
            (
              decodeURIComponent
                (card_id))),
        ]);
      console.log(basicinfo);
      setCreditCardDetail(basicinfo);
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
    finally {
      setLoading(false);
    }
  },[card_id,cif_id])

  useEffect(() => {
    // if(cif_id && card_id){
    fetchData();
    // }
    if (!hasFetched.current) {
      const dashboardElement = "credit-card-dashboard";
      const card_number = decryptCardNumber(decodeURIComponent(card_id));
      const filters = {
        card_number: card_number,
      };
      const embed = async () => {
        const dashboardId = "4f148582-e543-4550-8d28-77b87f166688";
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
  }, [cif_id, card_id, fetchData]);

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
              href="#primary-tab-5"
              data-bs-toggle="tab"
              role="tab"
              aria-selected="false"
              tabIndex="-1"
            >
              Insights
            </a>
          </li>
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
              Aggregated Insights
            </a>
          </li> */}
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
              {creditCardDetail && creditCardDetail.map((item,index) => (
                <div key={index}>
                  {/* <h4 className="tab-title">Basic Info</h4> */}
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <div className="card basic-card">
                        <p><span>Card Number:</span><span className="value">{maskCardNumber(item["dim_cards_credit_card.car_numb"])}</span></p>
                        <p><span>Limit:</span><span className="value">NRs. {item["dim_cards_credit_card.credit_limit"]}</span></p>
                        <p><span>Linked Account Number:</span><span className="value">{item["dim_cards_credit_card.foracid"]}</span></p>
                        <p><span>Created date:</span><span className="value">{convertDateToYMD(item["dim_cards_credit_card.car_firs_crea_date"])}</span></p>
                        {/* <p><span>Card Registration Date:</span><span className="value">{convertDateToYMD(item["dim_cards_credit_card.car_firs_crea_date"])}</span></p> */}
                        <p><span>Credit Card Activation Date:</span><span className="value">{convertDateToYMD(item["dim_cards_credit_card.activation_date"])}</span></p>
                        <p><span>Credit Card First Txn Date:</span><span className="value">{convertDateToYMD(item["dim_cards_credit_card.first_transaction_date"])}</span></p>
                        {/* <p><span>Card first overdue date:</span><span className="value">{convertDateToYMD(item[])}</span></p> */}
                        <p><span>Last Txn Date:</span><span className="value">{convertDateToYMD(item["dim_cards_credit_card.last_txn_date"])}</span></p>
                        {/* <p><span>Last eCom txn Date:</span><span className="value">{convertDateToYMD(item["dim_cards_credit_card.last_ecom_txn_since"])}</span></p> */}
                        <p><span>Last POS txn Date:</span><span className="value">{convertDateToYMD(item["dim_cards_credit_card.last_pos_txn_date"])}</span></p>
                        <p><span>Blocked Date:</span><span className="value">{item["dim_cards_credit_card.blocked_date"] ? convertDateToYMD(item["dim_cards_credit_card.blocked_date"]) : "-"}</span></p>
                        <p><span>Expiry Date:</span><span className="value">{convertDateToYMD(item["dim_cards_credit_card.car_expi_date_date_part"])}</span></p>.
                        <p><span>Used Balance:</span><span className="value">NRs. {item["dim_cards_credit_card.used_balance"]}</span></p>
                        <p><span>Available Balance:</span><span className="value">NRs. {item["dim_cards_credit_card.available_balance"]}</span></p>
                        {/* <p><span>Payment After Bill:</span><span className="value">NRs. {item[]}</span></p> */}
                        <p><span>Status:</span><span className="value">{item["dim_cards_credit_card.card_status"]}</span></p>
                        {/* <p><span>Linked Email:</span><span className="value">{item[]}</span></p> */}
                        <p><span>Payment Option (10% or 100% of Bill amt): </span><span className="value">{item["dim_cards_credit_card.payment_option"]} %</span></p>
                        <p><span>LATEST_BILL_DATE:</span><span className="value">{convertDateToYMD(item["dim_cards_credit_card.latest_bill_date"])}</span></p>
                        <p><span>PAYMENT_DUE_DATE:</span><span className="value">{convertDateToYMD(item["dim_cards_credit_card.payment_due_date"])}</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="primary-tab-2" role="tabpanel">
                    {/* <h4 className="tab-title">Derived Info</h4> */}
                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <div className="card basic-card">
                          {/* <p><span>Card Registration from Account open Date:</span><span className="value">{item['']} days</span></p> */}
                          <p><span>Card Activation from Registration Date:</span><span className="value">{(item["dim_cards_credit_card.card_activation_from_reg_date"]) ? item["dim_cards_credit_card.card_activation_from_reg_date"] + " Days" : "-"}</span></p>
                          {/* <p><span>Card Transaction from Activation Date:</span><span className="value">{item['']} days</span></p> */}
                          {/* <p><span>Last Overdue in:</span><span className="value">{item['']} days</span></p> */}
                          <p><span>Last Transaction since:</span><span className="value">{(item["dim_cards_credit_card.last_txn_since"]) ? item["dim_cards_credit_card.last_txn_since"] + " Days" : "-"}</span></p>
                          <p><span>Last eCom txn since:</span><span className="value">{(item["dim_cards_credit_card.last_ecom_txn_since"]) ? item["dim_cards_credit_card.last_ecom_txn_since"] + " Days" : "-"}</span></p>
                          {/* <p><span>Last Pos Txns since:</span><span className="value">{item['']} days</span></p> */}
                          <p><span>Blocked Since:</span><span className="value">{(item["dim_cards_credit_card.last_block_since"]) ? item["dim_cards_credit_card.last_block_since"] + " Days" : "-"}</span></p>
                          {/* <p><span>Total Monthly EMI Payment:</span><span className="value">NRs. {item['']}</span></p> */}
                          {/* <p><span>Total Successful Transactions:</span><span className="value">{item['']}</span></p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div >
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
            {/* <h4 className="tab-title">Aggregated Insights</h4> */}
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="card flex-fill w-100">
                  <div className="card-header">
                    <h5 className="card-title">Total TXN Vol Per Month Per POS/ATM/Ecommerce</h5>
                  </div>
                  <div className="card-body">
                    <div className="chart chart-sm">
                      <div className="chartjs-size-monitor">
                        <div className="chartjs-size-monitor-expand">
                          <div></div>
                        </div>
                        <div className="chartjs-size-monitor-shrink">
                          <div></div>
                        </div>
                      </div>
                      <canvas
                        id="chartjs-line"
                        style={{ display: 'block', width: '405px', height: '300px' }}
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
                    <h5 className="card-title">Total TXN Count Per Month Per POS/ATM/Ecommerce</h5>
                  </div>
                  <div className="card-body">
                    <div className="chart chart-sm">
                      <div className="chartjs-size-monitor">
                        <div className="chartjs-size-monitor-expand">
                          <div></div>
                        </div>
                        <div className="chartjs-size-monitor-shrink">
                          <div></div>
                        </div>
                      </div>
                      <canvas
                        id="chartjs-transaction"
                        style={{ display: 'block', width: '405px', height: '300px' }}
                        width="405"
                        height="300"
                        className="chartjs-render-monitor"
                      ></canvas>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-12">
                <div className="card flex-fill w-100">
                  <div className="card-header">
                    <h5 className="card-title">Total Failed Transaction/Reason Code</h5>
                  </div>
                  <div className="card-body">
                    <div className="chart chart-sm">
                      <div className="chartjs-size-monitor">
                        <div className="chartjs-size-monitor-expand">
                          <div></div>
                        </div>
                        <div className="chartjs-size-monitor-shrink">
                          <div></div>
                        </div>
                      </div>
                      <canvas
                        id="chartjs-fail-transaction"
                        style={{ display: 'block', width: '405px', height: '300px' }}
                        width="405"
                        height="300"
                        className="chartjs-render-monitor"
                      ></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="primary-tab-5" role="tabpanel">
            <div className="row">
              <div
                id="credit-card-dashboard"
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