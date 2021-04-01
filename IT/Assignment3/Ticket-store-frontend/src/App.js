import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import StoreIcon from "@material-ui/icons/Store";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { DataGrid } from "@material-ui/data-grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Carousal from "./Carousal";
import Downshift from "downshift";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  formControlButton: {
    margin: theme.spacing(1),
    minWidth: 180,
    minHeight: 50,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    background: "transparent",
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 200,
  },
}));
// function loadServerRows(page, data) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(data.slice(page * 10, (page + 1) * 10));
//     }, Math.random() * 500 + 100); // simulate network latency
//   });
// }
function formatParams(params) {
  return (
    "?" +
    Object.keys(params)
      .map(function (key) {
        return key + "=" + params[key];
      })
      .join("&")
  );
}
export default function DenseAppBar() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const columns = [
    { field: "id", hide: true, headerName: "ID" },
    { field: "time", width: 90, headerName: "Time" },
    { field: "arrivalCity", width: 190, headerName: "Arrival City/Airport" },
    {
      field: "departureCity",
      width: 190,
      headerName: "Departure City/Airport",
    },
    { field: "legs", width: 90, headerName: "Legs" },
    { field: "cost", width: 120, headerName: "Total Cost (in ₹)" },
    { field: "duration", width: 120, headerName: "Duration(mins)" },
    { field: "sale", width: 120, headerName: "On Sale" },
  ];

  const timeList = [
    "0:00",
    "0:30",
    "1:00",
    "1:30",
    "2:00",
    "2:30",
    "3:00",
    "3:30",
    "4:00",
    "4:30",
    "5:00",
    "5:30",
    "6:00",
    "6:30",
    "7:00",
    "7:30",
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];
  const [loading, setLoading] = React.useState(false);
  const [searchArrivalCity, setSearchArrivalCity] = React.useState("");
  const [searchDepartureCity, setSearchDepartureCity] = React.useState("");
  const [searchTime, setSearchTime] = React.useState("");
  const handlePageChange = (param) => {
    setPage(param.page);
    let active = true;
    const params = {
      arrivalCity: searchArrivalCity,
      departureCity: searchDepartureCity,
      time: searchTime,
      start: page * 10,
      count: 10,
    };
    const url =
      "http://localhost:8080/Assignment3_war/queryflight" +
      formatParams(params);
    (async () => {
      setLoading(true);
      await fetch(url)
        .then((response) => response.json())
        .then((res) => {
          res.sort(function (a, b) {
            if (a.time > b.time) return 1;
            else return -1;
          });
          setRows(res);
        })
        .catch((err) => console.log(err));
      if (!active) {
        return;
      }
      setLoading(false);
    })();
  };
  const [cities, setCities] = React.useState([]);
  const handleSearchQuery = () => {
    handlePageChange({ page: 0 });
  };
  React.useEffect(() => {
    (async () => {
      fetch("http://localhost:8080/Assignment3_war/info")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          data.sort(function (a, b) {
            if (a.city > b.city) {
              return 1;
            } else {
              return -1;
            }
          });
          setCities(data);
        })
        .catch((err) => console.log(err));
    })();
  });

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static" color="primary">
            <Toolbar variant="dense">
              <StoreIcon color="inherit" fontSize="large" />
              <Typography variant="h5" color="inherit">
                Ticket Store
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={12} sm={12} lg={8}>
          <Paper className={classes.paper}>
            <Grid item xs={12} style={{ marginTop: 10 }}>
              <Downshift
                onChange={(selection) => setSearchArrivalCity(selection.city)}
                itemToString={(item) => (item ? item.city : "")}
              >
                {({
                  getInputProps,
                  getItemProps,
                  getMenuProps,
                  isOpen,
                  inputValue,
                  highlightedIndex,
                  selectedItem,
                  getRootProps,
                }) => (
                  <div>
                    <div {...getRootProps({}, { suppressRefError: true })}>
                      <input
                        style={{ minHeight: 40 }}
                        placeholder="Enter Arrival City"
                        {...getInputProps()}
                      />
                    </div>
                    <ul {...getMenuProps()} style={{ display: "block" }}>
                      {isOpen
                        ? cities
                            .filter(
                              (item) =>
                                !inputValue || item.city.includes(inputValue)
                            )
                            .map((item, index) => (
                              <li
                                {...getItemProps({
                                  key: item.city,
                                  index,
                                  item,
                                  style: {
                                    backgroundColor:
                                      highlightedIndex === index
                                        ? "lightgray"
                                        : "white",
                                    fontWeight:
                                      selectedItem === item ? "bold" : "normal",
                                  },
                                })}
                              >
                                {item.city}
                              </li>
                            ))
                        : null}
                    </ul>
                  </div>
                )}
              </Downshift>
              <Downshift
                onChange={(selection) => setSearchDepartureCity(selection.city)}
                itemToString={(item) => (item ? item.city : "")}
              >
                {({
                  getInputProps,
                  getItemProps,
                  getMenuProps,
                  isOpen,
                  inputValue,
                  highlightedIndex,
                  selectedItem,
                  getRootProps,
                }) => (
                  <div>
                    <div {...getRootProps({}, { suppressRefError: true })}>
                      <input
                        style={{ minHeight: 40 }}
                        placeholder="Enter Departure City"
                        {...getInputProps()}
                      />
                    </div>
                    <ul {...getMenuProps()} style={{ display: "block" }}>
                      {isOpen
                        ? cities
                            .filter(
                              (item) =>
                                inputValue !== "" &&
                                item.city.includes(inputValue)
                            )
                            .map((item, index) => (
                              <li
                                {...getItemProps({
                                  key: item.city,
                                  index,
                                  item,
                                  style: {
                                    backgroundColor:
                                      highlightedIndex === index
                                        ? "lightgray"
                                        : "white",
                                    fontWeight:
                                      selectedItem === item ? "bold" : "normal",
                                  },
                                })}
                              >
                                {item.city}
                              </li>
                            ))
                        : null}
                    </ul>
                  </div>
                )}
              </Downshift>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">
                  Time
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={searchTime}
                  onChange={(event) => setSearchTime(event.target.value)}
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {timeList.map((time) => (
                    <MenuItem value={time}>{time}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.formControlButton}
                onClick={() => handleSearchQuery()}
              >
                Search
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Paper style={{ marginTop: 20 }}>
                <div style={{ height: 630, width: "100%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pagination
                    pageSize={10}
                    rowCount={10000}
                    paginationMode="server"
                    onPageChange={handlePageChange}
                    loading={loading}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={2}></Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <Carousal />
        </Grid>
      </Grid>
    </div>
  );
}
