import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Paper } from "@material-ui/core";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
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
  const [expanded, setExpanded] = React.useState(false);
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
  }, []);

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
      {!expanded ? (
        <div>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {deals.map((step, index) => (
              <div
                style={{
                  height: 260,
                  backgroundColor: "#eaeaff",
                  flexDirection: "column",
                  width: "100%",
                  flex: 1,
                  justifyContent: "space-evenly",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    paddingTop: 10,
                    fontSize: 25,
                    color: "#5555ff",
                    fontWeight: "bold",
                  }}
                >
                  <span>
                    {step.departureCity} ✈ {step.arrivalCity}
                  </span>
                  <span style={{ fontSize: 20 }}> 🕗 {step.time}</span>
                </div>
                <div
                  style={{
                    fontSize: 55,
                    color: "#55ff55",
                    fontWeight: "bold",
                    paddingTop: 10,
                  }}
                >
                  Flat {step.perc}% Off
                  <p style={{ fontSize: 20, color: "blue" }}>
                    Upto ₹ {step.cash}{" "}
                    <span style={{ fontSize: 14, color: "red" }}>
                      (Valid Till {step.expiresAt.slice(0, 10)}{" "}
                      {step.expiresAt.slice(11, 16)})
                    </span>
                  </p>
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
      ) : null}
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>View Full List</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.root} style={{ padding: 5 }}>
            {deals.map((step, index) => (
              <Paper>
                <div
                  style={{
                    backgroundColor: "#eaeaff",
                    width: "100%",
                    flex: 1,
                    marginTop: 5,
                    paddingTop: 5,
                    paddingBottom: 5,
                    textAlign: "center",
                    borderRadius: 5,
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      color: "#5555ff",
                      fontWeight: "bold",
                    }}
                  >
                    <span>
                      {step.departureCity} ✈ {step.arrivalCity}
                    </span>
                    <span style={{ fontSize: 20 }}> 🕗 {step.time}</span>
                  </div>
                  <div
                    style={{
                      fontSize: 30,
                      color: "#55ff55",
                      fontWeight: "bold",
                      paddingTop: 10,
                    }}
                  >
                    Flat {step.perc}% Off
                    <p style={{ fontSize: 20, color: "blue" }}>
                      Upto ₹ {step.cash}{" "}
                      <span style={{ fontSize: 14, color: "red" }}>
                        (Valid Till {step.expiresAt.slice(0, 10)}{" "}
                        {step.expiresAt.slice(11, 16)})
                      </span>
                    </p>
                  </div>
                </div>
              </Paper>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default SwipeableTextMobileStepper;
