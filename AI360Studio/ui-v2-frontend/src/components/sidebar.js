// components/Sidebar.js
import { useRouter } from "next/router";
import Link from "next/link";

const Sidebar = () => {
  const { pathname } = useRouter();

  const isActive = (path) => pathname === path;

  return (
    <div className="sidebar-content js-simplebar" data-simplebar="init">
      <div className="simplebar-wrapper" style={{ margin: 0 }}>
        <div className="simplebar-height-auto-observer-wrapper">
          <div className="simplebar-height-auto-observer"></div>
        </div>
        <div className="simplebar-mask">
          <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
            <div
              className="simplebar-content-wrapper"
              tabIndex="0"
              role="region"
              aria-label="scrollable content"
              style={{ height: "100%", overflow: "hidden" }}
            >
              <div className="simplebar-content" style={{ padding: 0 }}>
                <Link href="#" className="sidebar-brand">
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
                    style={{ marginLeft: -3 }}
                  >
                    <path d="M12 4L20 8.00004L12 12L4 8.00004L12 4Z"></path>
                    <path d="M20 12L12 16L4 12"></path>
                    <path d="M20 16L12 20L4 16"></path>
                  </svg>
                </Link>
                <ul className="sidebar-nav">
                  <li className="sidebar-header">Pages</li>

                  {/* Executive Dashboards */}
                  <li
                    className={`sidebar-item ${
                      isActive("/") || isActive("/executive-dashboard")
                        ? "active"
                        : ""
                    }`}
                  >
                    <a
                      data-bs-target="#dashboards"
                      data-bs-toggle="collapse"
                      className="sidebar-link"
                    >
                      <i className="align-middle" data-feather="sliders"></i>
                      <span className="align-middle">Executive Dashboards</span>
                    </a>
                    <ul
                      id="dashboards"
                      className="sidebar-dropdown list-unstyled collapse show"
                      data-bs-parent="#sidebar"
                    >
                      <li
                        className={`sidebar-item ${
                          isActive("/executive-dashboard") ? "active" : ""
                        }`}
                      >
                        <Link href="/executive-dashboard" legacyBehavior>
                          <a className="sidebar-link">Main</a>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* Member Dashboard */}
                  <li
                    className={`sidebar-item ${
                      isActive("/individ") || isActive("/legal-entity")
                        ? "active"
                        : ""
                    }`}
                  >
                    <a
                      data-bs-target="#pages"
                      data-bs-toggle="collapse"
                      className="sidebar-link collapsed"
                    >
                      <i className="align-middle" data-feather="layout"></i>
                      <span className="align-middle">Member Dashboard</span>
                    </a>
                    <ul
                      id="pages"
                      className="sidebar-dropdown list-unstyled collapse"
                      data-bs-parent="#sidebar"
                    >
                      <li
                        className={`sidebar-item ${
                          isActive("/individ") ? "active" : ""
                        }`}
                      >
                        <Link href="/individ" legacyBehavior>
                          <a className="sidebar-link">Individual</a>
                        </Link>
                      </li>
                      <li
                        className={`sidebar-item ${
                          isActive("/legal-entity") ? "active" : ""
                        }`}
                      >
                        <Link href="/legal-entity" legacyBehavior>
                          <a className="sidebar-link">Legal Entity</a>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* ML Training */}
                  {/* <li
                    className={`sidebar-item ${
                      isActive("/recepies") ? "active" : ""
                    }`}
                  >
                    <a
                      data-bs-target="#ml-training"
                      data-bs-toggle="collapse"
                      className="sidebar-link"
                    >
                      <i className="align-middle" data-feather="database"></i>
                      <span className="align-middle">ML Training</span>
                    </a>
                    <ul
                      id="ml-training"
                      className="sidebar-dropdown list-unstyled collapse "
                      data-bs-parent="#sidebar"
                    >
                      <li
                        className={`sidebar-item ${
                          isActive("/recepies") ? "active" : ""
                        }`}
                      >
                        <Link href="#" legacyBehavior>
                          <a className="sidebar-link">Recepies</a>
                        </Link>
                      </li>
                    </ul>
                  </li> */}

                  {/* Audience Builder */}
                  {/* <li
                    className={`sidebar-item ${
                      isActive("#audience-builder") ? "active" : ""
                    }`}
                  >
                    <a
                      data-bs-target="#audience-builder"
                      data-bs-toggle="collapse"
                      className="sidebar-link"
                    >
                      <i className="align-middle" data-feather="target"></i>
                      <span className="align-middle">Audience Builder</span>
                    </a>
                    <ul
                      id="audience-builder"
                      className="sidebar-dropdown list-unstyled collapse"
                      data-bs-parent="#sidebar"
                    >
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
                      <a
                        className="sidebar-user-title dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        Dlytica Admin
                      </a>
                      <div className="dropdown-menu dropdown-menu-start">
                        <Link href="#" legacyBehavior>
                          <a className="dropdown-item">
                            <i
                              className="align-middle me-1"
                              data-feather="user"
                            ></i>{" "}
                            Profile
                          </a>
                        </Link>
                        <Link href="#" legacyBehavior>
                          <a className="dropdown-item">
                            <i
                              className="align-middle me-1"
                              data-feather="pie-chart"
                            ></i>{" "}
                            Analytics
                          </a>
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link href="#" legacyBehavior>
                          <a className="dropdown-item">
                            <i
                              className="align-middle me-1"
                              data-feather="settings"
                            ></i>{" "}
                            Settings & Privacy
                          </a>
                        </Link>
                        <Link href="#" legacyBehavior>
                          <a className="dropdown-item">
                            <i
                              className="align-middle me-1"
                              data-feather="help-circle"
                            ></i>{" "}
                            Help Center
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
        <div
          className="simplebar-placeholder"
          style={{ width: "auto", height: 555 }}
        ></div>
      </div>
      <div
        className="simplebar-track simplebar-horizontal"
        style={{ visibility: "hidden" }}
      >
        <div
          className="simplebar-scrollbar"
          style={{ width: 0, display: "none" }}
        ></div>
      </div>
      <div
        className="simplebar-track simplebar-vertical"
        style={{ visibility: "hidden" }}
      >
        <div
          className="simplebar-scrollbar"
          style={{
            height: 0,
            display: "none",
            transform: "translate3d(0px, 0px, 0px)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
