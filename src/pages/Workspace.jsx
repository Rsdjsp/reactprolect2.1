import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DragAndDrop from "../components/DragAndDrop";
import DragAndDrop2 from "../components/DragandDrop2";
import Nav from "../components/Nav";

export default function Workspace() {
  const { id } = useParams();
  const { teams, images, lists } = useSelector((state) => state.team);
  const team = teams.find((team) => team._id === id);

  return (
    <>
      {team && (
        <div className="w-screen  h-screen pt-20 overflow-x-hidden overflow-y-hidden font-sans pb-14 ">
          <img
            src={team.img}
            alt="cover"
            className="w-screen h-screen absolute top-0 left-0 -z-20 "
          />
          <Nav images={images} team={team} />
          <section className="w-full h-full overflow-y-auto pl-5 relative  overflow-x-auto">
            <DragAndDrop2 />
            {/* {lists && <DragAndDrop />} */}
          </section>
        </div>
      )}
    </>
  );
}
