import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub, FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn, logOut, validateSession } from "../features/user/userSlice";
import Modal from "../components/Modal";
import { animateScroll as scroll } from "react-scroll";
import { fetchUrl } from "../api";

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
   const modalMessage = "Welcome to the APP!";

  const signIn = (event) => {
    event.preventDefault();
    dispatch(logOut());
    const {
      email: { value: email },
      password: { value: password },
    } = event.target;
    dispatch(logIn({ email, password }));
    setModal(true);
    scroll.scrollToTop();
    setTimeout(() => {
      setModal(false);
      navigate("/");
      dispatch(validateSession());
    }, 2000);
  };

  return (
    <div className="bg-[url('https://images.pexels.com/photos/2346594/pexels-photo-2346594.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')] bg-cover w-screen h-screen fixed flex z-20  overflow-y-auto  overflow-x-auto">
      <section className="w-5/6 min-h-5/6  bg-slate-900 border-2 border-slate-600 shadow-xl m-auto rounded-lg bg-opacity-70 grid grid-flow-col grid-cols-2 ">
        <article className="flex-row ">
          <img
            src="https://i.imgur.com/TedlwwQ.png"
            alt="logo"
            className="mx-auto max-w-full max-h-full mt-28"
          />
          ;
          <h3 className="text-2xl w-5/6 text-center mx-auto text-slate-50 font-semibold">
            Welcome to the best developer workflow app.
          </h3>
          <p className="text-xl  text-center mx-auto text-slate-50 mt-20 ">
            You don't have account?{" "}
            <Link to={"/signup"}>
              <span className="font-bold hover:underline hover:underline-offset-4 ">
                Sign Up
              </span>
            </Link>
          </p>
        </article>
        <article className="flex py-7 px-10">
          <div className="relative w-full h-full  bg-slate-50 rounded-lg shadow-2xl border-2 border-slate-700 text-xl">
            <h1 className="text-4xl w-full mt-10 pl-14 font-bold text-emerald-800">
              Log In
            </h1>
            <form
              className="w-3/4  max-h-5/6 m-auto mt-8 text-slate-800 "
              onSubmit={signIn}
            >
              <label htmlFor="email" className="w-full text-lg font-semibold">
                Email:
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="border-2 w-full rounded-md mb-3 shadow-sm h-9 outline-none focus:border-emerald-700"
                required
              />
              <label
                htmlFor="password"
                className="w-full text-lg font-semibold"
              >
                Password:
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="border-2 w-full rounded-md mb-4 shadow-sm h-9 outline-none focus:border-emerald-700 "
                required
              />

              <section className="w-full text-center mt-10 mb-4">
                <button className="bg-emerald-700 px-2 rounded-md text-2xl text-slate-50 hover:bg-emerald-600 hover:text-slate-100 shadow-md hover:shadow-lg ">
                  Submit
                </button>
              </section>
              <Link to={"/"}>
                <p className="absolute top-3 right-6 text-3xl text-emerald-800">
                  <FaHome />
                </p>
              </Link>
            </form>
            <article className="mt-6 w-3/4 mx-auto ">
              <p className="mb-4 font-medium text-slate-500">Or log in with:</p>
            </article>
            <div className="grid grid-flow-col grid-cols-3 w-3/4 mx-auto">
              <article className="flex h-16 mb-8 ">
                <a
                  href={`${fetchUrl}/auth/google`}
                  target={"_blank"}
                  rel="noreferrer"
                  className="m-auto text-6xl hover:text-7xl "
                >
                  {" "}
                  <FcGoogle />
                </a>
              </article>
              <article className="flex h-16">
                <a
                  href={`${fetchUrl}/auth/facebook`}
                  target={"_blank"}
                  rel="noreferrer"
                  className="m-auto text-6xl text-sky-700 hover:text-7xl"
                >
                  {" "}
                  <FaFacebook />
                </a>
              </article>
              <article className="flex h-16">
                <a
                  href={`${fetchUrl}/auth/github`}
                  className="m-auto text-6xl hover:text-7xl"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  {" "}
                  <FaGithub />
                </a>
              </article>
            </div>
          </div>
        </article>
      </section>
      {modal && <Modal message={modalMessage} />}
    </div>
  );
}
