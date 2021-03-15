import React from "react";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";

export default function CityList({ cities }) {
  return (
    <Accordion style={{ marginLeft: 15 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        aria-expanded={true}
        id="panel1a-header"
      >
        <Typography variant="subtitle1" style={{ color: "primary" }}>
          Cities
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div
          style={{
            marginLeft: 15,
            overflow: "auto",
            justifyContent: "center",
            width: "100%",
            height: 550,
          }}
        >
          {cities.map((city) => (
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{ color: "#0000ff" }}
            >
              {city.name}
            </Typography>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
