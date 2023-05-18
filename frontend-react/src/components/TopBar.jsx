import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/authentication";
import { useState,useEffect,useRef } from "react";
import {BsPersonCircle} from "react-icons/bs";
import {AiOutlineLogout} from "react-icons/ai";

export default function TopBar(){
    const [user, login, logout] = useAuthentication();
    const navigate = useNavigate();

function onLogoutClick(e) {
    logout();
    navigate("/");

  }
  const userName = user ? user.firstName + " " + user.lastName : "User"
  return (
    <div className="flex-row items-baseline p-2 hidden md:flex">
    <a className="btn btn-ghost normal-case text-2xl font-bold m-2 font-serif ">
      High-Street-Gym
    </a>
    <div className="navbar flex md:justify-end">
            <ul className="menu md:menu-horizontal px-1 w-full">
            <li><Link to="/dashboard"><BsPersonCircle size={30}/></Link></li>
                <li><a onClick={onLogoutClick}><AiOutlineLogout size={30}/></a></li>
                </ul>
        </div>
    </div>

  )
}