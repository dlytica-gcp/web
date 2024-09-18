// components/TabContent.js
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
// import { renderCharts } from "../charts/individual-chart";
const TabContent = ({ individual }) => {
  // const [individual, setIndividual] = useState([]);

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
              Basic/Derived Info
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
              Breakdown Info
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
              Details Info
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
              Aggregated Insights
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div
            className="tab-pane active show"
            id="primary-tab-1"
            role="tabpanel"
          >
            <h4 className="tab-title">Basic Info</h4>
            <div className="row">
            <div className="col-md-12 mb-4">
      <div className="card basic-card">
        <p><span>Loan Account Number</span><span className="value">1234567890</span></p>
        <p><span>Account Name</span><span className="value">Meena</span></p>
        <p><span>Beneficiary</span><span className="value">GL1234</span></p>
        <p><span>Charge</span><span className="value">Main Branch</span></p>
        <p><span>Upfront Fee</span><span className="value">Province 1</span></p>
        <p><span>Guarantee Amount</span><span className="value">$100,000</span></p>
        <p><span>Issue Date</span><span className="value">2023-01-15</span></p>
        <p><span>Expiry date</span><span className="value">2025-01-15</span></p>
        <p><span>Issuing Bank</span><span className="value">MB001</span></p>
        <p><span>Advising Bank</span><span className="value">SC001</span></p>
      </div>
    </div>
            </div>
            <div className="tab-pane" id="primary-tab-2" role="tabpanel">
              <h4 className="tab-title">Derived Info</h4>
              <div className="row">
              <div className="col-md-12 mb-4">
      <div className="card basic-card">
        <p>
          <span>Loan Product availed by customer from account Open date</span>
          <span className="value">Home Loan</span>
        </p>
        <p>
          <span>Limit Expiry date in</span>
          <span className="value">2025-01-15</span>
        </p>
        <p>
          <span>Days Since Last Renewal</span>
          <span className="value">365</span>
        </p>
        <p>
          <span>Next Interest Demand Remaining Date in</span>
          <span className="value">30</span>
        </p>
        <p>
          <span>Next Principal Demand in</span>
          <span className="value">60</span>
        </p>
        <p>
          <span>Limit Review in</span>
          <span className="value">180</span>
        </p>
        <p>
          <span>Days Since First Overdue Loan Amount</span>
          <span className="value">45</span>
        </p>
        <p>
          <span>Days Past Dues</span>
          <span className="value">15</span>
        </p>
        <p>
          <span>Installment Delay Days</span>
          <span className="value">10</span>
        </p>
      </div>
    </div>
              </div>
            </div>
          </div>

          <div className="tab-pane" id="primary-tab-3" role="tabpanel">
            <h4 className="tab-title">Details Info</h4>
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
                <th className="d-none d-md-table-cell">EMI Details</th>
                <th>Payment History</th>
                <th>Insurance Details</th>
                <th>Interest Rate Changes/Revision History</th>
                <th>Repayment Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-primary">
                <td>Limit increased from $50,000 to $60,000 on 2023-05-12</td>
                <td>Overdue of $1,000 on 2023-04-10</td>
                <td className="d-none d-md-table-cell">EMI of $500 due monthly</td>
                <td>Payment of $500 received on 2023-06-01</td>
                <td>Insured for $60,000 with XYZ Insurance</td>
                <td>Interest rate revised from 5% to 4.5% on 2023-03-15</td>
                <td>Repayment started on 2022-01-01</td>
              </tr>
              <tr>
                <td>Limit decreased from $60,000 to $55,000 on 2024-01-20</td>
                <td>Overdue of $500 on 2023-08-15</td>
                <td className="d-none d-md-table-cell">EMI of $550 due monthly</td>
                <td>Payment of $550 received on 2023-07-01</td>
                <td>Insured for $55,000 with ABC Insurance</td>
                <td>Interest rate revised from 4.5% to 4% on 2024-01-05</td>
                <td>Repayment due on 2023-12-31</td>
              </tr>
              <tr>
                <td>Limit increased from $55,000 to $65,000 on 2024-06-30</td>
                <td>Overdue of $1,200 on 2024-04-12</td>
                <td className="d-none d-md-table-cell">EMI of $600 due monthly</td>
                <td>Payment of $600 received on 2024-05-01</td>
                <td>Insured for $65,000 with DEF Insurance</td>
                <td>Interest rate revised from 4% to 3.5% on 2024-06-10</td>
                <td>Repayment due on 2024-11-30</td>
              </tr>
              <tr>
                <td>Limit decreased from $65,000 to $50,000 on 2025-02-15</td>
                <td>Overdue of $700 on 2024-09-20</td>
                <td className="d-none d-md-table-cell">EMI of $450 due monthly</td>
                <td>Payment of $450 received on 2024-10-01</td>
                <td>Insured for $50,000 with GHI Insurance</td>
                <td>Interest rate revised from 3.5% to 3% on 2025-01-01</td>
                <td>Repayment due on 2025-06-30</td>
              </tr>
              <tr>
                <td>Limit increased from $50,000 to $70,000 on 2025-12-01</td>
                <td>Overdue of $900 on 2025-05-25</td>
                <td className="d-none d-md-table-cell">EMI of $650 due monthly</td>
                <td>Payment of $650 received on 2025-06-01</td>
                <td>Insured for $70,000 with JKL Insurance</td>
                <td>Interest rate revised from 3% to 2.5% on 2025-11-10</td>
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
            <h4 className="tab-title">Aggregated Insights</h4>
            <div className="row">
            <div className="col-12 col-lg-6">
      <div className="card flex-fill w-100">
        <div className="card-header">
          <h5 className="card-title">Count of Expired Loan</h5>
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
          <h5 className="card-title">Total Fees Income</h5>
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
    </div>
          </div>
          <div className="tab-pane" id="primary-tab-5" role="tabpanel">
            <h4 className="tab-title">Breakdown Info</h4>
            <div className="row">
            <div className="col-md-12 col-sm-6 mb-4">
      <div className="card basic-card">
        <p><span>Total Interest Income:</span><span className="value">500,000</span></p>
        <p><span>Total Fees and Commission:</span><span className="value">30,000</span></p>
        <p><span>Count of Revised Limit:</span><span className="value">3</span></p>
        <p><span>Count of Revised Interest Rate:</span><span className="value">2</span></p>
        <p><span>Count of Delayed Payments:</span><span className="value">5</span></p>
        <p><span>Total Overdue Amount:</span><span className="value">50,000</span></p>
        <p><span>Count of Missed Installment/Installment Due (Q/M):</span><span className="value">4</span></p>
        <p><span>Count of Principal Demand Due Days:</span><span className="value">10</span></p>
        <p><span>Total Penal Amount:</span><span className="value">2,000</span></p>
        <p><span>Count of Penal Days:</span><span className="value">15</span></p>
        <p><span>Utilization Percentage:</span><span className="value">85%</span></p>
        <p><span>Avg Time to Approval:</span><span className="value">5 days</span></p>
        <p><span>Avg Processing Time:</span><span className="value">3 days</span></p>
        <p><span>Count of Limit Expired Loans:</span><span className="value">1</span></p>
        <p><span>Count of Overdue Days:</span><span className="value">20</span></p>
        <p><span>Count of Interest Demand Due Days:</span><span className="value">7</span></p>
      </div>
    </div>
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabContent;
