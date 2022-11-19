/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";
import {
  // BiDollarCircle,
  FaRegCalendarAlt,
  // BiMovie,
  AiOutlineHome,
  CgMoreO,
  FiSearch,
  AiOutlineHeart,
} from "react-icons/all";
import classNames from "classnames";
import { NavLink, useLocation } from "react-router-dom";
export default () => {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState(false);

  React.useEffect(() => {
    if (location.pathname === "/") {
      setActiveNav("home");
    } else if (location.pathname === "/profile") {
      setActiveNav("profile");
    } else {
      setActiveNav(false);
    }
  }, [location]);

  return (
    <div className="menu">
      <div className="menu-container">
        <NavLink
          className={classNames(
            "menu-item d-flex justify-content-center align-items-center",
            {
              "selected-svg": activeNav === "search",
            }
          )}
          to="/search"
          exact
          activeClassName="selected-svg"
        >
          <div className="menu-item-icon">
            <FiSearch />
          </div>
          {/* <img src={LogoMiniPNG} alt="BULTEEK" /> */}
        </NavLink>
        <NavLink
          className={classNames(
            "menu-item d-flex justify-content-center align-items-center",
            {
              "selected-svg": activeNav === "home",
            }
          )}
          to="/"
          exact
          activeClassName="selected-svg"
        >
          <div className="menu-item-icon">
            <AiOutlineHome />
          </div>
        </NavLink>
        {/* <NavLink
          to="/movies"
          activeClassName="selected-svg"
          className="menu-item d-flex justify-content-center align-items-center"
        >
          <div className="menu-item-icon">
            <BiMovie />
          </div>
        </NavLink> */}
        <NavLink
          to="/saved"
          activeClassName="selected-svg"
          className="menu-item d-flex justify-content-center align-items-center"
        >
          <div className="menu-item-icon">
            <AiOutlineHeart />
          </div>
        </NavLink>
        <NavLink
          to="/calendar"
          activeClassName="selected-svg"
          className="menu-item d-flex justify-content-center align-items-center"
        >
          <div className="menu-item-icon">
            <FaRegCalendarAlt />
          </div>
        </NavLink>
        {/* <NavLink
          to="/plan"
          activeClassName="selected-svg"
          className="menu-item d-flex justify-content-center align-items-center"
        >
          <div className="menu-item-icon">
            <BiDollarCircle />
          </div>
        </NavLink> */}
        <NavLink
          to="/more"
          activeClassName="selected-svg"
          className="menu-item d-flex justify-content-center align-items-center"
        >
          <div className="menu-item-icon">
            <CgMoreO />
          </div>
        </NavLink>
      </div>
      {/* 
      <div className="menu-items">
        <NavLink to="/movies" activeClassName="selected-svg">
          <RiMovie2Line />
        </NavLink>
        <NavLink to="/plan" activeClassName="selected-svg">
          <BiDollarCircle />
        </NavLink>
        <Search />
      </div>
       */}
    </div>
  );
};
