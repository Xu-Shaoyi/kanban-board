import React from "react";
import useState from "react-usestateref";
import { Button, Modal, Box, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const AddTaskModal = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #026aa7",
    boxShadow: 24,
    p: 4,
  };

  const [taskDescRef, setTaskDescRef] = useState();

  const handleTaskDesc = (e) => {
    setTaskDescRef(e.target.value);
  };

  const submitTaskHandler = () => {
    props.onClose();

    const data = {
      id: uuidv4(),
      content: taskDescRef,
    };

    let temp_columns = props.columns;
    for (const [key, value] of Object.entries(temp_columns)) {
      if (temp_columns[key].name === props.columnName) {
        temp_columns[key].items.push(data);
      }
    }

    props.setColumns(temp_columns);
  };

  return (
    <Modal open={props.open}>
      <Box sx={style}>
        <h2>Enter task description</h2>
        <TextField
          onChange={handleTaskDesc}
          multiline
          fullWidth
          label="Description"
        />
        <br />
        <br />
        <Button onClick={submitTaskHandler}>Add Task</Button>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;
