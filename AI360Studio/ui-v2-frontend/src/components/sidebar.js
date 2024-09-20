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
                    {/* <img
                      src="/img/avatars/logo.png"
                      className="avatar img-fluid rounded me-1"
                      alt="logo"
                      />
                      AI360 Studio */}
                    <svg
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="35pt"
                      height="35pt"
                      viewBox="0 0 300.000000 380.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <metadata>
                        Created by potrace 1.10, written by Peter Selinger
                        2001-2011
                      </metadata>
                      <g
                        transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"
                        fill="#ffff"
                        stroke="none"
                      >
                        <path
                          d="M1481 2577 c-24 -13 -53 -66 -404 -759 -169 -333 -205 -412 -198
-430 10 -29 55 -47 79 -32 15 10 274 509 470 906 37 75 69 137 72 137 3 1 111
-211 241 -469 l235 -470 -308 0 c-169 0 -308 2 -308 3 0 2 41 86 91 187 58
118 89 192 87 209 -4 32 -50 61 -75 46 -21 -12 -252 -471 -253 -501 0 -11 8
-28 18 -37 17 -15 62 -17 436 -17 269 0 424 4 437 10 11 7 19 22 19 38 1 40
-569 1168 -596 1180 -14 7 -28 7 -43 -1z m259 -472 c119 -236 221 -439 228
-450 6 -11 25 -47 40 -80 16 -33 39 -79 52 -102 16 -28 21 -49 16 -67 l-6 -26
-402 2 c-452 3 -436 1 -403 74 10 21 56 116 102 210 83 171 114 217 128 194 9
-14 -14 -90 -27 -90 -4 0 -8 -6 -8 -13 0 -8 -27 -67 -60 -133 -33 -65 -60
-129 -60 -141 0 -14 11 -30 27 -40 23 -16 55 -17 297 -17 172 1 281 5 299 12
38 16 36 57 -8 141 -19 36 -39 77 -45 91 -5 14 -14 32 -18 40 -21 37 -37 69
-59 115 -13 28 -33 66 -43 85 -11 19 -59 114 -107 210 -48 96 -90 177 -93 180
-3 3 -13 21 -20 40 -14 33 -55 80 -70 80 -13 0 -58 -56 -77 -95 -11 -22 -43
-86 -71 -141 -29 -56 -52 -106 -52 -112 0 -6 -3 -12 -7 -14 -5 -1 -38 -64 -76
-138 -37 -74 -74 -146 -81 -160 -8 -14 -26 -50 -41 -80 -39 -83 -132 -260
-146 -276 -6 -7 -15 -11 -20 -8 -15 9 -10 42 15 86 28 51 360 704 459 903 70
142 81 157 106 152 8 -1 112 -195 231 -432z"
                        />
                        <path
                          d="M1511 2034 c-25 -32 -26 -42 -5 -72 23 -33 83 -27 103 10 14 25 14
29 -5 55 -29 39 -66 41 -93 7z"
                        />
                        <path
                          d="M737 1609 c-103 -92 -135 -179 -102 -279 50 -149 293 -281 610 -331
103 -17 407 -17 510 0 350 55 594 202 622 375 13 79 -52 197 -140 257 -29 20
-28 18 9 -22 52 -55 64 -78 64 -124 0 -136 -181 -250 -490 -310 -115 -23 -380
-31 -519 -16 -146 15 -319 59 -414 106 -210 102 -255 236 -119 355 25 22 41
40 35 40 -5 0 -35 -23 -66 -51z m1593 -274 c-6 -19 -16 -35 -21 -35 -5 0 -9
-5 -9 -10 0 -21 -72 -88 -118 -111 -26 -13 -49 -27 -52 -30 -15 -18 -214 -89
-249 -89 -12 0 -29 -4 -39 -9 -61 -32 -430 -46 -582 -22 -99 16 -173 32 -185
41 -5 4 -32 13 -60 19 -77 19 -212 91 -266 141 -27 25 -49 50 -49 54 0 5 -7
14 -16 20 -8 7 -18 32 -21 56 l-6 45 60 -60 c97 -97 244 -162 453 -201 145
-27 489 -29 635 -3 263 46 436 130 513 247 17 26 17 26 20 4 2 -12 -2 -38 -8
-57z"
                        />
                        <path
                          d="M1763 791 c-119 -55 -102 -273 23 -297 47 -9 82 2 115 36 47 46 33
131 -26 158 -34 16 -54 15 -89 -3 -16 -9 -30 -14 -32 -13 -1 2 4 17 11 35 15
36 56 50 99 33 24 -9 31 -7 42 7 22 30 16 40 -30 52 -58 14 -63 14 -113 -8z
m85 -163 c17 -17 15 -38 -5 -60 -21 -23 -38 -23 -63 2 -24 24 -25 34 -4 54 18
19 55 21 72 4z"
                        />
                        <path
                          d="M2100 799 c-50 -11 -86 -56 -95 -117 -18 -130 69 -217 180 -180 59
20 85 64 85 147 0 119 -62 174 -170 150z m73 -66 c26 -30 27 -142 1 -167 -28
-29 -63 -20 -80 19 -40 97 21 212 79 148z"
                        />
                        <path
                          d="M731 658 c-34 -79 -64 -148 -67 -155 -4 -8 8 -10 37 -9 37 2 44 6 52
29 8 26 12 27 78 27 67 0 70 -1 80 -28 8 -23 15 -27 49 -28 22 -1 40 1 40 5 0
3 -28 72 -62 154 l-61 147 -42 0 -41 0 -63 -142z m127 5 l20 -53 -45 0 c-41 0
-44 2 -37 22 12 39 35 90 39 87 2 -2 12 -28 23 -56z"
                        />
                        <path d="M1080 647 l0 -154 36 1 36 2 2 152 1 152 -37 0 -38 0 0 -153z" />
                        <path
                          d="M1390 769 l0 -31 55 4 c30 3 55 2 55 -2 0 -3 -16 -21 -35 -40 -48
-47 -46 -68 6 -72 49 -3 71 -27 53 -55 -16 -26 -50 -27 -89 -5 l-33 20 -13
-30 c-14 -35 -8 -41 55 -59 74 -20 146 13 161 74 10 38 -15 80 -52 92 -18 5
-33 12 -33 15 0 3 16 21 35 40 20 19 35 44 35 57 0 22 -2 23 -100 23 l-100 0
0 -31z"
                        />
                      </g>
                    </svg>
                    AI360 Studio
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
