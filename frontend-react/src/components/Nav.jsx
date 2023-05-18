import { NavLink, useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/authentication";
import { useState, useEffect, useRef } from "react";
import { FaHamburger } from "react-icons/fa";

export default function Nav() {
  const [user, login, logout] = useAuthentication();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);


  // Define logout procedure
  function onLogoutClick(e) {
    logout();
    navigate("/");
  }

  // Determine the name of the user to display in the nav bar

  const userInitials = user
    ? user.firstName.charAt(0) + user.lastName.charAt(0)
    : "User";

  return (
    <>
      <button className=" md:hidden max-h-3 m-2"
      onClick={() => setIsOpen(!isOpen)}>
        <FaHamburger size={30} />
      </button>
      <div
  className={`absolute left-0 top-0 h-screen w-50 z-40 md:static md:h-auto md:w-50 bg-white transform ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  } md:translate-x-0 transition-transform duration-300 ease-in-out border md:border-0 border-gray-300 md:border-t-0 md:flex md:flex-col`}
>


        <ul className="menu md:menu-vertical p-4 w-full rounded-md">
          <li>
            <NavLink
              to="/dashboard"
              activeClassName="active"
            >
              <div className="avatar online placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                  <span className="text-xl">
                    {userInitials}
                  </span>
                </div>
              </div>
            </NavLink>
          </li>
          {user && user.role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/users"
                  activeClassName="active"
                >
                  User Admin
                </NavLink>
              </li>
              
              <li>
                <NavLink
                  to="/blogposts"
                  activeClassName="active"
                >
                  Blogposts
                </NavLink>
              </li>
              <li>
                <NavLink to="/rooms">Rooms</NavLink>
              </li>
            </>
          )}
          {(user && user.role === "admin") ||
          (user && user.role === "trainer") ? (
            <>
            <li>
                <NavLink
                  to="/classes"
                  activeClassName="active"
                >
                  Classes CRUD
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/bookings"
                  activeClassName="active"
                >
                  Bookings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/activities"
                  activeClassName="active"
                >
                  Activites
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}
           {(user && user.role === "member") ||
          (user && user.role === "trainer") ? (
            <li>
                <NavLink
                  to="/memberblogposts"
                  activeClassName="active"
                >
                  Blogposts
                </NavLink>
              </li>

          ):(<></>)}
          {user && user.role === "member" && (
            <>
              <li>
                <NavLink
                  to="/memberactivities"
                  activeClassName="active"
                >
                  MemberActivities
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/classbooking"
                  activeClassName="active"
                >
                  ClassBooking
                </NavLink>
              </li>
              
            </>
          )}
          <li>
            <a onClick={onLogoutClick}>Logout</a>
          </li>
        </ul>
      </div>
    </>
  );
}
