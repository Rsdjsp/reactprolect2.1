import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function Task2({ tasks, id }) {
  return (
    <Droppable droppableId={id} type="COLUMN" direction="vertical">
      {(provided) => (
        <ul
          className=" flex "
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {tasks.map(({ _id, title }, index) => {
            return (
              <Draggable key={_id} draggableId={_id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className=""
                  >
                    <h3 className=" ">{title}</h3>
                  </li>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}
