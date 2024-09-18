import Link from "next/link";
import { useEffect, useState,useRef } from "react";
import Loader from "../../shared/loader";
import qrFetchData from "@/services/qr_serivices";
import { convertDateToYMD } from "@/lib/utils/date_to_month";

const TabContent = (props) => {
  const { qr, inv_id } = props;
  const hasFetched = useRef(false);
  const [loading, setLoading] = useState(true);
  const [qrDerivedInfo, setQRDerivedInfo] = useState([]);
  const [qrMerchantDetailsData, setQRMerchantDetailsData] = useState([]);
  const [qrSubMerchantDetailsData, setQRSubMerchantDetailsData] = useState([]);
  const [qrTerminalDetailsData, setQRTerminalDetailsData] = useState([]);
  const fetchAllData = async () => {
    try {
      // Fetch all data concurrently
      const [derivedInfo, merchantInfo, subMerchantInfo, TerminalInfo] =
        await Promise.all([
          qrFetchData.getindivid_qr_derived_info(inv_id),
          qrFetchData.getindivid_qr_merchant_detail_info(inv_id),
          qrFetchData.getindivid_qr_submerchant_detail_info(inv_id),
          qrFetchData.getindivid_qr_terminal_detail_info(inv_id),
        ]);

      // Set all data states
      setQRDerivedInfo(derivedInfo);
      setQRMerchantDetailsData(merchantInfo);
      setQRSubMerchantDetailsData(subMerchantInfo);
      setQRTerminalDetailsData(TerminalInfo);
      console.log(merchantInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // if (!hasFetched.current) {
      fetchAllData();
      // hasFetched.current = true
    // }
  }, [inv_id,qrDerivedInfo,qrMerchantDetailsData,qrSubMerchantDetailsData,qrTerminalDetailsData]);
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
                Derived
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
                {qrDerivedInfo && qrDerivedInfo.map((data, index) => (
                  <div key={`${data.c_id}-${index}`}>
                    {/* <h4 className="tab-title">Derived Info</h4> */}
                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <div className="card basic-card">
                          <p>
                            <span>Merchant Since: </span>
                            <span className="value">
                              {data["dim_qr_merchants.merchant_since"] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Day Since Last Transaction: </span>
                            <span className="value">
                              {data[
                                "dim_qr_merchants.days_since_last_transaction"
                              ] || "N/A"}
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
                      <h5 className="card-title">Merchant Details</h5>
                    </div>
                    <div className="table-scrollable">
                      <table className="table table-sm">
                        <thead>
                          <tr>
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
                            <th>Business Registered Org</th>
                            <th>Is VAT</th>
                            <th>User Profile</th>
                            <th>Merchant Registration Type</th>
                            <th>Reg Mode</th>
                            <th>Business Type</th>
                            <th>Settlement Level</th>
                          </tr>
                        </thead>
                        <tbody>
                          {qrMerchantDetailsData && qrMerchantDetailsData?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {item["dim_qr_merchants.merchant_id"] || "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_merchants.merchant_name"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_merchants.doing_business_as"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_merchants.pan_number"] || "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_merchants.mobile_number"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_merchants.email_id"] || "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_merchants.account_number"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_merchants.status"] || "N/A"}
                              </td>
                              <td>{item["dim_qr_merchants.stage"] || "N/A"}</td>
                              <td>
                                { convertDateToYMD(item["dim_qr_merchants.created_date"]) || "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_merchants.merchant_category"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {item[
                                  "dim_qr_merchants.merchant_subcategory"
                                ] || "N/A"}
                              </td>
                              <td>
                                {item[
                                  "dim_qr_merchants.business_registered_org"
                                ] || "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_merchants.is_vat"] || "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_merchants.user_profile"] || "N/A"}
                              </td>
                              <td>
                                {item[
                                  "dim_qr_merchants.merchant_registration_type"
                                ] || "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_merchants.reg_mode"] || "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_merchants.business_type"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_merchants.settlement_level"] ||
                                  "N/A"}
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
                      <h5 className="card-title">Sub Merchant Details</h5>
                    </div>
                    <div className="table-scrollable">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Sub-Merchant ID</th>
                            <th>Sub-Merchant Name</th>
                            <th className="d-none d-md-table-cell">
                              Created Date
                            </th>
                            <th>Status</th>
                            <th>Stage</th>
                            <th>Is Default</th>
                            <th>Location</th>
                            <th>Address</th>
                            <th>Pan Number</th>
                            <th>Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          { qrSubMerchantDetailsData && qrSubMerchantDetailsData?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {item["dim_qr_sub_merchants.sub_merchant_id"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {item[
                                  "dim_qr_sub_merchants.sub_merchant_name"
                                ] || "N/A"}
                              </td>
                              <td className="d-none d-md-table-cell">
                                { convertDateToYMD(item["dim_qr_sub_merchants.created_date"]) ||
                                  "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_sub_merchants.status"] || "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_sub_merchants.stage"] || "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_sub_merchants.is_default"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_sub_merchants.location"] || "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_sub_merchants.address"] || "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_sub_merchants.pan_number"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_sub_merchants.email"] || "N/A"}
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
                            <th>Is Default</th>
                          </tr>
                        </thead>
                        <tbody>
                          {qrTerminalDetailsData && qrTerminalDetailsData?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {item["dim_qr_terminal.terminal_details_id"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_terminal.sub_merchant_id"] ||
                                  "N/A"}
                              </td>
                              <td className="d-none d-md-table-cell">
                                {item["dim_qr_terminal.terminal_name"] || "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_terminal.fonepay_pan_number"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {item["dim_qr_terminal.merchant_pan_number"] ||
                                  "N/A"}
                              </td>
                              <td>
                                { convertDateToYMD(item["dim_qr_terminal.approved_date"]) || "N/A"}
                              </td>
                              <td>
                                { convertDateToYMD(item["dim_qr_terminal.created_date"]) || "N/A"}
                              </td>
                              <td>{item["dim_qr_terminal.status"] || "N/A"}</td>
                              <td>{item["dim_qr_terminal.stage"] || "N/A"}</td>
                              <td>
                                {item["dim_qr_terminal.is_default"] || "N/A"}
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