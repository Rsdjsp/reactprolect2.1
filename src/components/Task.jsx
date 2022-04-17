import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

export default function Task({ title }) {
  const { lists } = useSelector((state) => state.team);
  const [list, updateList] = useState(lists);
  let newTasks = list.map((task) => task.tasks[0]);

  const [tasks, setTasks] = useState(newTasks);

  useEffect(() => {
    updateList(lists);
  }, [lists]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  }
  return (
    <>
      {tasks && (
        <div className="w-fit border-2">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="task" type="COLUMN" direction="vertical">
              {(provided) => (
                <ul
                  className=" flex flex-col "
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tasks.map((task, index) => {
                    return (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-zinc-300 shadow-md border-2 border-zinc-400   flex mx-1 my-1 max-w-60  w-60 capitalize pl-1 rounded-sm"
                          >
                            <button> {task.title}</button>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </>
  );
}
