import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Teams from "../components/Teams";
import { createTeam, getTeams } from "../features/user/teamSlice";
import { AiFillCloseSquare } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team);
  const [imgId, setImgId] = useState("");
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { logged } = useSelector((state) => state.user);

  const addTeam = (event) => {
    event.preventDefault();
    setSuccess(true);
    const {
      name: { value: name },
      description: { value: description },
    } = event.target;
    dispatch(createTeam({ name, imgId, description }));
    setTimeout(() => {
      setSuccess(false);
      setModal(false);
      dispatch(getTeams());
      navigate("/");
    }, 2000);
  };

  return (
    <div className="w-screen  h-screen bg-[url('https://images.pexels.com/photos/2346594/pexels-photo-2346594.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')] bg-cover fixed -z-10 ">
      <section className="mt-20 bg-slate-200 w-screen h-screen max-h-screen bg-opacity-60 overflow-y-auto  ">
        <div className="w-full text-center pt-6">
          <button
            onClick={() => setModal(true)}
            className="bg-slate-900 opacity-95 text-slate-50 px-2 mb-4 rounded-md text-xl shadow-md hover:bg-slate-700"
          >
            Add Team
          </button>
        </div>
        <div className="mb-10">{logged && <Teams />}</div>
        {modal && (
          <article className="w-screen h-screen bg-slate-800 bg-opacity-60 absolute flex top-0 left-0 z-50 overflow-x-auto pt-12 overflow-y-auto">
            <div className="w-1/3 h-fit relative max-h-fit pt-6  bg-slate-50 m-auto flex-row rounded-md border-2 border-emerald-700">
              {success && (
                <div className="absolute flex w-full h-full bg-slate-700 bg-opacity-50 top-0">
                  <article className="w-3/4 m-auto h-32 bg-slate-50 text-center flex">
                    <h1 className="m-auto text-3xl text-emerald-700 font-semibold rounded-sm ">
                      Team Created!
                    </h1>
                  </article>
                </div>
              )}
              <p className="w-full text-right text-2xl text-emerald-700 pr-4 pt-1">
                <button onClick={() => setModal(false)}>
                  <AiFillCloseSquare />
                </button>
              </p>
              <form
                className="w-3/4 m-auto font-sans text-2xl font-semibold text-slate-600"
                onSubmit={(event) => addTeam(event)}
              >
                <label htmlFor="name">Team Name:</label>
                <input
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="border-2 w-full rounded-md text-xl shadow-sm h-9 outline-none focus:border-emerald-700"
                />
                <label htmlFor="description">Description:</label>
                <input
                  required
                  type="text"
                  name="description"
                  id="description"
                  className="border-2 w-full text-xl rounded-md mb-6 shadow-sm h-9 outline-none focus:border-emerald-700"
                />
                <label htmlFor="cover">Cover:</label>
                <div className="w-full h-56 border-2 shadow-xl mt-2  mx-auto rounded-md overflow-y-auto">
                  {team.images.map((image) => {
                    return (
                      <button
                        className="focus:border-4 focus:border-emerald-600 w-full h-fit"
                        key={image._id}
                        onClick={(e) => {
                          e.preventDefault();
                          setImgId(image.url);
                        }}
                      >
                        <img
                          name="cover"
                          src={image.url}
                          alt="cover"
                          className="rounded-md w-11/12 my-2 mx-auto  cursor-pointer "
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="w-full text-center mt-8">
                  <button className="bg-emerald-700 px-2 pb-1 mb-6  rounded-md text-2xl text-slate-50 hover:bg-emerald-600 hover:text-slate-100 shadow-md hover:shadow-lg ">
                    Create Team
                  </button>
                </div>
              </form>
            </div>
          </article>
        )}
      </section>
    </div>
  );
}
