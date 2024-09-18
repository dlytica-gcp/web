import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import feather from "feather-icons";
import Link from "next/link";
import individualCustomerFetchData from "@/services/cube_service";
import Loader from "@/components/shared/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Pagination from "@/components/pagination/pagination";
import { convertDateToYMD } from "@/lib/utils/date_to_month";
const LegalStatistics = () => {
  const router = useRouter();
  const [individuals, setIndividuals] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false); // flag for fetched or not
  const [hubs, setHubs] = useState([]);
  const [subProvinces, setSubProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [branches, setBranches] = useState([]);
  const [filters, setFilters] = useState({
    cus_type: "LEGAL",
    searchQuery: "",
    selectedHub: "",
    selectedSubProvince: "",
    selectedCity: "",
    selectedBranch: "",
  });

  // pagination features
  const [currentPage, setCurrentPage] = useState(
    router.query.page ? parseInt(router.query.page) : 1
  );
  const [totalPages, setTotalPages] = useState(10);
  const ITEMS_PER_PAGE = 50;

  const fetchStatData = async (searchQueries, page = 1) => {
    setLoading(true);
    try {
      const [result, totalResult] = await Promise.all([
        individualCustomerFetchData.getStatistic({
          ...searchQueries,
          offset: (page - 1) * ITEMS_PER_PAGE,
          limit: ITEMS_PER_PAGE,
        }),
        individualCustomerFetchData.getTotalCount(searchQueries),
      ]);
      setIndividuals(result);
      setTotalPages(Math.ceil(totalResult / ITEMS_PER_PAGE));
      setCurrentPage(page);
      if (totalResult === 0) {
        toast.info("No users found");
      }
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page },
      });
    } catch (error) {
      console.error("Error fetching individual data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    feather.replace();
    if (!hasFetched.current) {
      // this makes sure that /pathname if only found then changes it to /pathname?page=1 by default
      const page = router.query.page ? parseInt(router.query.page) : 1;
      if (!router.query.page) {
        router.push(
          { pathname: router.pathname, query: { ...router.query, page: 1 } },
          undefined,
          { shallow: true }
        );
      } else {
        setCurrentPage(page);
        fetchStatData(filters, page);
        fetchBranch();
        hasFetched.current = true;
      }
    }
  }, [filters, currentPage, router, individuals]);

  // Fetch data from the API
  const fetchBranch = async () => {
    try {
      const hubResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/branch`
      );
      setHubs(hubResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const handleHubChange = (event) => {
    const hubName = event.target.value;
    handleInputChange("selectedHub", hubName);
    handleInputChange("selectedSubProvince", "");
    handleInputChange("selectedCity", "");
    handleInputChange("selectedBranch", "");

    if (hubName) {
      const hub = hubs.find((hub) => hub.hub_name === hubName);
      if (hub) {
        setSubProvinces(hub.sub_provinces || "");
        setCities(""); // Clear cities
        setBranches(""); // Clear branches
      }
    } else {
      setSubProvinces("");
      setCities("");
      setBranches("");
    }
  };

  const handleSubProvinceChange = (event) => {
    const subProvinceName = event.target.value;
    handleInputChange("selectedSubProvince", subProvinceName);
    handleInputChange("selectedCity", "");
    handleInputChange("selectedBranch", "");

    if (subProvinceName) {
      const hub = hubs.find((hub) => hub.hub_name === filters.selectedHub);
      if (hub) {
        const subProvince = hub.sub_provinces.find(
          (sp) => sp.sub_provincial === subProvinceName
        );
        setCities(subProvince ? subProvince.cities : "");
        setBranches("");
      }
    } else {
      setCities("");
      setBranches("");
    }
  };

  const handleCityChange = (event) => {
    const cityCode = event.target.value;
    handleInputChange("selectedCity", cityCode);
    handleInputChange("selectedBranch", "");

    if (cityCode) {
      const hub = hubs.find((hub) => hub.hub_name === filters.selectedHub);
      const subProvince = hub
        ? hub.sub_provinces.find(
          (sp) => sp.sub_provincial === filters.selectedSubProvince
        )
        : "";
      const city = subProvince
        ? subProvince.cities.find((city) => city.city_code === cityCode)
        : "";
      setBranches(city ? city.branches : "");
    } else {
      setBranches("");
    }
  };

  const handleBranchChange = (event) => {
    handleInputChange("selectedBranch", event.target.value);
  };

  const handleSearchChange = (event) => {
    handleInputChange("searchQuery", event.target.value);

    if (event.key === 'Enter') {
      event.preventDefault();
      fetchStatData(filters);
    }
  };

  const handleRefresh = async (event) => {
    event.preventDefault();
    const newFilters = {
      cus_type: "LEGAL",
      searchQuery: "",
      selectedHub: "",
      selectedSubProvince: "",
      selectedCity: "",
      selectedBranch: "",
    };
    setFilters(newFilters);
    await fetchStatData(newFilters);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchStatData(filters);
  };

  return (
    <>
      <div className="container-fluid p-0">
        <ToastContainer />
        <div className="row mb-2 mb-xl-3">
          <div className="col-auto d-none d-sm-block">
            <h3>
              <strong>Legal</strong> Statistics
            </h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                {/* Search Bar */}
                <div className="row row-cols-md-auto align-items-center mb-4">
                  <div className="col-12 col-md-4">
                    <div className="d-block d-sm-inline-block w-100">
                      <div className="input-group input-group-navbar">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search…"
                          aria-label="Search"
                          value={filters.searchQuery}
                          onChange={handleSearchChange}
                          onKeyDown={handleSearchChange}
                        />
                        <button className="btn" type="button">
                          <i className="align-middle" data-feather="search"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    {/* Refresh Button */}
                    <button
                      className="btn"
                      type="button"
                      onClick={handleRefresh}
                    >
                      <i className="align-middle" data-feather="refresh-cw"></i>
                    </button>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <form
                  className="row row-cols-md-auto align-items-center mb-4"
                  onSubmit={handleSubmit}
                >
                  <div className="col-12 col-md-4">
                    <label className="form-label" htmlFor="hub">
                      Select Province
                    </label>
                    <select
                      id="hub"
                      className="form-control mb-4"
                      value={filters.selectedHub || ""}
                      onChange={handleHubChange}
                    >
                      <option value="">Choose Province</option>
                      {hubs &&
                        hubs.map((hub, index) => (
                          <option key={index} value={hub.hub_name}>
                            {hub.hub_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label" htmlFor="sub_province">
                      Select Sub Province
                    </label>
                    <select
                      id="sub_province"
                      className="form-control mb-4"
                      value={filters.selectedSubProvince || ""}
                      onChange={handleSubProvinceChange}
                      disabled={!filters.selectedHub}
                    >
                      <option value="">Choose Sub Province</option>
                      {subProvinces &&
                        subProvinces.map((subProvince, index) => (
                          <option
                            key={index}
                            value={subProvince.sub_provincial}
                          >
                            {subProvince.sub_provincial}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label" htmlFor="city">
                      Select City
                    </label>
                    <select
                      id="city"
                      className="form-control mb-4"
                      value={filters.selectedCity || ""}
                      onChange={handleCityChange}
                      disabled={!filters.selectedSubProvince}
                    >
                      <option value="">Choose City</option>
                      {cities &&
                        cities.map((city, index) => (
                          <option key={index} value={city.city_code}>
                            {city.city_code}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label" htmlFor="branch">
                      Bank Branch
                    </label>
                    <select
                      id="branch"
                      className="form-control mb-4"
                      value={filters.selectedBranch || ""}
                      onChange={handleBranchChange}
                      disabled={!filters.selectedCity}
                    >
                      <option value="">Choose Bank Branch</option>
                      {branches &&
                        branches.map((branch, index) => (
                          <option key={index} value={branch.branch_description}>
                            {branch.branch_description}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* <div className="col-12 col-md-4">
                    <label className="form-label" htmlFor="productHolding">
                      Number of Product Holding
                    </label>
                    <select id="productHolding" className="form-control mb-4">
                      <option value="">Choose Product Holding</option>
                      <option value="One">One</option>
                      <option value="Two">Two</option>
                      <option value="Three">Three</option>
                    </select>
                  </div> */}
{/* 
                  <div className="col-12 col-md-4">
                    <label className="form-label" htmlFor="productSelect">
                      Select Product
                    </label>
                    <select id="productSelect" className="form-control mb-4">
                      <option value="">Choose Product</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="DMAT">DMAT</option>
                      <option value="Locker">Locker</option>
                      <option value="ATM">ATM</option>
                      <option value="QR">QR</option>
                    </select>
                  </div> */}
                </form>

                {/* Loader below the form */}
                {loading ? (
                  <div className="d-flex justify-content-center mb-4">
                    <Loader />
                  </div>
                ) : (
                  <div className="col-12 col-xl-12">
                    <div className="card">
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>CIF ID</th>
                              <th>Customer Name</th>
                              <th>Age</th>
                              {/* <th>Sex</th> */}
                              <th>Primary Branch</th>
                              <th>CIF Creation Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {individuals &&
                              individuals.map((individual, index) => (
                                <tr key={index}>
                                  <td>
                                    <Link
                                      href={`/legal-entities/${individual["dim_customers.cif_id"]
                                        }`}
                                    >
                                      {individual["dim_customers.cif_id"]}
                                    </Link>
                                  </td>
                                  <td>
                                    {individual["dim_customers.full_name"]}
                                  </td>
                                  <td>{individual["dim_customers.age"]}</td>
                                 
                                  <td>
                                    {individual["dim_customers.home_branch"]}
                                  </td>
                                  <td> {" "}
                                    {convertDateToYMD(
                                      individual[
                                      "dim_customers.cust_relationship_start_date"
                                      ]
                                    )}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* Pagination controls */}
                    {individuals && individuals.length > 0 && (
                      <div className="row">
                        <Pagination
                          totalPages={totalPages}
                          currentPage={currentPage}
                          filters={filters}
                          fetchStatData={fetchStatData}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalStatistics;
