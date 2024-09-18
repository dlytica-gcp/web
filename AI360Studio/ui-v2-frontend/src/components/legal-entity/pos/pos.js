import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import Loader from "../../shared/loader";
import posFetchData from "@/services/pos_services";
import { convertDateToYMD } from "@/lib/utils/date_to_month";
import supersetService from "@/services/superset_service";

const TabContent = (props) => {
  const { pos, legal_id } = props;
  const hasFetched = useRef(false);
  const [loading, setLoading] = useState(true);
  const [posDerivedInfo, setPosDerivedInfo] = useState([]);
  const [posMerchantDetailsData, setPosMerchantDetailsData] = useState([]);
  const [posTerminalDetailsData, setPosTerminalDetailsData] = useState([]);

  const fetchAllData = useCallback(async () => {
    try {
      // Fetch all data concurrently
      const [derivedInfo, merchantInfo, TerminalInfo] = await Promise.all([
        posFetchData.getindivid_pos_derived_info(legal_id),
        posFetchData.getindivid_pos_merchant_detail_info(legal_id),
        posFetchData.getindivid_pos_terminal_detail_info(legal_id),
      ]);

      // Set all data states
      setPosDerivedInfo(derivedInfo);
      setPosMerchantDetailsData(merchantInfo);
      setPosTerminalDetailsData(TerminalInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [legal_id]);

  useEffect(() => {
    fetchAllData();
    if (!hasFetched.current) {
      const dashboardElement = "legal-pos-dashboard";
      const filters = {
        // cif_id: legal_id,
      };
      const embed = async () => {
        const dashboardId = "902a9a9b-d878-4e84-adfe-9523de4fe989";
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
  }, [legal_id, fetchAllData]);

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
                {posDerivedInfo && posDerivedInfo.map((data, index) => (
                  <div key={`${data.c_id}-${index}`}>
                    {/* <h4 className="tab-title">Derived Info</h4> */}
                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <div className="card basic-card">
                          <p>
                            <span>Merchant Since: </span>
                            <span className="value">
                              {" "}
                              {data["dim_cards_merchant.merchant_since"] ||
                                "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>Day Since Last Transaction: </span>
                            <span className="value">
                              {data[
                                "dim_cards_merchant.days_since_last_transaction"
                              ] || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span>
                              Day between account opening and first merchant
                              creation:{" "}
                            </span>
                            <span className="value">
                              {data[
                                "dim_cards_merchant.days_bet_acc_opn_mer_crea"
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
                      <h5 className="card-title">Merchant Detail List</h5>
                    </div>
                    <div className="table-scrollable">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            {/* <th>Document ID</th> */}
                            <th>Merchant Code</th>
                            <th className="d-none d-md-table-cell">Identity</th>
                            <th>Name</th>
                            <th>Currency</th>
                            <th>MCC</th>
                            <th>Status</th>
                            <th>Company Type</th>
                            <th>Created Date</th>
                            <th>Commission Effective Date</th>
                            <th>Last Payment Date</th>
                            <th>Last Status Date</th>
                            <th>Location</th>
                            <th>Account</th>
                          </tr>
                        </thead>
                        <tbody>
                          {posMerchantDetailsData && posMerchantDetailsData?.map((item, index) => (
                            <tr key={index}>
                              <td>{item["dim_cards_merchant.merchant_code"] || "N/A"}</td>
                              <td>{item["dim_cards_merchant.merchant_identity"] || "N/A"}</td>
                              <td className="d-none d-md-table-cell">{item["dim_cards_merchant.merchant_name"] || "N/A"}</td>
                              <td>{item["dim_cards_merchant.currency"] || "N/A"}</td>
                              <td>{item["dim_cards_merchant.mcc"] || "N/A"}</td>
                              <td>{item["dim_cards_merchant.merchant_status"] || "N/A"}</td>
                              <td>{item["dim_cards_merchant.company_type"] || "N/A"}</td>
                              <td>{convertDateToYMD(item["dim_cards_merchant.mer_crea_date"]) || "N/A"}</td>
                              <td>{convertDateToYMD(item["dim_cards_merchant.mer_comm_effe_date"]) || "N/A"}</td>
                              <td>{convertDateToYMD(item["dim_cards_merchant.mer_last_paym_date"]) || "N/A"}</td>
                              <td>{convertDateToYMD(item["dim_cards_merchant.mer_last_status_date"]) || "N/A"}</td>
                              <td>{item["dim_cards_merchant.mer_location"] || "N/A"}</td>
                              <td>{item["dim_cards_merchant.account_number"] || "N/A"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Relationship Card */}
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">Terminal Details List</h5>
                    </div>
                    <div className="table-scrollable">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            {/* <th>CIF ID</th> */}
                            <th>Terminal Code</th>
                            <th>Identity</th>
                            <th className="d-none d-md-table-cell">Name</th>
                            <th>Merchant Code</th>
                            <th>Status</th>
                            <th>Default Currency</th>
                            <th>Application Versions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {posTerminalDetailsData && posTerminalDetailsData?.map((item, index) => (
                            <tr key={index}>
                              <td>{item["dim_pos_terminal.pte_code"] || "N/A"}</td>
                              <td className="d-none d-md-table-cell">{item["dim_pos_terminal.pte_iden"] || "N/A"}</td>
                              <td>{item["dim_pos_terminal.pte_labe"] || "N/A"}</td>
                              <td>{item["dim_cards_merchant.merchant_code"] || "N/A"}</td>
                              <td>{item["dim_pos_terminal.terminal_status"] || "N/A"}</td>
                              <td>{item["dim_pos_terminal.default_currency"] || "N/A"}</td>
                              <td>{item["dim_pos_terminal.pte_appl_vers_numb"] || "N/A"}</td>
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
              <div className="row">
                <div
                  id="legal-pos-dashboard"
                  style={{ width: "100%", height: "800px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabContent;