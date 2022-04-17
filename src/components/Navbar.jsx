import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../features/user/userSlice";

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  return (
    <nav className=" fixed w-screen grid grid-flow-col grid-cols-3 bg-slate-900 shadow-lg h-20 opacity-95 z-50">
      <img
        src="https://i.imgur.com/0ANq75J.png"
        alt="logo"
        className="my-auto  max-h-20   h-20 w-52"
      />
      <input
        type="search"
        name="searchBar"
        placeholder={`Search`}
        className="my-auto outline-none rounded-sm bg-slate-600 h-7 bg-opacity-60 pl-2 placeholder:text-slate-50"
      />
      <div className="w-full flex items-center justify-end  text-zinc-100">
        <button className=" bg-slate-600 px-2 text-lg mr-14 rounded-sm hover:bg-slate-200 hover:text-slate-600">
          <Link to={"/"}>My Teams</Link>
        </button>
        <p className="text-xl  w-28 text-right hover:underline-offset-4 hover:underline capitalize">
          {user.logged ? user.name[0] : <Link to={"/login"}>LogIn</Link>}
        </p>
        <button onClick={() => setModal(!modal)} className="text-4xl mr-9 ml-5">
          <FaUserAlt />
        </button>
      </div>
      {modal && user.logged && (
        <section className="absolute w-1/5 h-fit top-16 right-0 bg-slate-50 flex-row z-50 pb-6 border-2 border-slate-400">
          <div className="w-11/12 text-center p-2 font-sans relative text-slate-700 border-b-2 border-slate-400 ml-3">
            <h1 className="font-bold text-xl">Account</h1>
            <button
              onClick={() => setModal(false)}
              className="absolute top-2 right-0 border-none"
            >
              <AiOutlineFullscreenExit />
            </button>
          </div>
          <div className="flex w-11/12 text-start font-sans  text-slate-700 border-b-2 border-slate-400 ml-3">
            <p className="text-emerald-700 ml-2 my-auto text-5xl">
              <MdOutlineAccountCircle />
            </p>
            <p className="my-2 text-slate-700 text-sm space-y-2">
              {" "}
              <span className="font-semibold w-full text-lg">{`${user.name[0]} ${user.name[1]} `}</span>
              {user.email}
            </p>
          </div>
          <div className="flex w-11/12 text-start font-sans  text-slate-700 border-b-2 border-slate-400 ml-3">
            <Link to={"/login"}>
              {" "}
              <p
                onClick={() => setModal(false)}
                className="font-semibold hover:font-bold hover:underline hover: underline-offset-4 my-2 ml-2"
              >
                Login with anoter account
              </p>
            </Link>
          </div>
          <div className="flex w-11/12 text-start font-sans  text-slate-700 ml-3">
            <button
              onClick={() => {
                dispatch(logOut());
                setModal(false);
              }}
              className="font-semibold hover:font-bold  my-2 ml-2"
            >
              {" "}
              Log Out
            </button>
          </div>
        </section>
      )}
    </nav>
  );
}
