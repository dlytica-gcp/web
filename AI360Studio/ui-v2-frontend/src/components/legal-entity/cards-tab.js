// components/TabContent.js
import Link from "next/link";
import { useEffect, useState } from "react";
import cardFetchData from "@/services/card_service";
import Loader from "../shared/loader";
import { convertDateToYMD } from "@/lib/utils/date_to_month";
import {
  encryptCardNumber,
  maskCardNumber,
} from "@/lib/utils/card_number_hasher";


const TabContent = (props) => {
  const { individual, legal_id } = props;

  const [loading, setLoading] = useState(true);
  const [individDebitCardDetail, setIndividDebitCardDetail] = useState([]);
  const [individCreditCardDetail, setIndividCreditCardDetail] = useState([]);
  const [individBasicInfo, setIndividBasicInfo] = useState([]);
  const [individCreditBreakdownInfo, setIndividCreditBreakdowncInfo] = useState(
    []
  );
  const [individDebitBreakdownInfo, setIndividDebitBreakdowncInfo] = useState(
    []
  );
  // useEffect(() => {
  //   renderCharts();
  // }, []);
  // const fetchSavingDepoData = async () => {
  //   try {
  //     // Fetch the individual data
  //     const result = await cubeFetchData.getsavingdepo_basicinfo_derived(
  //       "10134786"
  //     );
  //     console.log("here is", result);
  //     setIndividualData(result);

  //     // Extract data for DIGITAL
  //   } catch (error) {
  //     console.error("Error fetching individual data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchSavingDepoData();
  // }, []);
  const fetchAllData = async () => {
    try {
      // Fetch all data concurrently
      const [
        basicinfo,
        creditbreakdowninfo,
        debitbreakdowninfo,
        debitcard_detail,
        creditcard_detail,
      ] = await Promise.all([
        cardFetchData.getindivid_card_basic_info(legal_id),
        cardFetchData.getindivid_credit_card_breakdown_info(legal_id),
        cardFetchData.getindivid_debit_card_breakdown_info(legal_id),
        cardFetchData.getindivid_debit_card_details_info(legal_id),
        cardFetchData.getindivid_credit_card_details_info(legal_id),
      ]);

      // Set all data states
      setIndividBasicInfo(basicinfo);
      setIndividDebitCardDetail(debitcard_detail);
      setIndividCreditBreakdowncInfo(creditbreakdowninfo);
      setIndividDebitBreakdowncInfo(debitbreakdowninfo);
      setIndividCreditCardDetail(creditcard_detail);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (legal_id) {
      fetchAllData();
    }
  }, [legal_id]);

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
              {individBasicInfo &&
                individBasicInfo.map((data, index) => (
                  <div key={`${data.c_id}-${index}`}>
                    {/* <h4 className="tab-title">Basic Info</h4> */}
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="card">
                          <div className="card-body">
                            <div className="row">
                              <div className="col mt-0">
                                <h5 className="card-title">
                                  Total Active Cards
                                </h5>
                              </div>

                              <div className="col-auto">
                                <div className="stat text-primary">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-check-circle align-middle"
                                  >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="9 12 12 15 16 10"></polyline>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <h1 className="mt-1 mb-3">
                              {data["dim_cards_card.total_active_cards"] ||
                                "N/A"}
                            </h1>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-body">
                            <div className="row">
                              <div className="col mt-0">
                                <h5 className="card-title">
                                  Total Transaction Amount
                                </h5>
                              </div>

                              <div className="col-auto">
                                <div className="stat text-primary">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 28"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-dollar-sign align-middle"
                                  >
                                    <line x1="12" y1="1" x2="12" y2="35"></line>
                                    <path d="M17 5H9a5 5 0 0 0 0 10h6a5 5 0 0 1 0 10H7"></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <h1 className="mt-1 mb-3">
                              {data[
                                "dim_cards_card.total_transactions_amount"
                              ] || "N/A"}
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="card">
                          <div className="card-body">
                            <div className="row">
                              <div className="col mt-0">
                                <h5 className="card-title">
                                  Total Transaction Count
                                </h5>
                              </div>
                              <div className="col-auto">
                                <div className="stat text-primary">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-clock align-middle"
                                  >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <h1 className="mt-1 mb-3">
                              {data["dim_cards_card.total_transactions"] ||
                                "N/A"}
                            </h1>
                          </div>
                        </div>

                        <div className="card">
                          <div className="card-body">
                            <div className="row">
                              <div className="col mt-0">
                                <h5 className="card-title">Total Cards</h5>
                              </div>
                              <div className="col-auto">
                                <div className="stat text-primary">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-clock align-middle"
                                  >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <h1 className="mt-1 mb-3">
                              {data["dim_cards_card.total_cards"] || "N/A"}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="tab-pane" id="primary-tab-2" role="tabpanel">
                {/* <h4 className="tab-title">Breakdown Info</h4> */}
                <div className="row">
                  {individDebitBreakdownInfo &&
                    individDebitBreakdownInfo.map((data, index) => (
                      <div key={`${data.c_id}-${index}`}>
                        <div className="col-sm-6 col-md-12">
                          <div className="breakdown-card card">
                            <div className="card-header">
                              <h5 className="card-title mb-0">Debit Card</h5>
                            </div>
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item">
                                <span className="label">
                                  Total No of Cards:
                                </span>
                                <span className="value">
                                  {data["dim_cards_debit_card.total_cards"] ||
                                    "N/A"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="label">
                                  Total No of Active Cards:
                                </span>
                                <span className="value">
                                  {data[
                                    "dim_cards_debit_card.total_active_card"
                                  ] || "N/A"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="label">
                                  Total No of Inactive Cards:
                                </span>
                                <span className="value">
                                  {data[
                                    "dim_cards_debit_card.total_inactive_cards"
                                  ] || "N/A"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="label">
                                  Last Debit Card Opened Date:
                                </span>
                                <span className="value">
                                  {convertDateToYMD(
                                    data[
                                    "dim_cards_debit_card.last_created_date"
                                    ]
                                  ) || "N/A"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="label">
                                  Total POS txn MMC wise
                                </span>
                                <span className="value">
                                  {data[
                                    "dim_cards_debit_card.total_pos_txn_amount"
                                  ] || "N/A"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="label">Total ecom Txn</span>
                                <span className="value">
                                  {data[
                                    "dim_cards_debit_card.total_ecom_txn_amount"
                                  ] || "N/A"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="label">Total Atm Txn</span>
                                <span className="value">
                                  {data[
                                    "dim_cards_debit_card.total_atm_txn_amount"
                                  ] || "N/A"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="label">First Issued Date</span>
                                <span className="value">null</span>
                              </li>
                              <li className="list-group-item">
                                <span className="label">
                                  Total Transaction Per Channel
                                </span>
                                <span className="value">null</span>
                              </li>
                              <li className="list-group-item">
                                <span className="label">
                                  Total Atm Txn Amount
                                </span>
                                <span className="value">
                                  {data[
                                    "dim_cards_debit_card.total_txn_amounts"
                                  ] || "N/A"}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  {individCreditBreakdownInfo &&
                    individCreditBreakdownInfo.map((data, index) => (
                      <div key={`${data.c_id}-${index}`}>
                        <div className="col-sm-6 col-md-12">
                          <div className="breakdown-card card">
                            <div className="card-header">
                              <h5 className="card-title mb-0">Credit Card</h5>
                            </div>
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item">
                                <span className="label">
                                  Total No of Cards:
                                </span>
                                <span className="value">
                                  {data["dim_cards_credit_card.total_cards"] ||
                                    "N/A"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="label">
                                  Total No of Active Cards:
                                </span>
                                <span className="value">
                                  {data[
                                    "dim_cards_credit_card.total_active_card"
                                  ] || "N/A"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="label">
                                  Total No of Inactive Cards:
                                </span>
                                <span className="value">
                                  {data[
                                    "dim_cards_credit_card.total_inactive_cards"
                                  ] || "N/A"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="label">
                                  Total Available Credit Limit:
                                </span>
                                <span className="value">
                                  {data[
                                    "dim_cards_credit_card.total_credit_limit"
                                  ] || "N/A"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="label">
                                  Total Available Balance:
                                </span>
                                <span className="value">
                                  {data[
                                    "dim_cards_credit_card.total_available_balance"
                                  ] || "N/A"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="label">
                                  Last Credit Card Opened Date:
                                </span>
                                <span className="value">
                                  {convertDateToYMD(
                                    data[
                                    "dim_cards_credit_card.last_created_date"
                                    ]
                                  ) || "N/A"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="label">Total POS txn</span>
                                <span className="value">
                                  {data[
                                    "dim_cards_credit_card.total_pos_txn_amount"
                                  ] || "N/A"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="label">Total ecom Txn</span>
                                <span className="value">
                                  {data[
                                    "dim_cards_credit_card.total_ecom_txn_amount"
                                  ] || "N/A"}
                                </span>
                              </li>

                              <li className="list-group-item">
                                <span className="label">
                                  Total ATM Txn Amount
                                </span>
                                <span className="value">
                                  {" "}
                                  {data[
                                    "dim_cards_credit_card.total_atm_txn_amount"
                                  ] || "N/A"}
                                </span>
                              </li>

                              <li className="list-group-item">
                                <span className="label">Total Txn Amount</span>
                                <span className="value">
                                  {data[
                                    "dim_cards_credit_card.total_txn_amounts"
                                  ] || "N/A"}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
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
                    <h5 className="card-title">Debit Cards</h5>
                  </div>
                  <div className="table-scrollable">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Card No</th>
                          <th>Open Date</th>
                          <th>Card Status</th>
                          <th>Associated Account No</th>
                        </tr>
                      </thead>
                      <tbody>
                        {individDebitCardDetail && individDebitCardDetail.map((item, index) => (

                          <tr key={index}>
                            {/* <td>
  <a href="/individuals/cards-account/debit-card">
    11
  </a>
</td> */}
                            <td>
                              <Link
                                href={`/legal-entities/cards-account/debit-card?cif_id=${legal_id}&card_id=${encodeURIComponent(
                                  encryptCardNumber(item["dim_cards_debit_card.car_numb"]))}`}
                              >
                                {maskCardNumber(item["dim_cards_debit_card.car_numb"])}
                              </Link>
                            </td>
                            <td>{convertDateToYMD(item["dim_cards_debit_card.car_firs_crea_date"]) || "N/A"} </td>
                            <td className="d-none d-md-table-cell">{item["dim_cards_debit_card.card_status"] || "N/A"} </td>
                            <td>{item["dim_cards_debit_card.foracid"] || "N/A"} </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Credit Cards</h5>
                  </div>
                  <div className="table-scrollable">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Card No</th>
                          <th>Open Date</th>
                          <th>Credit Limit</th>
                          <th>Available Balance</th>
                          <th>Used Balance</th>
                          <th>Card Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {individCreditCardDetail && individCreditCardDetail.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <Link href={`/legal-entities/cards-account/credit-card?cif_id=${legal_id}&card_id=${encodeURIComponent(encryptCardNumber(item["dim_cards_credit_card.car_numb"]))}`}>
                                {maskCardNumber(item["dim_cards_credit_card.car_numb"])}
                              </Link>
                            </td>
                            <td>{convertDateToYMD(item["dim_cards_credit_card.car_firs_crea_date"]) || "N/A"}</td>
                            <td className="d-none d-md-table-cell">{item["dim_cards_credit_card.credit_limit"] || "N/A"}</td>
                            <td>{item["dim_cards_credit_card.available_balance"]}</td>
                            <td>{item["dim_cards_credit_card.used_balance"]}</td>
                            <td>{item["dim_cards_credit_card.card_status"]}</td>
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
            {/* <h4 className="tab-title">Aggregated Insights</h4> */}
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="card flex-fill w-100">
                  <div className="card-header">
                    <h5 className="card-title">
                      Total Transaction Frequency & Amount per mcc
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="chart chart-sm">
                      <canvas
                        id="chartjs-pie1"
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
                <div className="card flex-fill w-100">
                  <div className="card-header">
                    <h5 className="card-title">
                      Total Transaction Frequency & Amount per transaction
                      channel
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="chart chart-sm">
                      <canvas
                        id="chartjs-pie2"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabContent;