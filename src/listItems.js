import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded";
import DialpadRoundedIcon from "@material-ui/icons/DialpadRounded";
import BubbleChartOutlinedIcon from "@material-ui/icons/BubbleChartOutlined";
import AllInclusiveOutlinedIcon from "@material-ui/icons/AllInclusiveOutlined";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/multiqubit">
      <Tooltip title="Multiple Qubit System">
        <ListItemIcon>
          <DialpadRoundedIcon />
        </ListItemIcon>
      </Tooltip>
      <ListItemText primary="Multiple Qubit System" />
    </ListItem>
    <ListItem button component={Link} to="/statistics">
      <ListItemIcon>
        <AllInclusiveOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Statistics" />
    </ListItem>
    <ListItem button component={Link} to="/physics">
      <ListItemIcon>
        <BubbleChartOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Physics" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <LibraryBooksOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Resource 1" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LibraryBooksOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Resource 1" />
    </ListItem>
  </div>
);
