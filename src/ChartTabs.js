import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import BarChart from "./BarChart";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    minWidth: 0,
  },
  tabsBar: {
    height: "2em",
    width: "18em",
    borderRadius: "2em",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
}));

export default function ChartTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.tabsBar} position="static">
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab style={{ width: "6em" }} label="State vector" />
          <Tab style={{ width: "6em" }} label="Density" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <BarChart qubitNum={props.qubitNum} result={props.result} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Density
      </TabPanel>
    </div>
  );
}
