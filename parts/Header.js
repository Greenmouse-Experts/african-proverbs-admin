import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SettingsBrightnessIcon from "@material-ui/icons/SettingsBrightness";
import Link from "next/link";
import { Update } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/authActions";
import Router from "next/router";
import { grey } from "@material-ui/core/colors";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const updateBody = () => {
    if (document.body.classList.value === "") {
      document.body.classList.add("sidebar-enable");
    } else {
      document.body.classList.remove("sidebar-enable");
    }
  };

  const signOut = () => {
    //console.log("signing user out ...");
    dispatch(logout());
  };

  return (
    <>
      <div class="navbar-custom" style={{ zIndex: 1200 }}>
        <ul class="list-unstyled topnav-menu float-right mb-0">
          {/* <li class="d-none d-sm-block">
                        <form class="app-search">
                            <div class="app-search-box">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search..." />
                                    <div class="input-group-append">
                                        <button class="btn" type="submit">
                                            <i class="fe-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </li>

                    <li class="dropdown notification-list">
                        <a class="nav-link dropdown-toggle  waves-effect" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                            <i class="fe-bell noti-icon"></i>
                            <span class="badge badge-danger rounded-circle noti-icon-badge">1</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-lg">
                            <div class="dropdown-item noti-title">
                                <h5 class="m-0">
                                    <span class="float-right">
                                        <a href="" class="text-dark">
                                            <small>Clear All</small>
                                        </a>
                                    </span>Notification
                                </h5>
                            </div>

                            <div class="slimscroll noti-scroll">

                                <a href="javascript:void(0);" class="dropdown-item notify-item active">
                                    <div class="notify-icon">
                                        <img src="../../static/assets/images/users/user-1.jpg" class="img-fluid rounded-circle" alt="" />
                                    </div>
                                    <p class="notify-details">Kolade Toluade</p>
                                    <p class="text-muted mb-0 user-msg">
                                        <small>Hi, How are you? What about our next meeting</small>
                                    </p>
                                </a>
                            </div>

                            <a href="javascript:void(0);" class="dropdown-item text-center text-primary notify-item notify-all">
                                View all
                                <i class="fi-arrow-right"></i>
                            </a>

                        </div>
                    </li> */}

          <li class="dropdown notification-list">
            <a
              class="nav-link dropdown-toggle nav-user mr-0 waves-effect"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <img
                src="/static/assets/images/users/avatar.jpg"
                alt="user-image"
                class="rounded-circle"
              />
              <span class="pro-user-name ml-1">
                {user && user.author_profile.first_name}{" "}
                <i class="mdi mdi-chevron-down"></i>
              </span>
            </a>
            <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
              <div class="dropdown-header noti-title">
                <h6 class="text-overflow m-0">Welcome !</h6>
              </div>
              <Link href="/profile">
                <a class="dropdown-item notify-item">
                  <i class="fe-user"></i>
                  <span>My Account</span>
                </a>
              </Link>
              <Link href="/change_password">
                <a class="dropdown-item notify-item">
                  <i class="fe-settings"></i>
                  <span>Change Password</span>
                </a>
              </Link>
              <div class="dropdown-divider"></div>
              <a
                href="javascript:void(0);"
                onClick={signOut}
                class="dropdown-item notify-item"
              >
                <i class="fe-log-out"></i>
                <span>Logout</span>
              </a>
            </div>
          </li>
        </ul>

        <div class="logo-box">
          <Link href="/dashboard">
            <a class="logo logo-dark text-center">
              <span class="logo-lg">
                <img
                  src="/static/assets/images/muna_logo.png"
                  alt=""
                  height="16"
                />
              </span>
              <span class="logo-sm">
                <img
                  src="/static/assets/images/muna_logo.png"
                  alt=""
                  height="24"
                />
              </span>
            </a>
          </Link>
        </div>

        <ul class="list-unstyled topnav-menu topnav-menu-left mb-0">
          <li>
            <button
              onClick={updateBody}
              class="button-menu-mobile disable-btn waves-effect"
            >
              <i class="fe-menu"></i>
            </button>
          </li>

          <li>
            <h4 class="page-title-main">
              {Router.pathname.charAt(1).toUpperCase() +
                Router.pathname.replace(/^\/|\[|\]|\/$/g, "").slice(1)}
            </h4>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
