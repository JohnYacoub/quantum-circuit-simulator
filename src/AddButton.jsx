import React from "react";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

// TODO add on hover background-color:#3f51b5
const useStyles = makeStyles((theme) => ({
  addButton: {
    marginTop: "1rem",
    padding: "6px",
    position: "relative",
    transition: "all 0.3s ease 0s",
    boxShadow: "0 3px 5px 2px #b186f7",
  },
}));
const AddButton = (props) => {
  return (
    <IconButton className={useStyles().addButton} onClick={props.onClick}>
      <AddIcon
        style={{ color: "#b186f7", fontSize: "1em" }}
        className="material-icons"
      />
    </IconButton>
  );
};
export default AddButton;
