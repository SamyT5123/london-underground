import React from "react";
import { ReactDOM } from "react";
import { useState, useEffect } from "react";
import "../api.css";

export function TfLJourneyPlanner() {
  const [from, setFrom] = useState("");
  const [destination, setDestination] = useState("");
  const [journeys, setJourneys] = useState([]);
  const [stopPoints, setStopPoints] = useState([]);
  const [fare, setFare] = useState();
  const [arrival, journeyArrives] = useState("");
  const [departure, journeyDeparts] = useState("");
  const [lines, setLines] = useState("");
  const [legs, setLegs] = useState([]);
  const [legArrivals, setLegArrivals] = useState([]);

 

  function getJourney() {
    fetch(
      `https://api.tfl.gov.uk/Journey/JourneyResults/${from}/to/${destination}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("journeys", data.journeys[0]);

        setLegs(data.journeys[0].legs);
        console.log(legs);

      setLegArrivals(legs.map((leg) => leg.arrivalPoint.commonName));

        
        console.log(legArrivals);

        setLines(data.journeys[0].legs[0].routeOptions[0].name);
        console.log(lines);

        setJourneys(data.journeys[0]);

        let fareTotal = data.journeys[0].fare.totalCost;
        let total = fareTotal / 100;
        setFare(total.toFixed(2));

        let arrives = data.journeys[0].arrivalDateTime.slice(11, 16);
        journeyArrives(arrives);

        let departs = data.journeys[0].startDateTime.slice(11, 16);
        journeyDeparts(departs);

          
      });
  }

  useEffect(() => {
    
    fetch(`https://api.tfl.gov.uk/StopPoint/Mode/tube`)
      .then((response) => response.json())
      .then((data) => {
        const stationNames = data.stopPoints.map((station) => {
          return station.commonName;
        });

        setStopPoints(Array.from(new Set(stationNames)));
      });
  }, []);

  return (
    <div className="container">
      <select
        type="text"
        className="select1"
        value={from}
        onChange={(event) => setFrom(event.target.value)}
      >
        <option value="">Start of journey</option>

        {stopPoints.map((station) => (
          <option key={station}>{station}</option>
        ))}
      </select>

      <p>===</p>

      <select
        type="text"
        className="select2"
        value={destination}
        onChange={(event) => setDestination(event.target.value)}
      >
        <option>End of Journey</option>

        {stopPoints.map((station) => (
          <option key={station}>{station}</option>
        ))}
      </select>

      <button className="submitBtn" onClick={getJourney}>
        Find journey
      </button>

      <div className="resultsContainer">
        {departure ? (
          <h3>
            <strong>Result</strong>
          </h3>
        ) : (
          ""
        )}

        {departure ? (
          <p>
            <strong>Departs: </strong>
            {departure}
          </p>
        ) : (
          ""
        )}

        {arrival ? (
          <p>
            <strong>Arrives: </strong>
            {arrival}
          </p>
        ) : (
          ""
        )}

        {journeys.duration ? (
          <p>
            <strong>Duration: </strong>
            {journeys.duration} Mins
          </p>
        ) : (
          ""
        )}

        {fare ? (
          <p>
            <strong>Fare: </strong>£{fare}
          </p>
        ) : (
          ""
        )}

        <div className="legContainer">
          {arrival ? <h3>Details</h3> : ""}
          <div className="routeLine">
            {/* This section updates the color of the line based on the lines state variable value */}
            <div
              className="lineImage"
              style={{
                backgroundColor:
                  lines === "Central"
                    ? "#E32017"
                    : lines === "Bakerloo"
                    ? "#B36305"
                    : lines === "Metropolitan"
                    ? "#9B0056"
                    : lines === "Piccadilly"
                    ? "#003688"
                    : lines === "Northern"
                    ? "#000000"
                    : lines === "District"
                    ? "#00782A"
                    : lines === "Jubilee"
                    ? "#A0A5A9"
                    : lines === "Victoria"
                    ? "#0098D4"
                    : lines === "Circle"
                    ? "#FFD300	"
                    : lines === "Elizabeth"
                    ? "#6950a1"
                    : lines === "Hammersmith & City"
                    ? "#F3A9BB"
                    : lines === "Waterloo & City"
                    ? "#95CDBA"
                    : lines === "Chiltern Railways"
                    ? "rgba(0, 0, 0, 0.5)"
                    : null,
              }}
            >
              {lines ? <p style={{}}>{lines} line</p> : ""}
            </div>
            

            {/* This section maps through the different stops of a route leg, and displays it */}
            <div className="legArrivals">
              {legArrivals.map((arrival) => (
                <div key={arrival}>
                  <li>{arrival}</li>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
