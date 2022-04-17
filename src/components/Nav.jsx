import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { BiUserPlus } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { fetchUsers, getTeams } from "../features/user/teamSlice";
import { post } from "../api";
import { useNavigate } from "react-router-dom";

export default function Nav({ images, team }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newUserId, setNewUserId] = useState("");
  const [imgId, setImgId] = useState("");
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [removeId, setRemoveId] = useState("");
  const { users } = useSelector((state) => state.team);
  const { logged, userId } = useSelector((state) => state.user);
  const newUsers = users.filter(
    (user) => user.teams.includes(team._id) === false
  );
  const userLed = team.members.find((member) => member.role === "leader");

  const invite = async (e) => {
    e.preventDefault();
    dispatch(fetchUsers());
    setModal2(!modal2);
  };

  const changeImage = async (e) => {
    e.preventDefault();
    const url = imgId;
    const idTeam = team._id;
    await post("/teams/updateImg", {
      url: url,
      idTeam: idTeam,
    });
    dispatch(getTeams());
  };

  const regUsers = async (e) => {
    if (newUserId === "") {
      alert("Please select a User to invite");
    } else {
      e.preventDefault();
      await post("/teams/addMember", {
        idTeam: team._id,
        idNewMember: newUserId,
      });
      dispatch(getTeams());
      setModal2(false);
      setModal3(true);
      setTimeout(() => {
        setModal3(false);
      }, 1500);
    }
  };

  const newUser = async (event) => {
    event.preventDefault();
    const {
      email: { value: email },
    } = event.target;
    await post("/teams/newMember", {
      email: email,
    });
    setModal3(true);
    setModal2(false);
    setTimeout(() => {
      setModal3(false);
    }, 1500);
  };

  const userModal = (memberId) => {
    setRemoveId(memberId);
    if (userLed.user._id === userId) {
      if (removeId === memberId) {
        setModal4(!modal4);
      }
    } else {
      if (memberId === userId) {
        setModal4(!modal4);
      }
    }
  };

  const removeUser = async () => {
    await post("/teams/deleteMember", {
      idTeam: team._id,
      idMember: removeId,
    });
    dispatch(getTeams());
    setModal4(false);
    if (removeId === userId) {
      setModal4(!modal4);
      dispatch(getTeams());
      setModal4(false);
      navigate("/");
    }
  };

  return (
    team && (
      <nav className="relative w-screen h-14 bg-slate-900  shadow-lg   opacity-95 grid grid-flow-col grid-cols-2 z-30">
        <article className="flex justify-start">
          <button
            onClick={() => setModal(!modal)}
            className=" bg-slate-300 px-2 text-center ml-8 justify-center rounded-md flex my-auto h-8 text-lg font-semibold hover:bg-slate-600 "
          >
            Cover{" "}
            <span className="m-auto ml-2">
              <IoIosArrowDown />
            </span>
          </button>
          <p className="bg-slate-600  text-zinc-100 px-2 text-center w-3/4 ml-20 justify-center rounded-sm h-8 my-auto text-lg font-semibold">
            {team.name}
          </p>
          <h3 className="font-sans my-auto ml-9 mr-2 font-bold text-zinc-100 text-xl">
            Members
          </h3>
        </article>
        <article className="flex ">
          <p className=" my-auto mr-3  h-12 text-zinc-100 font-light shadow-md text-4xl">
            |
          </p>
          <section className="w-3/4 my-auto flex flex-row relative ">
            {team.members.map((member) => {
              return (
                <section key={member._id} className="realtive">
                  <button
                    onClick={() => userModal(member.user._id)}
                    className="w-10 h-10 capitalize  rounded-full bg-transparent border-2 cursor-pointer shadow-md hover:bg-slate-50 hover:text-slate-600 border-emerald-600 my-auto text-center justify-center text-zinc-100 text-3xl"
                  >
                    {member.user.name.slice(0, 1)}
                  </button>
                  {userLed.user._id !== userId &&
                    modal4 &&
                    member.user._id === userId && (
                      <div className="w-1/3 h-30 bg-slate-50 absolute border-2 border-slate-700">
                        <h3 className="capitalize text-xl font-semibold text-slate-700 ml-2">
                          {member.user.name.split(" ")[0]}
                        </h3>
                        <button
                          onClick={removeUser}
                          className="text-red-600 mb-1 w-full flex ml-1 hover:underline hover: underline-offset-2 hover:font-semibold"
                        >
                          <span className="text-lg my-auto">
                            <AiFillDelete />
                          </span>
                          Exit Team
                        </button>
                      </div>
                    )}
                  {userLed.user._id === userId &&
                    modal4 &&
                    member.user._id === removeId && (
                      <div className="w-1/3 h-30 bg-slate-50  rounded-md absolute border-2 border-slate-700 ">
                        <h3 className="capitalize text-xl font-semibold text-slate-700 ml-2">{`${
                          member.user.name.split(" ")[0]
                        } ${member.user.name.split(" ")[1]}`}</h3>
                        {removeId === userId ? (
                          <button className="text-red-600 mb-1 w-full flex ml-1 hover:underline hover: underline-offset-2 hover:font-semibold">
                            <span className="text-lg my-auto">
                              <AiFillDelete />
                            </span>
                            Delete Team
                          </button>
                        ) : (
                          <button
                            onClick={removeUser}
                            className="text-red-600 mb-1 w-full flex ml-1 hover:underline hover: underline-offset-2 hover:font-semibold"
                          >
                            <span className="text-lg my-auto">
                              <AiFillDelete />
                            </span>
                            Remove User
                          </button>
                        )}
                      </div>
                    )}
                </section>
              );
            })}
            <span className="w-6 h-6 bg-transparent text-lg font-light text-center rounded-full flex justify-center absolute text-yellow-400 top-5 -left-2">
              <BsFillStarFill />
            </span>
          </section>
          <section className=" w-1/4 justify-end flex">
            {userLed.user._id === userId && (
              <button
                onClick={invite}
                className="w-3/4 bg-slate-300  flex text-center justify-center text-lg font-semibold hover:bg-slate-600 rounded-md my-auto mr-9"
              >
                <span className="my-auto mr-1 text-2xl text-slate-800">
                  <BiUserPlus />
                </span>
                Invite
              </button>
            )}
          </section>
        </article>
        {modal && (
          <div className="w-1/4 h-fit border-2 border-zinc-300 shadow-md absolute top-12 bg-zinc-100 left-8  z-30 rounded-md">
            <h3 className="w-3/4 ml-10 border-b-2 border-zinc-300 font-sans font-semibold text-slate-900 text-xl text-center">
              Cover
            </h3>
            <section className="bg-slate-50 border-slate-400 m-1 border-2 h-80 overflow-y-auto">
              {images.map((image) => {
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
            </section>
            <article className="w-full text-center my-3">
              <button
                onClick={changeImage}
                className="bg-emerald-700 px-2 rounded-md text-lg text-slate-50 hover:bg-emerald-600 hover:text-slate-100 hover:shadow-lg"
              >
                Change Cover
              </button>
            </article>
          </div>
        )}
        {modal2 && logged && (
          <div className="bg-slate-50 absolute right-9 top-11 rounded-sm w-1/3 z-30 flex flex-col pb-4 border-2 border-slate-400">
            <h3 className="w-11/12 mx-auto mt-1 border-b-2 border-zinc-300 font-sans font-semibold text-slate-900 text-xl text-center">
              Invite user
            </h3>
            <form
              onSubmit={newUser}
              className="w-11/12 mx-auto justify-start border-b-2 border-zinc-300  "
            >
              <label className="font-medium  w-full my-1">
                Inivite new User:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="email..."
                className="border-2 w-3/4 pl-2 rounded-sm mb-3 shadow-sm h-8 outline-none focus:border-emerald-700"
              />
              <button className="w-1/4 bg-emerald-600 h-8 rounded-sm text-slate-50 hover:bg-emerald-400 hover:text-slate-200 ">
                Send
              </button>
            </form>
            <section className="w-11/12 mx-auto">
              <h3 className="font-medium  w-full my-1">
                Invite register user.
              </h3>
              <div className="bg-white w-full h-40  overflow-y-auto border-2 flex flex-col">
                {users &&
                  newUsers.map((user) => {
                    return (
                      <button
                        key={user._id}
                        onClick={() => setNewUserId(user._id)}
                        className="w-11/12 mt-2 border-2 mx-auto flex shadow-md rounded-full hover:border-emerald-700 focus:border-emerald-700 focus:shadow-xl"
                      >
                        <p className="w-10 h-10 rounded-full  bg-transparent border-2 cursor-pointer shadow-md hover:bg-slate-50 hover:text-slate-600 border-emerald-600  text-center justify-center text-slate-800 capitalize text-2xl">
                          {user.name.slice(0, 1)}
                        </p>
                        <p className="ml-3 capitalize font-medium text-slate-700">
                          {user.name}
                        </p>
                      </button>
                    );
                  })}
              </div>
              <div className="w-full text-center mt-4">
                <button
                  onClick={regUsers}
                  className="bg-emerald-600 text-2xl h-9 shadow-md rounded-sm text-slate-50 hover:bg-emerald-400 hover:text-slate-200 px-2"
                >
                  Invite
                </button>
              </div>
            </section>
          </div>
        )}
        {modal3 && (
          <div className="w-1/4 h-20 border-2 border-slate-300 rounded-md bg-slate-50 flex absolute top-12 right-9 font-sans">
            <h1 className="text-2xl m-auto text-emerald-700 font-semibold">
              User Invited
            </h1>
          </div>
        )}
      </nav>
    )
  );
}
