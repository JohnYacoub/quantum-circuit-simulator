import React, { FC } from "react";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
type ButtonProps = {
  onClick: any;
};
const AddButton: FC<ButtonProps> = ({ onClick }) => {
  return (
    <IconButton
      style={{
        marginTop: "1rem",
        padding: "6px",
        position: "relative",
        boxShadow: "0 3px 5px 2px #b186f7",
      }}
      onClick={onClick}
    >
      <AddIcon style={{ color: "#b186f7", fontSize: "1.4rem" }} />
    </IconButton>
  );
};
export default AddButton;
