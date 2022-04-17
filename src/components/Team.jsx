import React from "react";
import { Link } from "react-router-dom";

export default function Team({ team }) {
  
  return (
     <Link to={"/workspace/" + team._id}>
     <div className=" relative w-full h-72 rounded-lg border-2 border-slate-600 shadow-2xl hover:border-slate-300 hover:shadow-xl flex justify-center">
       <img src={team.img} alt="cover" className="h-full w-full rounded-md" />
      <div className="absolute  w-3/4 h-1/2 shadow-md bg-slate-50 bg-opacity-90 flex rounded-md top-1/4 mx-auto">
        <h1 className="m-auto w-3/4 font-bold text-emerald-800 text-2xl text-center">{team.name}</h1>
      </div>
      </div>
      </Link>
  );
}
