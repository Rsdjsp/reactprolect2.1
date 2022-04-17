import React from "react";

export default function Modal({ message }) {
  return (
    <div className="w-screen h-full min-h-screen bg-slate-700 absolute flex bg-opacity-50 ">
      <div className="w-1/2 h-1/2 bg-slate-50 m-auto font-sans font-bold text-4xl  rounded-md shadow-md text-center justify-center flex"><p className="m-auto text-emerald-800">{message}</p></div>
    </div>
  );
}
