// components/TabContent.js
import Link from "next/link";
import { useEffect, useState,useRef,useCallback } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { renderCharts } from "../../components/charts/loan-chart";
import Loader from "../shared/loader";
import loanFetchData from "@/services/loan_service";
import FundedLoan from "@/pages/individuals/cards-account/credit-card";
import { convertDateToYMD } from "@/lib/utils/date_to_month";
const TabContent = (props) => {
  const { individual, inv_id } = props;
  const hasFetched = useRef(false);

  // useEffect(() => {
  //     renderCharts();
  //   }, []);

  const [loading, setLoading] = useState(true);
  const [loanDataFunded, setLoanDataFunded] = useState([]);
  const [loanDataLcIss, setLoanDataLcIss] = useState([]);
  const [loanDataBgOutstanding, setLoanDataBgOutStanding] = useState([]);
  const [loanDataBgReg, setLoanDataBgReg] = useState([]);
  const [loanDataLcOut, setLoanDataLcOut] = useState([]);

  const fetchAllData =useCallback( async () => {
    try {
      // Fetch all data concurrently
      const [fundedloan, lciss, bgout, bgreg, lcout] = await Promise.all([
        loanFetchData.getindivid_loan_details_info(inv_id),
        loanFetchData.getnon_funded_loan_lc_issuance(inv_id),
        loanFetchData.getnon_funded_bg_outstanding(inv_id),
        loanFetchData.getnon_funded_bg_register(inv_id),
        loanFetchData.getnon_funded_loan_lc_outstanding(inv_id),
      ]);

      // Set all data states
      setLoanDataFunded(fundedloan);
      setLoanDataBgOutStanding(bgout);
      setLoanDataBgReg(bgreg);
      setLoanDataLcIss(lciss);
      setLoanDataLcOut(lcout);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  },[inv_id]);

  useEffect(() => {
    // if (!hasFetched.current) {
      fetchAllData();
     
    // }
  }, [inv_id,fetchAllData]);

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
              Funded Loan Detail
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              href="#primary-tab-2"
              data-bs-toggle="tab"
              role="tab"
              aria-selected="false"
              tabIndex="-1"
            >
              Non Funded Loan Detail
            </a>
          </li>
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
              {/* <h4 className="tab-title">Basic Info</h4> */}
              <div className="row">
                <div className="col-md-12 mb-4">
                  <div className="card basic-card">
                    <p>
                      <span>Total No of Loans :</span>
                      <span className="value">100</span>
                    </p>
                    <p>
                      <span>Total Loan Amount :</span>
                      <span className="value">$1,000,000</span>
                    </p>
                    <p>
                      <span>Total Transaction Limit :</span>
                      <span className="value">$2,500,000</span>
                    </p>
                    <p>
                      <span>Total Outdrawing Power Limit :</span>
                      <span className="value">$500,000</span>
                    </p>
                    <p>
                      <span>Total Outstanding Balance limit:</span>
                      <span className="value">$750,000</span>
                    </p>
                    <p>
                      <span>Total Overdue amount:</span>
                      <span className="value">$50,000</span>
                    </p>
                    <p>
                      <span>Total Principal Overdue amt:</span>
                      <span className="value">$30,000</span>
                    </p>
                    <p>
                      <span>Total Interest Overdue Amt:</span>
                      <span className="value">$20,000</span>
                    </p>
                    <p>
                      <span>Total Interest Paid:</span>
                      <span className="value">$100,000</span>
                    </p>
                    <p>
                      <span>Total Penal Amount:</span>
                      <span className="value">$5,000</span>
                    </p>
                    <p>
                      <span>Count of missed installment:</span>
                      <span className="value">10</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="tab-pane" role="tabpanel">
                {/* <h4 className="tab-title">Derived Info</h4> */}
                <div className="row">
                  <div className="col-md-12 mb-4">
                    <div className="basic-card card">
                      <p>
                        <span>First Overdue Date :</span>
                        <span className="value">2023-05-15</span>
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
                        {loanDataFunded &&
                          loanDataFunded?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <a
                                  href={`/individuals/loan-account/funded-loan?foracid=${item["dim_loan_accounts_funded.foracid"]}`}
                                >
                                  {item["dim_loan_accounts_funded.foracid"] ||
                                    "N/A"}
                                </a>
                              </td>
                              <td>
                                {item["dim_product.product_scheme_type"] ||
                                  "N/A"}
                              </td>

                              <td className="d-none d-md-table-cell">
                                {item["dim_loan_accounts_funded.ra_unit"] ||
                                  "N/A"}
                              </td>
                              <td>N/A</td>
                              <td>
                                {item[
                                  "dim_product.product_scheme_description"
                                ] || "N/A"}
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
          <div className="tab-pane" id="primary-tab-2" role="tabpanel">
            {/* <h4 className="tab-title">Details Info</h4> */}
            <div className="row">
              <div className="col-sm-12">
                {/* Funded Loan Table */}
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title"> LC Issuance</h5>
                  </div>
                  <div className="table-scrollable">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>LC No</th>
                          <th>Date opnd</th>
                          <th className="d-none d-md-table-cell">
                            Expiry Date
                          </th>
                          <th>Actl Crncy Code</th>
                          <th>Issu Party Code</th>
                          <th>CIF Id</th>
                          <th>Applicant_name</th>
                          <th>shipment_terms</th>
                          <th>Place of Expiry</th>
                          <th>Port of Destin</th>
                          <th>Comm Details Text1</th>
                          <th>Comm Details Text2</th>
                          <th>Confirmation Reqd Flg</th>
                          <th>Func Code</th>
                          <th>DC Reg Type</th>
                          <th>Last Ship Date</th>
                          <th>Ra Unit</th>
                          <th>Rm Code</th>
                          <th>Beneficiary</th>
                          <th>Ben Address</th>
                          <th>Bank</th>
                          <th>Bank Branch</th>
                          <th>LC_Value</th>
                          <th>Effective Value</th>
                          <th>Outstanding_value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loanDataLcIss &&
                          loanDataLcIss?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {item["dim_non_funded_lc_issuance.lc_no"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {" "}
                                {convertDateToYMD(item["dim_non_funded_lc_issuance.date_opnd"]) ||
                                  "N/A"}
                              </td>

                              <td className="d-none d-md-table-cell">
                                {" "}
                                {convertDateToYMD(item[
                                  "dim_non_funded_lc_issuance.expiry_date"
                                ])|| "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_issuance.actl_crncy_code"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_issuance.issu_party_code"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item["dim_non_funded_lc_issuance.cif_id"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_issuance.applicant_name"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_issuance.shipment_terms"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_issuance.place_of_expiry"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_issuance.port_of_destin"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_issuance.comm_details_text_1"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_issuance.comm_details_text_2"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_issuance.confirmation_reqd_flg"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item["dim_non_funded_lc_issuance.func_code"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_issuance.dc_reg_type"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {convertDateToYMD(item[
                                  "dim_non_funded_lc_issuance.last_ship_date"
                                ]) || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item["dim_non_funded_lc_issuance.ra_unit"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item["dim_non_funded_lc_issuance.rm_code"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_issuance.beneficiary"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_issuance.ben_address"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item["dim_non_funded_lc_issuance.bank"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_issuance.bank_branch"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item["dim_non_funded_lc_issuance.lc_value"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_issuance.effective_value"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_issuance.outstanding_value"
                                ] || "N/A"}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title"> LC Outstanding</h5>
                  </div>
                  <div className="table-scrollable">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>LC No</th>
                          <th>Date opnd</th>
                          <th className="d-none d-md-table-cell">
                            Expiry Date
                          </th>
                          <th>Actl Crncy Code</th>
                          <th>Issu Party Code</th>
                          <th>CIF Id</th>
                          <th>Applicant_name</th>
                          <th>shipment_terms</th>
                          <th>Place of Expiry</th>
                          <th>Port of Destin</th>
                          <th>Comm Details Text1</th>
                          <th>Comm Details Text2</th>
                          <th>Func Code</th>
                          <th>DC Reg Type</th>
                          <th>Last Ship Date</th>
                          <th>Ra Unit</th>
                          <th>Rm Code</th>
                          <th>DC B2 Kid</th>
                          <th>Name</th>
                          <th>Outstanding Address1</th>
                          <th>Corr Bank</th>
                          <th>Outstanding_current_value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loanDataLcOut &&
                          loanDataLcOut?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {" "}
                                {item["dim_non_funded_lc_outstanding.lc_no"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {" "}
                                {convertDateToYMD(item[
                                  "dim_non_funded_lc_outstanding.date_opnd"
                                ]) || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {convertDateToYMD(item[
                                  "dim_non_funded_lc_outstanding.expiry_date"
                                ]) || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_outstanding.actl_crncy_code"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_outstanding.issu_party_code"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item["dim_non_funded_lc_outstanding.cif_id"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_outstanding.applicant_name"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_outstanding.shipment_terms"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_outstanding.place_of_expiry"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_outstanding.port_of_destin"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_outstanding.comm_details_text_1"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_outstanding.comm_details_text_2"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_outstanding.func_code"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_outstanding.dc_reg_type"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {convertDateToYMD(item[
                                  "dim_non_funded_lc_outstanding.last_ship_date"
                                ]) || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_outstanding.ra_unit"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_outstanding.rm_unit"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_outstanding.dc_b2kid"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item["dim_non_funded_lc_outstanding.name"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_outstanding.address1"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_outstanding.corr_bank"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_lc_outstanding.current_value"
                                ] || "N/A"}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">BG Register</h5>
                  </div>
                  <div className="table-scrollable">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Bg Srl Num</th>
                          <th>Issue Date</th>
                          <th className="d-none d-md-table-cell">Bg Type</th>
                          <th>RA Unit</th>
                          <th>Rm Code</th>
                          <th>Cust Name</th>
                          <th>Crncy Code</th>
                          <th>Beneficiary Name</th>
                          <th>purpose_of_bg</th>
                          <th>Bg expiry_date</th>
                          <th>Claim expiry date</th>
                          <th>Bg status</th>
                          <th>Close Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loanDataBgReg &&
                          loanDataBgReg?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_bg_register.bg_srl_num"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {convertDateToYMD(item[
                                  "dim_non_funded_bg_register.issue_date"
                                ]) || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item["dim_non_funded_bg_register.bg_type"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item["dim_non_funded_bg_register.ra_unit"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item["dim_non_funded_bg_register.rm_code"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item["dim_non_funded_bg_register.cust_name"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_bg_register.crncy_code"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_bg_register.beneficiary_name"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_bg_register.purpose_of_bg"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {convertDateToYMD(item[
                                  "dim_non_funded_bg_register.bg_expiry_date"
                                ]) || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {convertDateToYMD(item[
                                  "dim_non_funded_bg_register.claim_expiry_date"
                                ]) || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item["dim_non_funded_bg_register.bg_status"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {" "}
                                {convertDateToYMD(item[
                                  "dim_non_funded_bg_register.close_date"
                                ]) || "N/A"}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">BG Outstanding</h5>
                  </div>
                  <div className="table-scrollable">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Bg Srl Num</th>
                          <th>Issue Date</th>
                          <th className="d-none d-md-table-cell">Bg Type</th>
                          <th>RA Unit</th>
                          <th>Cif Id</th>
                          <th>Address</th>
                          <th>Rm Code</th>
                          <th>Cust Name</th>
                          <th>Crncy Code</th>
                          <th>Beneficiary Name</th>
                          <th>Beneficiary Type</th>
                          <th>purpose_of_bg</th>
                          <th>Bg expiry_date</th>
                          <th>Bg status</th>
                          <th>Claim Expiry Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loanDataBgOutstanding &&
                          loanDataBgOutstanding?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_bg_outstanding.bg_srl_num"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {convertDateToYMD(item[
                                  "dim_non_funded_bg_outstanding.issue_date"
                                ]) || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_bg_outstanding.bg_type"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_bg_outstanding.ra_unit"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item["dim_non_funded_bg_outstanding.cif_id"] ||
                                  "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_bg_outstanding.address"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_bg_outstanding.rm_code"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_bg_outstanding.cust_name"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_bg_outstanding.crncy_code"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_bg_outstanding.beneficiary_name"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_bg_outstanding.beneficiary_type"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_bg_outstanding.purpose_of_bg"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {convertDateToYMD(item[
                                  "dim_non_funded_bg_outstanding.bg_expiry_date"
                                ]) || "N/A"}
                              </td>

                              <td>
                                {" "}
                                {item[
                                  "dim_non_funded_bg_outstanding.bg_status"
                                ] || "N/A"}
                              </td>
                              <td>
                                {" "}
                                {convertDateToYMD(item[
                                  "dim_non_funded_bg_outstanding.claim_expiry_date"
                                ]) || "N/A"}
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
            <h4 className="tab-title">Breakdown Info</h4>
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
              {/* <div className="col-sm-6 col-xxl-6 col-md-12">
      <div className="card breakdown-card">
        <div className="card-header">
          <h5 className="card-title mb-0">Non Funded Limit</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="label">Total No of Non Funded Limits:</span>
            <span className="value">$10,000</span>
          </li>
          <li className="list-group-item">
            <span className="label">Total Amount:</span>
            <span className="value">$2,000</span>
          </li>
          <li className="list-group-item">
            <span className="label">Total Transaction Limit:</span>
            <span className="value">$150</span>
          </li>
          <li className="list-group-item">
            <span className="label">Total Outstanding Value:</span>
            <span className="value">60</span>
          </li>
        </ul>
      </div>
    </div> */}
            </div>
          </div>
          <div className="tab-pane" id="primary-tab-5" role="tabpanel">
            {/* <h4 className="tab-title">Aggregated Insights</h4> */}
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="card flex-fill w-100">
                  <div className="card-header">
                    <h5 className="card-title">Loan Interest Income</h5>
                  </div>
                  <div className="card-body">
                    <div className="chart chart-sm">
                      <canvas
                        id="chartjs-pie"
                        style={{
                          display: "block",
                          width: "405px",
                          height: "250px",
                        }}
                        width="405"
                        height="250"
                        className="chartjs-render-monitor"
                      ></canvas>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Fees and Commision</h5>
                  </div>
                  <div className="card-body">
                    <div className="chart">
                      <canvas
                        id="chartjs-bar1"
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
  );
};

export default TabContent;