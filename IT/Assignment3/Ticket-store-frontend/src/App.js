import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import StoreIcon from "@material-ui/icons/Store";
import Carousal from "./Carousal";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { DataGrid } from "@material-ui/data-grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CityList from "./CityList";
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
      resolve(data.slice(page * 5, (page + 1) * 5));
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
    { field: "time", width: 110, headerName: "Time" },
    { field: "arrivalCity", width: 150, headerName: "Arrival City" },
    { field: "departureCity", width: 150, headerName: "Departure City" },
    { field: "legs", width: 90, headerName: "Legs" },
    { field: "cost", width: 120, headerName: "Total Cost" },
    { field: "duration", width: 110, headerName: "Duration" },
  ];
  const timeList = [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
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
      fetch(url)
        .then((response) => response.json())
        .then((res) => {
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
          data.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            } else {
              return -1;
            }
          });
          setCities(data);
        })
        .catch((err) => console.log(err));
    })();
  }, [cities]);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AppBar position="static" color="secondary">
            <Toolbar variant="dense">
              <StoreIcon color="inherit" fontSize="large" />
              <Typography variant="h5" color="inherit">
                Ticket Store
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={3}>
          <CityList cities={cities} />
        </Grid>
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <Carousal />
            <Grid item xs={12}></Grid>
            <Grid item xs={12} style={{ marginTop: 70 }}>
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
                    <em>None</em>
                  </MenuItem>
                  {cities.map((city) => (
                    <MenuItem value={city.name}>{city.name}</MenuItem>
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
                    <em>None</em>
                  </MenuItem>
                  {cities.map((city) => (
                    <MenuItem value={city.name}>{city.name}</MenuItem>
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
                    <em>None</em>
                  </MenuItem>
                  {timeList.map((time) => (
                    <MenuItem value={time}>{time}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                className={classes.formControlButton}
                onClick={() => handleSearchQuery()}
              >
                Search
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pagination
                    pageSize={5}
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
      </Grid>
    </div>
  );
}
