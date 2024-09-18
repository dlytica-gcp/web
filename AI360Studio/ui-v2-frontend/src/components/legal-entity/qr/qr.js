import Link from "next/link";
import { useEffect, useState } from "react";

const TabContent = (props) => {
  const { individual, detailsInfo, inv_id } = props;

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
                Derived Info
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
              <div>
                <h4 className="tab-title">Derived Info</h4>
                <div className="row">
                  <div className="col-md-12 mb-4">
                    <div className="card basic-card">
                      <p>
                        <span>Merchant Since: </span>
                        <span className="value">null</span>
                      </p>
                      <p>
                        <span>Day Since Last Transaction: </span>
                        <span className="value">null</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* details info */}
            <div className="tab-pane" id="primary-tab-3" role="tabpanel">
              <h4 className="tab-title">Details Info</h4>
              <div className="row">
                <div className="col-sm-12">
                  {/* Registration Card */}
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">Merchant Details</h5>
                    </div>
                    <div className="table-scrollable">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            {/* <th>Document ID</th> */}
                            <th>Merchant ID</th>
                            <th className="d-none d-md-table-cell">
                              Merchant Name
                            </th>
                            <th>Doing Business As</th>
                            <th>PAN Number</th>
                            <th>Mobile Number</th>
                            <th>Email ID</th>
                            <th>Account Number</th>
                            <th>Status</th>
                            <th>Stage</th>
                            <th>Created Date</th>
                            <th>Merchant Category</th>
                            <th>Merchant Sub-Category</th>
                            <th>Business_Registered_Org</th>
                            <th>Is VAT</th>
                            <th>User Profile</th>
                            <th>Merchant Registration Type</th>
                            <th>Reg Mode</th>
                            <th>Business Type</th>
                            <th>Settlement Level</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td className="d-none d-md-table-cell"></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Relationship Card */}
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">Sub Merchant Details</h5>
                    </div>
                    <div className="table-scrollable">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            {/* <th>CIF ID</th> */}
                            <th>Sub-Merchant ID</th>
                            <th>Sun-Merchant-Name</th>
                            <th className="d-none d-md-table-cell">
                              Created Date
                            </th>
                            <th>Status</th>
                            <th>Stage</th>
                            <th>Is_Default</th>
                            <th>Location</th>
                            <th>Address</th>
                            <th>Pan_Number</th>
                            <th>Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td className="d-none d-md-table-cell"></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Communication Card */}
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">Terminal Details</h5>
                    </div>
                    <div className="table-scrollable">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Terminal ID</th>
                            <th>Sub-Merchant ID</th>
                            <th className="d-none d-md-table-cell">
                              Terminal Name
                            </th>
                            <th>FonePay Pan Number</th>
                            <th>Merchant PAN Number</th>
                            <th>Approved Date</th>
                            <th>Created Date</th>
                            <th>Status</th>
                            <th>Stage</th>
                            <th>Is_Default</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td className="d-none d-md-table-cell"></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* aggregated insights */}
            <div className="tab-pane" id="primary-tab-4" role="tabpanel">
              <h4 className="tab-title">Aggregated Insights</h4>
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="card flex-fill w-100">
                    <div className="card-header">
                      <h5 className="card-title">
                        Success/Failed POS tXN Vol/Count YTD
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
                        Issue Wise Total POS Txn Vol/Count YTD
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
                        Ticket Size (Avg txn amount)
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabContent;
