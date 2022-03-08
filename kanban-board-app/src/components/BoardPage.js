import React, { useEffect } from "react";
import classes from "./BoardPage.module.css";
import useState from "react-usestateref";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddTaskModal from "./AddTaskModal";
import { useBeforeunload } from "react-beforeunload";

const columnsData = {
  [uuidv4()]: {
    name: "Todo",
    items: [],
  },
  [uuidv4()]: {
    name: "In Progress",
    items: [],
  },
  [uuidv4()]: {
    name: "Done",
    items: [],
  },
};

const BoardPage = (props) => {
  const [taskModal, setTaskModal] = useState(false);
  const [columns, setColumns] = useState(null);
  const [columnName, setColumnName] = useState("Todo");

  useEffect(() => {
    const boardValues = JSON.parse(localStorage.getItem(props.boardName));

    let temp_columns = columnsData;
    for (const [key, value] of Object.entries(temp_columns)) {
      if (temp_columns[key].name === "Todo") {
        temp_columns[key].items = boardValues.todo;
      } else if (temp_columns[key].name === "In Progress") {
        temp_columns[key].items = boardValues.inProgress;
      } else if (temp_columns[key].name === "Done") {
        temp_columns[key].items = boardValues.done;
      }
    }

    setColumns(temp_columns);
  }, []);

  const handleGoBack = () => {
    props.setShowBoard(false);
    const boardValues = JSON.parse(localStorage.getItem(props.boardName));
    for (const [key, value] of Object.entries(columns)) {
      if (columns[key].name === "Todo") {
        boardValues.todo = columns[key].items;
      } else if (columns[key].name === "In Progress") {
        boardValues.inProgress = columns[key].items;
      } else if (columns[key].name === "Done") {
        boardValues.done = columns[key].items;
      }
    }

    localStorage.setItem(props.boardName, JSON.stringify(boardValues));
  };

  useBeforeunload((event) => {
    const boardValues = JSON.parse(localStorage.getItem(props.boardName));
    for (const [key, value] of Object.entries(columns)) {
      if (columns[key].name === "Todo") {
        boardValues.todo = columns[key].items;
      } else if (columns[key].name === "In Progress") {
        boardValues.inProgress = columns[key].items;
      } else if (columns[key].name === "Done") {
        boardValues.done = columns[key].items;
      }
    }

    localStorage.setItem(props.boardName, JSON.stringify(boardValues));
  });

  const addTaskHandler = (name) => {
    setTaskModal(true);
    setColumnName(name);
  };

  const closeTaskModalHandler = () => {
    setTaskModal(false);
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      // if we want to move tasks from one column to another
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1); // remove task from sourceItems
      destItems.splice(destination.index, 0, removed); // put into destItems
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      // if we want to change positions of tasks in the same column
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  if (columns === null) {
    return null;
  }
  return (
    <div>
      <div className={classes.top}>
        <h1>{props.boardName}</h1>
        <Button
          className={classes.button}
          variant="contained"
          onClick={handleGoBack}
        >
          Go back
        </Button>
      </div>

      <div className={classes.container}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([id, column]) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h2>{column.name}</h2>
                <div
                  style={{
                    margin: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Droppable droppableId={id} key={id}>
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
                            minHeight: 540,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
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
                                          ? "#263b4a"
                                          : "#456c86",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.content}
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
                  <Button onClick={() => addTaskHandler(column.name)}>
                    Add Task
                  </Button>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
      {taskModal && (
        <AddTaskModal
          open={taskModal}
          onClose={closeTaskModalHandler}
          columns={columns}
          setColumns={setColumns}
          columnName={columnName}
        />
      )}
    </div>
  );
};

export default BoardPage;
