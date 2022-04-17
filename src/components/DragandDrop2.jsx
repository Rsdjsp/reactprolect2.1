import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import { addTask, getList, removeTask } from "../features/user/teamSlice";

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" },
];

const listFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: itemsFromBackend,
  },
  [uuid()]: {
    name: "To do",
    items: [],
  },
  [uuid()]: {
    name: "In Progress",
    items: [],
  },
  [uuid()]: {
    name: "Done",
    items: [],
  },
};

export default function DragandDrop2() {
  const dispatch = useDispatch();
  const { lists } = useSelector((state) => state.team);
  const { id } = useParams();
  const [list, updateList] = useState(lists);
  const [modal, setModal] = useState(false);
  const [listTitle, setListTitle] = useState("");
  // const filter = list.filter((li) => li.team === id);

  useEffect(() => {
    dispatch(getList({ id: id }));
    updateList(lists);
  }, [dispatch, id, lists]);

  const onDragEnd = (result, list) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    console.log(result);

    if (source.droppableId !== destination.droppableId) {
      const sourceList = list.find((list) => list._id === source.droppableId);
      const sourceTask = sourceList.tasks.find(
        (task) => task._id === draggableId
      );
      const destList = list.find(
        (list) => list._id === destination.droppableId
      );
      dispatch(removeTask({ task: sourceTask._id, idList: sourceList._id }));
      dispatch(addTask({ task: sourceTask._id, idList: destList._id }));
    } else {
      let newList = Array.from(list);
      const column = list.find((li) => li._id === source.droppableId);
      const listIndex = list.indexOf(column, 0);
      const copiedItems = Array.from(column.tasks);
      const removed = copiedItems.splice(source.index, source.index + 1);
      copiedItems.splice(destination.index, 0, removed[0]);
      const newColumn = {
        _id: column._id,
        title: column.title,
        createDate: column.createDate,
        creator: column.creator,
        tasks: copiedItems,
      };
      newList.splice(listIndex, 1, newColumn);
      updateList(newList);
    }
  };

  return (
    <>
      {list && (
        <div
          style={{ display: "flex", justifyContent: "center", height: "100%" }}
        >
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
                              minHeight: 500,
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
        </div>
      )}
    </>
  );
}
