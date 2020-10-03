import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  qubitState: {
    fontSize: 15,
    fontWeight: "bold",
    verticalAlign: "middle",
    paddingTop: "25%",
    padding: 0,
  },
}));

const QubitCard = (props) => {
  const { selectedState, q } = props;
  return (
    <div
      className={`${useStyles().qubitState} ${
        selectedState === q
          ? "selected-state"
          : "not-selected-state"
      }`}
      onClick={() => props.handleQubitClick(q)}
    >
      <code className={useStyles().qubitState}>{`|${q}>`}</code>
    </div>
  );
};
export default QubitCard;
