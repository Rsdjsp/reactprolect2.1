import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logOut, signUp, validateSession } from "../features/user/userSlice";
import { animateScroll as scroll } from "react-scroll";
import Modal from "../components/Modal";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const register = (event) => {
    event.preventDefault();
    dispatch(logOut())
    const {
      firstname: { value: firstname },
      lastname: { value: lastname },
      birthday: { value: birthday },
      email: { value: email },
      password: { value: password },
    } = event.target;
    dispatch(signUp({ firstname, lastname, birthday, email, password }));
    setModal(true);
    scroll.scrollToTop();
    setTimeout(() => {
      setModal(false);
      navigate("/");
      dispatch(validateSession());
    }, 2000);
  };

  return (
    <div className="bg-[url('https://images.pexels.com/photos/2346594/pexels-photo-2346594.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')] bg-cover w-screen h-screen fixed flex z-20 overflow-y-auto">
      <section className="w-5/6 h-fit bg-slate-900 border-2 border-slate-600 shadow-xl m-auto rounded-lg bg-opacity-70 flex ">
        <article className="flex-row w-5/12 ">
          <img
            src="https://i.imgur.com/TedlwwQ.png"
            alt="logo"
            className="ml-5 max-w-full max-h-full mt-28"
          />
          ;
          <h3 className="text-xl w-full text-center mx-auto text-slate-50 font-semibold">
            Welcome to the best developer workflow app.
          </h3>
        </article>
        <article className="flex py-7 p-7 w-full">
          <div className="relative w-full h-full  bg-slate-50 rounded-lg shadow-2xl  border-slate-700 text-xl">
            <h1 className="text-4xl w-full mt-10 pl-8 font-bold text-emerald-800">
              Sign Up
            </h1>
            <p className="font-medium text-slate-500 pl-8 mt-4">
              Create your account.
            </p>
            <form
              onSubmit={register}
              className="w-full px-8  max-h-5/6 m-auto mt-8 "
            >
              <div className="grid grid-flow-col grid-cols-2 w-full gap-4 text-slate-600 mb-2">
                <section>
                  <label
                    htmlFor="firstname"
                    className="w-full text-lg font-semibold"
                  >
                    Firstname:
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    required
                    className="border-2 w-full rounded-md capitalize shadow-sm h-9 outline-none focus:border-emerald-700"
                  />
                </section>
                <section>
                  <label
                    htmlFor="lastname"
                    className="w-full text-lg font-semibold"
                  >
                    Lastname:
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    required
                    className="border-2 w-full rounded-md mb-4 capitalize shadow-sm h-9 outline-none focus:border-emerald-700 "
                  />
                </section>
              </div>
              <div className="grid grid-flow-col grid-cols-2 w-full gap-4 text-slate-600 mb-2">
                <section>
                  <label
                    htmlFor="phone"
                    className="w-full text-lg font-semibold"
                  >
                    Phone:
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    required
                    placeholder="+( ... ) __ __ __ __ __ __ __ __"
                    className="border-2 w-full rounded-md mb-3 shadow-sm h-9  outline-none focus:border-emerald-700"
                  />
                </section>
                <section>
                  <label
                    htmlFor="birthday"
                    className="w-full text-lg font-semibold"
                  >
                    Birthday:
                  </label>
                  <input
                    id="birthday"
                    name="birthday"
                    type="date"
                    required
                    className="border-2 w-full rounded-md mb-4 shadow-sm h-9 outline-none focus:border-emerald-700 "
                  />
                </section>
              </div>
              <div className="grid grid-flow-col grid-cols-2 w-full  gap-4 text-slate-600">
                <section>
                  <label
                    htmlFor="email"
                    className="w-full text-lg font-semibold"
                  >
                    Email:
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="border-2 w-full rounded-md mb-3 shadow-sm h-9 outline-none focus:border-emerald-700"
                    required
                  />
                </section>
                <section>
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
                </section>
              </div>

              <section className="w-full text-center mt-12">
                <button
                  type="submit"
                  className="bg-emerald-700 px-2 mb-4 rounded-md text-2xl text-slate-50 hover:bg-emerald-600 hover:text-slate-100 shadow-md hover:shadow-lg "
                >
                  Submit
                </button>
              </section>
              <Link to={"/"}>
                <p className="absolute top-3 right-6 text-3xl text-emerald-800">
                  <FaHome />
                </p>
              </Link>
            </form>
          </div>
        </article>
      </section>
      {modal && <Modal message={"Welcome to the APP!"} />}
    </div>
  );
}
