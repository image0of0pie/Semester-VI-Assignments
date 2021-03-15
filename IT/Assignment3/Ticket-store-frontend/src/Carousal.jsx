import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import sale from "./sale.png";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
}));

function SwipeableTextMobileStepper() {
  const [deals, setDeals] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = deals.length;
  React.useEffect(() => {
    (async () => {
      fetch("http://localhost:8080/Assignment3_war/deals")
        .then((response) => response.json())
        .then((data) => {
          setDeals(data);
        })
        .catch((err) => console.log(err));
    })();
  }, [deals]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep + 1 < deals.length ? prevActiveStep + 1 : 0
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep - 1 >= 0 ? prevActiveStep - 1 : deals.length - 1
    );
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {deals.map((step, index) => (
          <div
            style={{
              background: `url(${sale})`,
              height: 260,
              backgroundSize: 265,
              backgroundColor: "white",
              backgroundRepeat: 0,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 40,
                color: "#5555ff",
                fontWeight: "bold",
              }}
            >
              <span>
                {step.departureCity} ✈ {step.arrivalCity}
              </span>
              <span style={{ fontSize: 25 }}> 🕗 {step.time}</span>
            </div>
            <div
              style={{
                fontSize: 85,
                color: "#55ff55",
                fontWeight: "bold",
                paddingTop: 20,
              }}
            >
              Flat {step.perc} Off
              <p style={{ fontSize: 35, color: "blue" }}>(upto {step.cash})</p>
            </div>
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext}>
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
}

export default SwipeableTextMobileStepper;
