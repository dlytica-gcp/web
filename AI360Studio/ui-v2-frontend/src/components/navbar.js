// components/Navbar.js
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from '@/styles/Navbar.module.css';
import feather from "feather-icons";
const Navbar = ({ onToggleSidebar, inv_id, legal_id, cif_id }) => {
  const router = useRouter();
  const { asPath, pathname, query } = router;
  console.log("navbar", legal_id);
  const [searchInput, setSearchInput] = useState(""); // Single search input

  const deleteCookie = (cookieName) => {
    document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  };
  useEffect(() => {
    if (inv_id) {
      setSearchInput(inv_id);
    } else if (legal_id) {
      setSearchInput(legal_id);
    }
  }, [inv_id, legal_id]);

  useEffect(() => {
    feather.replace(); // Initialize feather icons
  }, [pathname, inv_id, legal_id, cif_id, router.query]);

  const handleLogout = () => {
    // Get all cookies
    const cookies = document.cookie.split(";");

    // Loop through all cookies and delete each one
    cookies.forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      deleteCookie(cookieName);
    });

    // Redirect to the home page after logging out
    router.push("/login");
  };
  const handleSearch = () => {
    const currentPath = router.pathname;

    if (searchInput) {
      if (currentPath.includes("legal-entities")) {
        router.push(`/legal-entities/${searchInput}`);
      } else if (currentPath.includes("individuals")) {
        router.push(`/individuals/${searchInput}`);
      } else {
        console.error(
          "Cannot determine the search context (inv_id or legal_id)."
        );
      }
    }
  };
  // Check if the current path contains 'individuals' or 'legal-entities'
  const currentPath = router.pathname;
  const isIndividual = currentPath.includes("/individuals/");
  const isLegalEntity = currentPath.includes("/legal-entities/");

  return (
    <>
      <a className="sidebar-toggle " onClick={onToggleSidebar}>
        <i className="hamburger align-self-center"></i>
      </a>

      {/* <form
        className="d-none d-sm-inline-block"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="input-group input-group-navbar">
          <input
            type="text"
            className="form-control"
            placeholder="Search by ID…"
            aria-label="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} // Controlled input for searchInput
          />
          <button className="btn" type="button" onClick={handleSearch}>
            <i className="align-middle" data-feather="search"></i>
          </button>
        </div>
      </form> */}

      <div className="navbar-collapse collapse justify-content-end">
        <ul className="navbar-nav ">
          {/* Customer Info link */}
          {isIndividual && inv_id ? (
            <Link href={`/individuals/${inv_id}`} legacyBehavior>
              <a
                className={`nav-link ${styles.navlink} ${
                  asPath === `/individuals/${inv_id}` ? styles.active : ""
                }`}
              >
                Customer Info
              </a>
            </Link>
          ) : isLegalEntity && legal_id ? (
            <Link href={`/legal-entities/${legal_id}`} legacyBehavior>
              <a
                className={`nav-link ${styles.navlink} ${
                  asPath === `/legal-entities/${legal_id}` ? styles.active : ""
                }`}
              >
                Customer Info
              </a>
            </Link>
          ) : null}

          {/* Deposit link */}
          {isIndividual && inv_id ? (
            <Link href={`/individuals/deposit?inv_id=${inv_id}`} legacyBehavior>
              <a
                className={`nav-link ${styles.navlink} ${
                  (pathname === `/individuals/deposit` &&
                    query.inv_id === inv_id) ||
                  (pathname === `/individuals/deposit-account/saving-deposit` &&
                    query.inv_id === cif_id) ||
                  (pathname === `/individuals/deposit-account/fixed-deposit` &&
                    query.inv_id === cif_id)
                    ? styles.active
                    : ""
                }`}
              >
                Deposit
              </a>
            </Link>
          ) : isLegalEntity && legal_id ? (
            <Link
              href={`/legal-entities/deposit?legal_id=${legal_id}`}
              legacyBehavior
            >
              <a
                className={`nav-link ${styles.navlink} ${
                  (pathname === `/legal-entities/deposit` &&
                    query.legal_id === legal_id) ||
                  (pathname ===
                    `/legal-entities/deposit-account/saving-deposit` &&
                    query.legal_id === cif_id) ||
                  (pathname ===
                    `/legal-entities/deposit-account/fixed-deposit` &&
                    query.legal_id === cif_id)
                    ? styles.active
                    : ""
                }`}
              >
                Deposit
              </a>
            </Link>
          ) : null}

          {/* Loan link */}
          {isIndividual && inv_id ? (
            <Link href={`/individuals/loan?inv_id=${inv_id}`} legacyBehavior>
              <a
                className={`nav-link ${styles.navlink} ${
                  (pathname === `/individuals/loan` &&
                    query.inv_id === inv_id) ||
                  (pathname === `/individuals/loan-account/funded-loan` &&
                    query.inv_id === cif_id)
                    ? styles.active
                    : ""
                }`}
              >
                Loan
              </a>
            </Link>
          ) : isLegalEntity && legal_id ? (
            <Link
              href={`/legal-entities/loan?legal_id=${legal_id}`}
              legacyBehavior
            >
              <a
                className={`nav-link ${styles.navlink} ${
                  (pathname === `/legal-entities/loan` &&
                    query.legal_id === legal_id) ||
                  (pathname === `/legal-entities/loan-account/funded-loan` &&
                    query.legal_id === cif_id)
                    ? styles.active
                    : ""
                }`}
              >
                Loan
              </a>
            </Link>
          ) : null}

          {/* Cards link */}
          {isIndividual && inv_id ? (
            <Link href={`/individuals/cards?inv_id=${inv_id}`} legacyBehavior>
              <a
                className={`nav-link ${styles.navlink} ${
                  (pathname === `/individuals/cards` &&
                    query.inv_id === inv_id) ||
                  (pathname === `/individuals/cards-account/debit-card` &&
                    query.inv_id === cif_id) ||
                  (pathname === `/individuals/cards-account/credit-card` &&
                    query.inv_id === cif_id)
                    ? styles.active
                    : ""
                }`}
              >
                Cards
              </a>
            </Link>
          ) : isLegalEntity && legal_id ? (
            <Link
              href={`/legal-entities/cards?legal_id=${legal_id}`}
              legacyBehavior
            >
              <a
                className={`nav-link ${styles.navlink} ${
                  (pathname === `/legal-entities/cards` &&
                    query.legal_id === legal_id) ||
                  (pathname === `/legal-entities/cards-account/debit-card` &&
                    query.inv_id === cif_id) ||
                  (pathname === `/legal-entities/cards-account/credit-card` &&
                    query.inv_id === cif_id)
                    ? styles.active
                    : ""
                }`}
              >
                Cards
              </a>
            </Link>
          ) : null}

          {/* Services Dropdown */}
          <li className="nav-item px-2 dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="megaDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Services
            </a>
            <div
              className="dropdown-menu dropdown-menu-end dropdown-mega"
              aria-labelledby="megaDropdown"
            >
              <div className="d-md-flex align-items-start justify-content-start">
                {/* Digital Services */}
                <div className="dropdown-mega-list">
                  <div
                    className="dropdown-header"
                    style={{ fontWeight: "bold" }}
                  >
                    Digital
                  </div>
                  {isIndividual && inv_id ? (
                    <Link
                      href={`/individuals/digital/mobile-banking?inv_id=${inv_id}`}
                      legacyBehavior
                    >
                      <a
                        className={`dropdown-item ${styles.dropdown_item} ${
                          pathname === `/individuals/digital/mobile-banking` &&
                          query.inv_id === inv_id
                            ? styles.active
                            : ""
                        }`}
                      >
                        <i
                          data-feather="smartphone"
                          className="align-center me-1"
                        ></i>
                        Mobile Banking
                      </a>
                    </Link>
                  ) : isLegalEntity && legal_id ? (
                    <Link
                      href={`/legal-entities/digital/mobile-banking?legal_id=${legal_id}`}
                      legacyBehavior
                    >
                      <a
                        className={`dropdown-item ${styles.dropdown_item} ${
                          pathname ===
                            `/legal-entities/digital/mobile-banking` &&
                          query.legal_id === legal_id
                            ? styles.active
                            : ""
                        }`}
                      >
                        <i
                          data-feather="smartphone"
                          className="align-center me-1"
                        ></i>
                        Mobile Banking
                      </a>
                    </Link>
                  ) : null}
                </div>

                {/* Investment Services */}
                <div className="dropdown-mega-list">
                  <div
                    className="dropdown-header"
                    style={{ fontWeight: "bold" }}
                  >
                    Investment
                  </div>
                  <Link href="#" legacyBehavior>
                    <a
                      className={`dropdown-item ${styles.dropdown_item} ${
                        pathname === "/some/investment/path"
                          ? styles.active
                          : ""
                      }`}
                    >
                      <i
                        data-feather="bar-chart"
                        className="align-center me-1"
                      ></i>
                      Mero Share
                      <span className={styles.comingSoon}> (Coming Soon)</span>
                    </a>
                  </Link>
                  <Link href="#" legacyBehavior>
                    <a
                      className={`dropdown-item ${styles.dropdown_item} ${
                        pathname === "/some/investment/path"
                          ? styles.active
                          : ""
                      }`}
                    >
                      <i
                        data-feather="file-text"
                        className="align-center me-1"
                      ></i>
                      DMAT
                      <span className={styles.comingSoon}> (Coming Soon)</span>
                    </a>
                  </Link>
                </div>

                {/* Other Services */}
                <div className="dropdown-mega-list">
                  <div
                    className="dropdown-header"
                    style={{ fontWeight: "bold" }}
                  >
                    Others
                  </div>
                  <Link href="#" legacyBehavior>
                    <a
                      className={`dropdown-item ${styles.dropdown_item} ${
                        pathname === "/some/other/path" ? styles.active : ""
                      }`}
                    >
                      <i data-feather="lock" className="align-center me-1"></i>
                      Locker
                      <span className={styles.comingSoon}> (Coming Soon)</span>
                    </a>
                  </Link>
                  {isIndividual && inv_id ? (
                    <Link href="#" legacyBehavior>
                      <a
                        className={`dropdown-item ${styles.dropdown_item} ${
                          pathname === `/individuals/qr/qr` &&
                          query.inv_id === inv_id
                            ? styles.active
                            : ""
                        }`}
                      >
                        <i
                          data-feather="grid"
                          className="align-center me-1"
                        ></i>
                        QR{" "}
                        <span className={styles.comingSoon}>
                          {" "}
                          (Coming Soon)
                        </span>
                      </a>
                    </Link>
                  ) : isLegalEntity && legal_id ? (
                    <Link
                      href={`/legal-entities/qr/qr?legal_id=${legal_id}`}
                      legacyBehavior
                    >
                      <a
                        className={`dropdown-item ${styles.dropdown_item} ${
                          pathname === `/legal-entities/qr/qr` &&
                          query.legal_id === legal_id
                            ? styles.active
                            : ""
                        }`}
                      >
                        <i
                          data-feather="grid"
                          className="align-center me-1"
                        ></i>
                        QR
                      </a>
                    </Link>
                  ) : null}
                  {isIndividual && inv_id ? (
                    <Link href="#" legacyBehavior>
                      <a
                        className={`dropdown-item ${styles.dropdown_item} ${
                          pathname === `/individuals/pos/pos` &&
                          query.inv_id === inv_id
                            ? styles.active
                            : ""
                        }`}
                      >
                        {" "}
                        <i
                          data-feather="credit-card"
                          className="align-center me-1"
                        ></i>
                        POS
                        <span className={styles.comingSoon}>
                          {" "}
                          (Coming Soon)
                        </span>
                      </a>
                    </Link>
                  ) : isLegalEntity && legal_id ? (
                    <Link
                      href={`/legal-entities/pos/pos?legal_id=${legal_id}`}
                      legacyBehavior
                    >
                      <a
                        className={`dropdown-item ${styles.dropdown_item} ${
                          pathname === `/legal-entities/pos/pos` &&
                          query.legal_id === legal_id
                            ? styles.active
                            : ""
                        }`}
                      >
                        <i
                          data-feather="credit-card"
                          className="align-center me-1"
                        ></i>
                        POS
                      </a>
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul className="navbar-nav">
          {/* <li className="nav-item dropdown">
            <a
              className="nav-icon dropdown-toggle"
              href="index.html#"
              id="alertsDropdown"
              data-bs-toggle="dropdown"
            >
              <div className="position-relative">
                <i className="align-middle" data-feather="bell"></i>
                <span className="indicator">4</span>
              </div>
            </a>
            <div
              className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0"
              aria-labelledby="alertsDropdown"
            >
              <div className="dropdown-menu-header">4 New Notifications</div>
              <div className="list-group">
                <a href="index.html#" className="list-group-item">
                  <div className="row g-0 align-items-center">
                    <div className="col-2">
                      <i
                        className="text-danger"
                        data-feather="alert-circle"
                      ></i>
                    </div>
                    <div className="col-10">
                      <div className="text-dark">Update completed</div>
                      <div className="text-muted small mt-1">
                        Restart server 12 to complete the update.
                      </div>
                      <div className="text-muted small mt-1">30m ago</div>
                    </div>
                  </div>
                </a>
                <a href="index.html#" className="list-group-item">
                  <div className="row g-0 align-items-center">
                    <div className="col-2">
                      <i className="text-warning" data-feather="bell"></i>
                    </div>
                    <div className="col-10">
                      <div className="text-dark">Lorem ipsum</div>
                      <div className="text-muted small mt-1">
                        Aliquam ex eros, imperdiet vulputate hendrerit et.
                      </div>
                      <div className="text-muted small mt-1">2h ago</div>
                    </div>
                  </div>
                </a>
                <a href="index.html#" className="list-group-item">
                  <div className="row g-0 align-items-center">
                    <div className="col-2">
                      <i className="text-primary" data-feather="home"></i>
                    </div>
                    <div className="col-10">
                      <div className="text-dark">Login from 192.186.1.8</div>
                      <div className="text-muted small mt-1">5h ago</div>
                    </div>
                  </div>
                </a>
                <a href="index.html#" className="list-group-item">
                  <div className="row g-0 align-items-center">
                    <div className="col-2">
                      <i className="text-success" data-feather="user-plus"></i>
                    </div>
                    <div className="col-10">
                      <div className="text-dark">New connection</div>
                      <div className="text-muted small mt-1">
                        Christina accepted your request.
                      </div>
                      <div className="text-muted small mt-1">14h ago</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="dropdown-menu-footer">
                <a href="index.html#" className="text-muted">
                  Show all notifications
                </a>
              </div>
            </div>
          </li> */}

          {/* 
    <li className="nav-item dropdown">
      <a className="nav-icon dropdown-toggle" href="index.html#" id="messagesDropdown" data-bs-toggle="dropdown">
        <div className="position-relative">
          <i className="align-middle" data-feather="message-square"></i>
        </div>
      </a>
      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="messagesDropdown">
        <div className="dropdown-menu-header">
          <div className="position-relative">
            4 New Messages
          </div>
        </div>
        <div className="list-group">
          <a href="index.html#" className="list-group-item">
            <div className="row g-0 align-items-center">
              <div className="col-2">
                <img src="img/avatars/avatar-5.jpg" className="avatar img-fluid rounded-circle" alt="Vanessa Tucker" />
              </div>
              <div className="col-10 ps-2">
                <div className="text-dark">Vanessa Tucker</div>
                <div className="text-muted small mt-1">Nam pretium turpis et arcu. Duis arcu tortor.</div>
                <div className="text-muted small mt-1">15m ago</div>
              </div>
            </div>
          </a>
          <a href="index.html#" className="list-group-item">
            <div className="row g-0 align-items-center">
              <div className="col-2">
                <img src="img/avatars/avatar-2.jpg" className="avatar img-fluid rounded-circle" alt="William Harris" />
              </div>
              <div className="col-10 ps-2">
                <div className="text-dark">William Harris</div>
                <div className="text-muted small mt-1">Curabitur ligula sapien euismod vitae.</div>
                <div className="text-muted small mt-1">2h ago</div>
              </div>
            </div>
          </a>
          <a href="index.html#" className="list-group-item">
            <div className="row g-0 align-items-center">
              <div className="col-2">
                <img src="img/avatars/avatar-4.jpg" className="avatar img-fluid rounded-circle" alt="Christina Mason" />
              </div>
              <div className="col-10 ps-2">
                <div className="text-dark">Christina Mason</div>
                <div className="text-muted small mt-1">Pellentesque auctor neque nec urna.</div>
                <div className="text-muted small mt-1">4h ago</div>
              </div>
            </div>
          </a>
          <a href="index.html#" className="list-group-item">
            <div className="row g-0 align-items-center">
              <div className="col-2">
                <img src="img/avatars/avatar-3.jpg" className="avatar img-fluid rounded-circle" alt="Sharon Lessman" />
              </div>
              <div className="col-10 ps-2">
                <div className="text-dark">Sharon Lessman</div>
                <div className="text-muted small mt-1">Aenean tellus metus, bibendum sed, posuere ac, mattis non.</div>
                <div className="text-muted small mt-1">5h ago</div>
              </div>
            </div>
          </a>
        </div>
        <div className="dropdown-menu-footer">
          <a href="index.html#" className="text-muted">Show all messages</a>
        </div>
      </div>
    </li>
    */}

          <li className="nav-item">
            <a className="nav-icon js-fullscreen d-none d-lg-block" href="#">
              <div className="position-relative">
                <i className="align-middle" data-feather="maximize"></i>
              </div>
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-icon pe-md-0 dropdown-toggle"
              href="index.html#"
              data-bs-toggle="dropdown"
            >
              <i className="align-middle" data-feather="settings"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-end">
              <a className="dropdown-item" href="#">
                <i className="align-middle me-1" data-feather="user"></i>{" "}
                Profile
              </a>
              <a className="dropdown-item" href="index.html#">
                <i className="align-middle me-1" data-feather="pie-chart"></i>{" "}
                Analytics
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                <i className="align-middle me-1" data-feather="settings"></i>{" "}
                Settings & Privacy
              </a>
              <a className="dropdown-item" href="index.html#">
                <i className="align-middle me-1" data-feather="help-circle"></i>{" "}
                Help Center
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" onClick={handleLogout}>
                Log out
              </a>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
