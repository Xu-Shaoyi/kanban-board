import React from "react";
import useState from "react-usestateref";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const ModalForm = (props) => {
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

  const [nameRef, setNameRef] = useState(null);
  const [descRef, setDescRef] = useState(null);

  const handleBoardName = (e) => {
    setNameRef(e.target.value);
  };

  const handleBoardDesc = (e) => {
    setDescRef(e.target.value);
  };

  const cardStorageHandler = (name) => {
    const boardName = name;
    name = {
      todo: [],
      inProgress: [],
      done: [],
    };
    localStorage.setItem(`${boardName}`, JSON.stringify(name));
  };

  const submitHandler = () => {
    props.onClose();

    const cardData = {
      name: nameRef,
      desc: descRef,
    };

    cardStorageHandler(cardData.name);

    if (localStorage.getItem("cards") === null) {
      localStorage.setItem("cards", JSON.stringify([cardData]));
    } else {
      let cur_cards = JSON.parse(localStorage.getItem("cards"));
      cur_cards.push(cardData);
      localStorage.setItem("cards", JSON.stringify(cur_cards));
    }
  };

  return (
    <Modal open={props.open}>
      <Box sx={style}>
        <TextField onChange={handleBoardName} fullWidth label="Board Name" />
        <br />
        <br />
        <TextField
          onChange={handleBoardDesc}
          multiline
          fullWidth
          label="Description"
        />
        <br />
        <br />
        <Button onClick={submitHandler}>Create</Button>
      </Box>
    </Modal>
  );
};

export default ModalForm;
