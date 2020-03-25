import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded";
import DialpadRoundedIcon from "@material-ui/icons/DialpadRounded";
import BubbleChartOutlinedIcon from "@material-ui/icons/BubbleChartOutlined";
import AllInclusiveOutlinedIcon from "@material-ui/icons/AllInclusiveOutlined";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <FiberManualRecordRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Single Qubit Gates" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DialpadRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Multiple Qubits Gates" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AllInclusiveOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Statistics" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BubbleChartOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Physics" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Resources</ListSubheader>
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
    <ListItem button>
      <ListItemIcon>
        <LibraryBooksOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Resource 1" />
    </ListItem>
  </div>
);
