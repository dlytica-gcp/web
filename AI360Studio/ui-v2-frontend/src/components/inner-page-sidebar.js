// components/Sidebar.js
import Link from "next/link";
import { useEffect } from "react";
import feather from "feather-icons"; // Import Feather icons

const InnerPageSidebar = (props) => {
  const { inv_id } = props;
  
  
  useEffect(() => {
    const sidebarLinks = document.querySelectorAll(
      ".sidebar-link, .sidebar-dot-link"
    );

    sidebarLinks.forEach((link) => {
      link.addEventListener("click", function () {
        // Remove active class from all sidebar items and links
        sidebarLinks.forEach((l) => l.classList.remove("active"));
        sidebarLinks.forEach((l) => l.parentElement.classList.remove("active"));

        // Add active class to the clicked link
        this.classList.add("active");

        // Add active class to the parent .sidebar-item
        this.parentElement.classList.add("active");

        // Expand parent menus
        let parentMenu = this.closest(".sidebar-dropdown");
        while (parentMenu) {
          parentMenu.classList.add("show");
          parentMenu = parentMenu.parentElement.closest(".sidebar-dropdown");
        }
      });
    });
  }, []);
  useEffect(() => {
    feather.replace(); // Initialize Feather icons
  }, []);

  return (
    <>
      <div className="sidebar-content js-simplebar" data-simplebar="init">
        <div className="simplebar-wrapper" style={{ margin: "0px" }}>
          <div className="simplebar-height-auto-observer-wrapper">
            <div className="simplebar-height-auto-observer"></div>
          </div>
          <div className="simplebar-mask">
            <div
              className="simplebar-offset"
              style={{ right: "0px", bottom: "0px" }}
            >
              <div
                className="simplebar-content-wrapper"
                tabIndex="0"
                role="region"
                aria-label="scrollable content"
                style={{ height: "100%", overflow: "hidden scroll" }}
              >
                <div className="simplebar-content" style={{ padding: "0px" }}>
                  <a className="sidebar-brand" href="#">
                    <span className="sidebar-brand-text align-middle">
                      AI360 Studio
                      <img
                        src="/img/avatars/logo.png"
                        className="avatar img-fluid rounded me-1"
                        alt="logo"
                      />
                    </span>
                    <svg
                      className="sidebar-brand-icon align-middle"
                      width="32px"
                      height="32px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                      color="#FFFFFF"
                      style={{ marginLeft: "-3px" }}
                    >
                      <path d="M12 4L20 8.00004L12 12L4 8.00004L12 4Z"></path>
                      <path d="M20 12L12 16L4 12"></path>
                      <path d="M20 16L12 20L4 16"></path>
                    </svg>
                  </a>
                  <ul className="sidebar-nav">
                    <li className="sidebar-header">Pages</li>
                    <li className="sidebar-item">
                      <a
                        data-bs-target="#dashboards"
                        data-bs-toggle="collapse"
                        className="sidebar-link collapsed"
                      >
                        <i className="align-middle" data-feather="sliders"></i>{" "}
                        <span className="align-middle">
                          Executive Dashboards
                        </span>
                      </a>
                      <ul
                        id="dashboards"
                        className="sidebar-dropdown list-unstyled collapse"
                        data-bs-parent="#sidebar"
                      >
                        <li className="sidebar-item">
                          <Link href="/executive-dashboard" legacyBehavior>
                            <a className="sidebar-link">Main</a>
                          </Link>
                        </li>
                      </ul>
                    </li>

          <li className="sidebar-item active">
            <a data-bs-target="#pages" data-bs-toggle="collapse" className="sidebar-link collapsed">
              <i className="align-middle" data-feather="layout"></i> <span className="align-middle">Member Dashboard</span>
            </a>
            <ul id="pages" className="sidebar-dropdown list-unstyled collapse show" data-bs-parent="#sidebar">
              <li className="sidebar-item">
                <a data-bs-target="#individual-submenu" data-bs-toggle="collapse" className="sidebar-link collapsed">Individual</a>
                <ul id="individual-submenu" className="sidebar-dropdown list-unstyled collapse show">
                  <li className="sidebar-item active">
                    <Link href={`/individuals/${inv_id}`} legacyBehavior>
                      <a className="sidebar-dot-link">Customer Info</a>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link href={`/individuals/deposit?inv_id=${inv_id}`} legacyBehavior>
                      <a className="sidebar-dot-link">Deposit</a>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link href={`/individuals/loan?inv_id=${inv_id}`} legacyBehavior>
                      <a className="sidebar-dot-link">Loan</a>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link href={`/individuals/cards?inv_id=${inv_id}`} legacyBehavior>
                      <a className="sidebar-dot-link">Cards</a>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <a data-bs-target="#digital-submenu" data-bs-toggle="collapse" className="sidebar-link collapsed">Digital</a>
                    <ul id="digital-submenu" className="sidebar-dropdown list-unstyled collapse">
                      <li className="sidebar-item">
                        <Link href={`/individuals/digital/mobile-banking?inv_id=${inv_id}`} legacyBehavior>
                          <a className="sidebar-dot-link">Mobile Banking</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="sidebar-item">
                    <a data-bs-target="#investment-submenu" data-bs-toggle="collapse" className="sidebar-link collapsed">Investment</a>
                    <ul id="investment-submenu" className="sidebar-dropdown list-unstyled collapse">
                      <li className="sidebar-item">
                        <Link href="#" legacyBehavior>
                          <a className="sidebar-dot-link">Mero Share</a>
                        </Link>
                      </li>
                      <li className="sidebar-item">
                        <Link href="#" legacyBehavior>
                          <a className="sidebar-dot-link">DMAT</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="sidebar-item">
                    <a data-bs-target="#other-submenu" data-bs-toggle="collapse" className="sidebar-link collapsed">Other</a>
                    <ul id="other-submenu" className="sidebar-dropdown list-unstyled collapse">
                      <li className="sidebar-item">
                        <Link href="#" legacyBehavior>
                          <a className="sidebar-dot-link">Locker</a>
                        </Link>
                      </li>
                      {/* <li className="sidebar-item">
                        <Link href={`/individuals/qr/qr?inv_id=${inv_id}`} legacyBehavior>
                          <a className="sidebar-dot-link">QR</a>
                        </Link>
                      </li> */}
                      {/* <li className="sidebar-item">
                        <Link href={`/individuals/pos/pos?inv_id=${inv_id}`} legacyBehavior>
                          <a className="sidebar-dot-link">POS</a>
                        </Link>
                      </li> */}
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="sidebar-item">
                <Link href="/legal-entity" legacyBehavior>
                  <a className="sidebar-link">Legal Entity</a>
                </Link>
              </li>
            </ul>
          </li>
          {/* <li className="sidebar-item">
            <a data-bs-target="#ml-training" data-bs-toggle="collapse" className="sidebar-link">
              <i className="align-middle" data-feather="database"></i> <span className="align-middle">ML Training</span>
            </a>
            <ul id="ml-training" className="sidebar-dropdown list-unstyled collapse show" data-bs-parent="#sidebar">
              <li className="sidebar-item">
                <Link href="#" legacyBehavior>
                  <a className="sidebar-link">Recepies</a>
                </Link>
              </li>
            </ul>
          </li> */}
          {/* <li className="sidebar-item">
            <a data-bs-target="#audience-builder" data-bs-toggle="collapse" className="sidebar-link">
              <i className="align-middle" data-feather="target"></i> <span className="align-middle">Audience Builder</span>
            </a>
            <ul id="audience-builder" className="sidebar-dropdown list-unstyled collapse show" data-bs-parent="#sidebar">
              <li className="sidebar-item">
                <Link href="#" legacyBehavior>
                  <a className="sidebar-link">Create Audience</a>
                </Link>
              </li>
            </ul>
          </li> */}
        </ul>
        <div className="sidebar-user">
          <div className="d-flex justify-content-center">
            <div className="flex-shrink-0">
            <i className="align-middle" data-feather="settings"></i>
            </div>
            <div className="flex-grow-1 ps-2">
              <a className="sidebar-user-title dropdown-toggle" href="#" data-bs-toggle="dropdown">
                Dlytica Admin
              </a>
              <div className="dropdown-menu dropdown-menu-start">
                <Link href="#" legacyBehavior>
                  <a className="dropdown-item">
                    <i className="align-middle me-1" data-feather="user"></i> Profile
                  </a>
                </Link>
                <Link href="#" legacyBehavior>
                  <a className="dropdown-item">
                    <i className="align-middle me-1" data-feather="pie-chart"></i> Analytics
                  </a>
                </Link>
                <div className="dropdown-divider"></div>
                <Link href="#" legacyBehavior>
                  <a className="dropdown-item">
                    <i className="align-middle me-1" data-feather="settings"></i> Settings & Privacy
                  </a>
                </Link>
                <Link href="#" legacyBehavior>
                  <a className="dropdown-item">
                    <i className="align-middle me-1" data-feather="help-circle"></i> Help Center
                  </a>
                </Link>
                <div className="dropdown-divider"></div>
                <Link href="#" legacyBehavior>
                  <a className="dropdown-item">Log out</a>
                </Link>
              </div>
              <div className="sidebar-user-subtitle">Administrator</div>
            </div>
          </div>
        </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="simplebar-placeholder"
          style={{ width: "232px", height: "1022px" }}
        ></div>
      </div>
      <div
        className="simplebar-track simplebar-horizontal"
        style={{ visibility: "hidden" }}
      >
        <div
          className="simplebar-scrollbar simplebar-visible"
          style={{ transform: "translate3d(0px, 0px, 0px)", display: "none" }}
        ></div>
      </div>
      <div
        className="simplebar-track simplebar-vertical"
        style={{ visibility: "visible" }}
      >
        <div
          className="simplebar-scrollbar simplebar-visible"
          style={{
            height: "129px",
            transform: "translate3d(0px, 0px, 0px)",
            display: "block",
          }}
        ></div>
      </div>
    </>
  );
};

export default InnerPageSidebar;
