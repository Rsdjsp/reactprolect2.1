import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { getList, createList } from "../features/user/teamSlice";
import { FaPlus } from "react-icons/fa";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { get, post } from "../api";

export default function DragandDrop2() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [list, updateList] = useState(
    JSON.parse(localStorage.getItem("blist"))
  );
  const [modal, setModal] = useState(false);
  const [listTitle, setListTitle] = useState("");

  useEffect(() => {
    if (localStorage.getItem("blist") === null) {
      get(`/workList/${id}`)
        .then(({ data }) => {
          localStorage.setItem("blist", JSON.stringify(data));
          updateList(JSON.parse(localStorage.getItem("blist")));
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.removeItem("blist");
    let newList = list;
    const idTeam = id;
    post("/workList", {
      title: listTitle,
      team: idTeam,
    }).then(({ data }) => {
      newList.push(data);
      localStorage.setItem("blist", JSON.stringify(newList));
      updateList(JSON.parse(localStorage.getItem("blist")));
    });

    setTimeout(() => {
      setModal(false);
    }, 1000);
  };

  // const actualList = () => {
  //   if (lists) {
  //     const newList = lists.slice(lists.length - 1, lists.length);
  //     console.log(newList);
  //     const currentArray = JSON.parse(localStorage.getItem("blist"));
  //     console.log(currentArray);
  //     const newArray = currentArray.push(newList);
  //     console.log(newArray);
  //    localStorage.removeItem("blist");
  //   }
  // };
  const onDragEnd = (result, list) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId !== destination.droppableId) {
      let newList = Array.from(list);
      const sourceList = list.find((list) => list._id === source.droppableId);
      const sourceTask = sourceList.tasks.find(
        (task) => task._id === draggableId
      );
      const sourceIndex = newList.indexOf(sourceList, 0);
      const taskIndex = sourceList.tasks.indexOf(sourceTask, 0);
      const destList = list.find(
        (list) => list._id === destination.droppableId
      );
      const destTask = destList.tasks;
      const destIndex = newList.indexOf(destList, 0);
      const removed = sourceList.tasks.splice(taskIndex, 1);
      destTask.splice(destination.index, 0, removed[0]);
      newList.splice(sourceIndex, 1, sourceList);
      newList.splice(destIndex, 1, destList);
      localStorage.setItem("blist", JSON.stringify(newList));
      updateList(JSON.parse(localStorage.getItem("blist")));
    } else {
      let newList = Array.from(list);
      const column = list.find((li) => li._id === source.droppableId);
      const listIndex = list.indexOf(column, 0);
      const copiedItems = Array.from(column.tasks);
      const removed = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed[0]);
      const newColumn = {
        _id: column._id,
        title: column.title,
        createDate: column.createDate,
        creator: column.creator,
        tasks: copiedItems,
      };
      newList.splice(listIndex, 1, newColumn);
      localStorage.setItem("blist", JSON.stringify(newList));
      updateList(JSON.parse(localStorage.getItem("blist")));
    }
  };
  return (
    <>
      {list && (
        <div className="flex justify-center h-max w-max pr-10">
          <DragDropContext onDragEnd={(result) => onDragEnd(result, list)}>
            {list.map(({ _id, title, tasks }, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={_id}
                >
                  <h2>{title}</h2>
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={_id} key={_id}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "lightgrey",
                              padding: 4,
                              width: 250,
                              minHeight: 100,
                            }}
                          >
                            {tasks.map(({ _id, title }, index) => {
                              return (
                                <Draggable
                                  key={_id}
                                  draggableId={_id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 16,
                                          margin: "0 0 8px 0",
                                          minHeight: "50px",
                                          backgroundColor: snapshot.isDragging
                                            ? "#263B4A"
                                            : "#456C86",
                                          color: "white",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {title}
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
          <section className="mt-12 z-20 relative">
            <button
              onClick={() => setModal(!modal)}
              className="w-64 font-semibold text-md bg-slate-900 opacity-90 hover:opacity-100 hover:bg-slate-200 ml-4 h-10 items-center text-zinc-100 hover:text-zinc-700 border-2 border-slate-400 rounded-sm text-left pl-3 flex"
            >
              Add List{" "}
              <span className="ml-36">
                <FaPlus />
              </span>
            </button>
            {modal && (
              <form
                onSubmit={handleSubmit}
                className="bg-slate-100 absolute w-72 -top-12 h-fit mx-auto mt-24 px-4 border-2 border-slate-300 flex flex-col rounded-sm shadow-md z-50"
              >
                <p
                  onClick={() => setModal(false)}
                  className="cursor-pointer top-2 right-4 text-xl hover:text-emerald-700 absolute"
                >
                  <AiOutlineCloseSquare />
                </p>
                <h3 className="w-full text-emerald-800 font-semibold text-xl text-center mt-3">
                  Crate New List
                </h3>
                <label
                  htmlFor="title "
                  className="w-full capitalize font-medium mt-4 mb-2"
                >
                  insert title for new list
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full pl-2 h-8 border-2 outline-none border-slate-200 focus:border-emerald-700 rounded-sm"
                  placeholder="..."
                  required
                  onChange={(event) => setListTitle(event.target.value)}
                />
                <div className="w-full text-center">
                  <button className="bg-emerald-600 my-4 cursor-pointer px-2 text-slate-100 font-semibold rounded-sm">
                    Submit
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      )}
    </>
  );
}
