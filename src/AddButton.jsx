import React from "react";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

const AddButton = (props) => {
  return (
    <IconButton
      style={{
        marginTop: "1rem",
        padding: "6px",
        position: "relative",
        boxShadow: "0 3px 5px 2px #b186f7",
      }}
      onClick={props.onClick}
    >
      <AddIcon
        style={{ color: "#b186f7", fontSize: "1.4rem" }}
      />
    </IconButton>
  );
};
export default AddButton;
