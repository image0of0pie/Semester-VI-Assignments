import React from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
const Calculator = () => {
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");
  const [res, setRes] = React.useState(0);
  return (
    <div style={{ marginTop: 100 }}>
      <Grid container spacing={3}>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <Paper>
            <TextField
              id="outlined-basic"
              label="First Number"
              variant="outlined"
              value={a}
              onChange={(e) => setA(e.target.value)}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <TextField
              id="outlined-basic"
              label="Second Number"
              variant="outlined"
              value={b}
              onChange={(e) => setB(e.target.value)}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <TextField
              label="Result"
              id="standard-disabled"
              variant="outlined"
              value={res}
            />
          </Paper>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setRes(a + b)}
          >
            +
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setRes(a - b)}
          >
            -
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setRes(a * b)}
          >
            x
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              setRes(a / b);
            }}
          >
            /
          </Button>
        </Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => {
              setA("");
              setB("");
              setRes(0);
            }}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export default Calculator;
