import * as React from "react";
import useState from "react-usestateref";
import BoardPage from "./BoardPage";
import NavBar from "./NavBar";
import MainPage from "./MainPage";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { CardActionArea, Typography } from "@mui/material";

export default function BoardCard(props) {
  const handleClick = () => {
    props.setShowBoard(true);
    props.setBoardName(props.name);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 300 }}>
        <CardActionArea onClick={handleClick}>
          <CardContent>
            <Typography>
              {props.name}
              <br />
              {props.desc}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
