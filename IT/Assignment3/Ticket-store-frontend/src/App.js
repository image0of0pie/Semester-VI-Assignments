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
function loadServerRows(page, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.slice(page * 10, (page + 1) * 10));
    }, Math.random() * 500 + 100); // simulate network latency
  });
}
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
  const [data, setData] = React.useState([]);
  const columns = [
    { field: "id", hide: true, headerName: "ID" },
    { field: "time", width: 90, headerName: "Time" },
    { field: "arrivalCity", width: 210, headerName: "Arrival City/Airport" },
    {
      field: "departureCity",
      width: 210,
      headerName: "Departure City/Airport",
    },
    { field: "legs", width: 90, headerName: "Legs" },
    { field: "cost", width: 150, headerName: "Total Cost (in ₹)" },
    { field: "duration", width: 150, headerName: "Duration(mins)" },
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
  const handlePageChange = (params) => {
    setPage(params.page);
  };

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await loadServerRows(page, data);

      if (!active) {
        return;
      }

      setRows(newRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page, data]);

  const [cities, setCities] = React.useState([]);
  const handleSearchQuery = () => {
    const params = {
      arrivalCity: searchArrivalCity,
      departureCity: searchDepartureCity,
      time: searchTime,
    };
    const url =
      "http://localhost:8080/Assignment3_war/queryflight" +
      formatParams(params);
    (async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((res) => {
          res.sort(function (a, b) {
            if (a.time > b.time) return 1;
            else return -1;
          });
          setData(res);
        })
        .catch((err) => console.log(err));
    })();
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
  React.useEffect(() => {
    const params = {
      arrivalCity: searchArrivalCity,
      departureCity: searchDepartureCity,
      time: searchTime,
    };
    const url =
      "http://localhost:8080/Assignment3_war/queryflight" +
      formatParams(params);
    (async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((res) => {
          res.sort(function (a, b) {
            if (a.time > b.time) return 1;
            else return -1;
          });
          setData(res);
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
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">
                  Departure City
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={searchDepartureCity}
                  onChange={(event) =>
                    setSearchDepartureCity(event.target.value)
                  }
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {cities.map((city) => (
                    <MenuItem value={city.city}>{city.city}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">
                  Arrival City
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={searchArrivalCity}
                  onChange={(event) => setSearchArrivalCity(event.target.value)}
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {cities.map((city) => (
                    <MenuItem value={city.city}>{city.city}</MenuItem>
                  ))}
                </Select>
              </FormControl>

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
                    rowCount={data.length}
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
