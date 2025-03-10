import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/authActions";
import { findDOMNode } from "react-dom";
import SubMenu from "../components/UIElements/SubMenu";
import { checkPermission } from "../utils/utilities";
import { checkProverbAdmin, checkFamilyAdmin } from "@/utils/utilities";

const Sidebar = () => {
  const dispatch = useDispatch();

  const [packageStatus, setPackageStatus] = useState(false);
  const [ethnicQuestionsStatus, setEthnicQuestionsStatus] = useState(false);
  const [proverbStatus, setProverbStatus] = useState(false);
  const [faqStatus, setFaqStatus] = useState(false);
  const [affilateStatus, SetAffilateStatus] = useState(false);
  const [pushNotificationStatus, setpushNotificationStatus] = useState(false);
  const [familyTreeStatus, setfamilyTreeStatus] = useState(false);
  //const [ethnicFactStatus, setEthnicFactStatus] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);
  const [reportStatus, setReportStatus] = useState(false);
  const [flagStatus, setFlagStatus] = useState(false);
  const [ethnicSymbolStatus, setEthnicSymbolStatus] = useState(false);
  const [userNotificationStatus, setuserNotificationStatus] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const signOut = () => {
    console.log("signing user out ...");
    dispatch(logout());
  };

  const handleClick = (e) => {
    console.log(findDOMNode(e.target).parentNode.parentNode);
  };

  return (
    <>
      <div className="left-side-menu">
        <div className="slimscroll-menu">
          <div className="user-box text-center">
            <img
              src="/static/assets/images/users/avatar.jpg"
              alt="user-img"
              title="Mat Helme"
              className="rounded-circle img-thumbnail avatar-md"
            />
            <h5 className="user-name dropdown-toggle h5 mt-2 mb-1 d-block">
              {user && user.author_profile.first_name}
            </h5>

            <ul className="list-inline">
              <li className="list-inline-item">
                <Link href="/profile">
                  <a className="text-muted">
                    <i className="mdi mdi-cog"></i>
                  </a>
                </Link>
              </li>

              <li className="list-inline-item">
                <a href="javascript:void(0);" onClick={signOut}>
                  <i className="mdi mdi-power"></i>
                </a>
              </li>
            </ul>
          </div>

          <div id="sidebar-menu">
            <ul className="metismenu" id="side-menu">
              <li>
                <Link href="/dashboard">
                  <a>
                    <i className="mdi mdi-view-dashboard"></i>
                    <span> Dashboard </span>
                  </a>
                </Link>
              </li>

              {checkProverbAdmin(
                user,
                <li className={proverbStatus ? "mm-active" : null}>
                  <SubMenu
                    name="Proverbs"
                    status={proverbStatus}
                    toggleMenu={() => setProverbStatus(!proverbStatus)}
                  >
                    <ul className="nav-second-level" aria-expanded="false">
                      <li>
                        <Link href="/proverbs/view-proverbs">
                          <a>View Proverbs</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/proverbs/add-proverb">
                          <a>Add Proverb</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/proverbs/upload-batch-proverbs">
                          <a>Upload Batch Proverbs</a>
                        </Link>
                      </li>

                      <li>
                        <Link href="/categories">
                          <a>Categories </a>
                        </Link>
                      </li>

                      <li>
                        <Link href="/language">
                          <a> Languages </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/ethnic">
                          <a>Ethnic Groups </a>
                        </Link>
                      </li>

                      {user &&
                        (checkPermission(user.roles, "SuperAdmin") ||
                          checkPermission(user.roles, "Admin")) ? (
                        <li>
                          <Link href="/users">
                            <a>Proverb Users</a>
                          </Link>
                        </li>
                      ) : null}
                      {user && checkPermission(user.roles, "SuperAdmin") ? (
                        <li>
                          <Link href="/roles">
                            <a>Proverbs Admin Roles</a>
                          </Link>
                        </li>
                      ) : null}
                      <li>
                        <Link href="/repeated-proverbs">
                          <a>Repeated Proverbs</a>
                        </Link>
                      </li>
                      {user &&
                        (checkPermission(user.roles, "SuperAdmin") ||
                          checkPermission(user.roles, "Admin")) ? (
                        <li>
                          <Link href="/suggested-proverbs">
                            <a>Review Add Proverbs</a>
                          </Link>
                        </li>
                      ) : null}
                      {user &&
                        (checkPermission(user.roles, "SuperAdmin") ||
                          checkPermission(user.roles, "Admin")) ? (
                        <li>
                          <Link href="/corrected-proverbs">
                            <a>Review Corrected Proverbs</a>
                          </Link>
                        </li>
                      ) : null}
                    </ul>
                  </SubMenu>
                </li>,
              )}
              <li className={affilateStatus ? "mm-active" : null}>
                <SubMenu
                  name="AffiliatedLanguage"
                  status={affilateStatus}
                  toggleMenu={() => SetAffilateStatus(!affilateStatus)}
                >
                  <ul className="nav-second-level" aria-expanded="false">
                    <li>
                      <Link href="/create-affiliatelanguage">
                        <a> Create Affiliated Language</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/affiliate">
                        <a>Manage Affiliated language </a>
                      </Link>
                    </li>
                  </ul>
                </SubMenu>
              </li>
              {/*  ETHNICS FACT QUESTION MENU LINK */}
              <li className={ethnicQuestionsStatus ? "mm-active" : null}>
                <SubMenu
                  name="Fact Questions"
                  status={ethnicQuestionsStatus}
                  toggleMenu={() =>
                    setEthnicQuestionsStatus(!ethnicQuestionsStatus)
                  }
                >
                  <ul className="nav-second-level" aria-expanded="false">
                    <li>
                      <Link href="/create-question">
                        <a>Create Fact Question</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/fact-questions">
                        <a>Manage Fact Questions</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/ethnic-facts">
                        <a>Question Uploads</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/generate-quiz">
                        <a>Generate Quiz</a>
                      </Link>
                    </li>
                  </ul>
                </SubMenu>
              </li>

              <li className={flagStatus ? "mm-active" : null}>
                <SubMenu
                  name="Flags"
                  status={flagStatus}
                  toggleMenu={() => setFlagStatus(!flagStatus)}
                >
                  <ul className="nav-second-level" aria-expanded="false">
                    <li>
                      <Link href="/flags/upload">
                        <a>Upload Flags</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/flags/countries">
                        <a>Manage Flags</a>
                      </Link>
                    </li>
                  </ul>
                </SubMenu>
              </li>

              <li className={ethnicSymbolStatus ? "mm-active" : null}>
                <SubMenu
                  name="Ethnic Symbols"
                  status={ethnicSymbolStatus}
                  toggleMenu={() => setEthnicSymbolStatus(!ethnicSymbolStatus)}
                >
                  <ul className="nav-second-level" aria-expanded="false">
                    <li>
                      <Link href="/ethnic-symbols/upload">
                        <a>Upload Ethnic Symbol</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/ethnic-symbols">
                        <a>All Symbols</a>
                      </Link>
                    </li>
                  </ul>
                </SubMenu>
              </li>

              <li className={faqStatus ? "mm-active" : null}>
                <SubMenu
                  name="Faqs"
                  status={faqStatus}
                  toggleMenu={() => setFaqStatus(!faqStatus)}
                >
                  <ul className="nav-second-level" aria-expanded="false">
                    <li>
                      <Link href="/create-faqs">
                        <a>Create FAQs</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/faqs">
                        <a>Manage FAQs </a>
                      </Link>
                    </li>
                  </ul>
                </SubMenu>
              </li>

              {/*  PACKAGES MENU LINK */}
              <li className={packageStatus ? "mm-active" : null}>
                <SubMenu
                  name="Packages"
                  status={packageStatus}
                  toggleMenu={() => setPackageStatus(!packageStatus)}
                >
                  <ul className="nav-second-level" aria-expanded="false">
                    <li>
                      <Link href="/create-packages">
                        <a>Create Package</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/packages">
                        <a>Manage Packages </a>
                      </Link>
                    </li>
                  </ul>
                </SubMenu>
              </li>

              <li className={pushNotificationStatus ? "mm-active" : null}>
                <SubMenu
                  name="Push Notifications"
                  status={pushNotificationStatus}
                  toggleMenu={() =>
                    setpushNotificationStatus(!pushNotificationStatus)
                  }
                >
                  <ul className="nav-second-level" aria-expanded="false">
                    <li>
                      <Link href="/send-notification">
                        <a>Send Notification</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/post-notification-logs">
                        <a>Logs</a>
                      </Link>
                    </li>
                  </ul>
                </SubMenu>
              </li>

              <li className={userNotificationStatus ? "mm-active" : null}>
                <SubMenu
                  name="User Notifications"
                  status={userNotificationStatus}
                  toggleMenu={() =>
                    setuserNotificationStatus(!userNotificationStatus)
                  }
                >
                  <ul className="nav-second-level" aria-expanded="false">
                    <li>
                      <Link href="/send-user-notification">
                        <a>Send Notification</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/user-notification-logs">
                        <a>Logs</a>
                      </Link>
                    </li>
                  </ul>
                </SubMenu>
              </li>

              <li className={subscriptionStatus ? "mm-active" : null}>
                <SubMenu
                  name="Subscriptions"
                  status={subscriptionStatus}
                  toggleMenu={() => setSubscriptionStatus(!subscriptionStatus)}
                >
                  <ul className="nav-second-level" aria-expanded="false">
                    <li>
                      <Link href="/subscribers">
                        <a>Manage subscribers</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/subscriptions">
                        <a>Manage subscriptions</a>
                      </Link>
                    </li>
                  </ul>
                </SubMenu>
              </li>

              <li className={reportStatus ? "mm-active" : null}>
                <SubMenu
                  name="Reports"
                  status={reportStatus}
                  toggleMenu={() => setReportStatus(!reportStatus)}
                >
                  <ul className="nav-second-level" aria-expanded="false">
                    <li>
                      <Link href="/sales-reports/daily-sales-summary">
                        <a>Daily Sales Summary</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/sales-reports/monthly-sales-summary">
                        <a>Monthly Sales</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/sales-reports/daily-package-sales">
                        <a>Daily Package Sales</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/sales-reports/monthly-package-sales">
                        <a>Monthly Package Sales</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/sales-reports/daily-user-sales">
                        <a>Daily User Sales</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/sales-reports/sales-list-by-date-range">
                        <a>Sales List By Date</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/sales-reports/user-list-by-date-range">
                        <a>User List By Date</a>
                      </Link>
                    </li>
                  </ul>
                </SubMenu>
              </li>

              <li>
                <Link href="/question-mapping">
                  <a>
                    <i className="mdi mdi-view-dashboard"></i>
                    <span>Question mapping </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/question-property-setup">
                  <a>
                    <i className="mdi mdi-view-dashboard"></i>
                    <span>Question Property Setup </span>
                  </a>
                </Link>
              </li>

              {user && user.user_type == "PROVERB_ADMIN" ? (
                <li>
                  <Link href="/profile">
                    <a>
                      <i className="mdi mdi-account"></i>
                      <span> Profile </span>
                    </a>
                  </Link>
                </li>
              ) : null}

              {checkFamilyAdmin(
                user,
                <li className={familyTreeStatus ? "mm-active" : null}>
                  <SubMenu
                    name="Family Tree"
                    status={familyTreeStatus}
                    toggleMenu={() => setfamilyTreeStatus(!familyTreeStatus)}
                  >
                    <ul className="nav-second-level" aria-expanded="false">
                      <li>
                        <Link href="/familytree">
                          <a>View Families</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/familytree/packages">
                          <a>Packages</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/proverbs/add-proverb">
                          <a>Tickets</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/familytree/roles">
                          <a>Authorizations</a>
                        </Link>
                      </li>

                      <li>
                        <Link href="/familytree/users">
                          <a>FamilyTree Admin</a>
                        </Link>
                      </li>
                    </ul>
                  </SubMenu>
                </li>,
              )}
              <li>
                <a href="javascript:void(0);" onClick={signOut}>
                  <i className="mdi mdi-power"></i>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="clearfix"></div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
