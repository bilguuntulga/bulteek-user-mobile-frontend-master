import React, { useState } from "react";
import classNames from "classnames";
import {
  FiCalendar,
  AiOutlineHome,
  CgMoreO,
  FiSearch,
  FiHeart,
} from "react-icons/all";
import { NavLink, useLocation } from "react-router-dom";
const Menu = () => {
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
      <NavLink
        className={classNames(
          "menu__item d-flex justify-content-center align-items-center",
          {
            "selected-svg": activeNav === "home",
          }
        )}
        to="/"
        exact
        activeClassName="selected-svg"
      >
        <div className="menu__item__icon">
          <AiOutlineHome />
        </div>
      </NavLink>
      <NavLink
        className={classNames(
          "menu__item d-flex justify-content-center align-items-center",
          {
            "selected-svg": activeNav === "search",
          }
        )}
        to="/search"
        exact
        activeClassName="selected-svg"
      >
        <div className="menu__item__icon">
          <FiSearch />
        </div>
      </NavLink>
      <NavLink
        to="/saved"
        activeClassName="selected-svg"
        className="menu__item d-flex justify-content-center align-items-center"
      >
        <div className="menu__item__icon">
          <FiHeart />
        </div>
      </NavLink>
      <NavLink
        to="/calendar"
        activeClassName="selected-svg"
        className="menu__item d-flex justify-content-center align-items-center"
      >
        <div className="menu__item__icon">
          <FiCalendar />
        </div>
      </NavLink>
      <NavLink
        to="/more"
        activeClassName="selected-svg"
        className="menu__item d-flex justify-content-center align-items-center"
      >
        <div className="menu__item__icon">
          <CgMoreO />
        </div>
      </NavLink>
    </div>
  );
};
export default Menu;
