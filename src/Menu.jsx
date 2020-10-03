import React from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DialpadRoundedIcon from "@material-ui/icons/DialpadRounded";
import BubbleChartOutlinedIcon from "@material-ui/icons/BubbleChartOutlined";
import AllInclusiveOutlinedIcon from "@material-ui/icons/AllInclusiveOutlined";
import styled from "styled-components/macro";

const StyledDrawer = styled(Drawer)`
  div.MuiDrawer-paper {
    background: black;
    position: relative;
    -moz-only-whitespace: nowrap;
    width: 3.5rem;
  }
`;

const listIconStyle = { minWidth: 0, paddingRight: 8, color: "white" };

const Menu = () => {
  return (
    <div style={{ display: "flex" }}>
      <AppBar
        position="absolute"
        style={{
          fontFamily: "Source Code Pro, monospace",
          fontSize: "1em",
          height: "4em",
          backgroundColor: "black",
          zIndex: 1201,
        }}
      >
        <Toolbar style={{ paddingLeft: "0.9rem" }}>
          <IconButton
            edge="start"
            color="primary"
            aria-label="open drawer"
            style={{ marginRight: 25 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            color="primary"
            noWrap
            style={{ fontWeight: "bold", flexGrow: 1 }}
          >
            Quantum Circuit Simulator
          </Typography>
        </Toolbar>
      </AppBar>
      <StyledDrawer variant="permanent">
        <List style={{ marginTop: "4.5em", overflow: "hidden" }}>
          <ListItem button component={Link} to="/">
            <Tooltip title="Multiple Qubit System">
              <ListItemIcon style={listIconStyle}>
                <DialpadRoundedIcon />
              </ListItemIcon>
            </Tooltip>
          </ListItem>
          <ListItem button>
            <Tooltip title="Statistics">
              <ListItemIcon style={listIconStyle}>
                <AllInclusiveOutlinedIcon />
              </ListItemIcon>
            </Tooltip>
          </ListItem>
          <ListItem button>
            <Tooltip title="Physics">
              <ListItemIcon style={listIconStyle}>
                <BubbleChartOutlinedIcon />
              </ListItemIcon>
            </Tooltip>
          </ListItem>
        </List>
      </StyledDrawer>
    </div>
  );
};
export default Menu;
