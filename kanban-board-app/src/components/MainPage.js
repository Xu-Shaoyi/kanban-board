import React, { useEffect } from "react";
import useState from "react-usestateref";
import classes from "./MainPage.module.css";

import ModalForm from "./ModalForm";

import { Button } from "@mui/material";
import BoardCard from "./BoardCard";
import BoardPage from "./BoardPage";
import NavBar from "./NavBar";

const MainPage = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [cardList, setCardList] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("cards") !== null) {
      setCardList(JSON.parse(localStorage.getItem("cards")));
    }
  }, [showModal]);

  const handleOnClick = () => {
    setShowModal(true);
  };

  const handleOnClose = () => {
    setShowModal(false);
  };

  return (
    <div className={classes.main}>
      <NavBar />
      <div className={classes.components}>
        <Button
          sx={{ maxWidth: 250 }}
          onClick={handleOnClick}
          variant="contained"
        >
          Create New Board
        </Button>
        <div className={classes.cardContainer}>
          {cardList &&
            cardList.map((card) => {
              return (
                <BoardCard
                  name={card.name}
                  desc={card.desc}
                  setShowBoard={props.setShowBoard}
                  setBoardName={props.setBoardName}
                />
              );
            })}

          {showModal && <ModalForm open={showModal} onClose={handleOnClose} />}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
