import React from "react";
import { ReactDOM } from "react";
import { useState, useEffect } from "react";
import "../api.css";
import logo from "../logoTFL.svg";

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
  const [stops, setStops] = useState([]);

  function getJourney() {
    fetch(
      `https://api.tfl.gov.uk/Journey/JourneyResults/${from}/to/${destination}`
    )
      .then((response) => response.json())
      .then((data) => {
        setJourneys(data.journeys);
        // console.log(journeys)

        setStops(data.journeys[0].legs[0].path.stopPoints);

        setLegs(data.journeys[0].legs);

        for (let i = 0; i < journeys.length; i++) {
          console.log(journeys[i].legs[i].path);
        }

        setLines(data.journeys[0].legs[0].routeOptions[0].name);
        // console.log(lines);

        let fareTotal = data.journeys[0].fare.totalCost;
        let total = fareTotal / 100;
        setFare(total.toFixed(2));

        let arrives = data.journeys[0].arrivalDateTime.slice(11, 16);
        journeyArrives(arrives);

        let departs = data.journeys[0].startDateTime.slice(11, 16);
        journeyDeparts(departs);
      });
  }

  // for(let i = 0; i<journeys.length; i++){
  //   console.log(journeys[i].legs[i].arrivalPoint.commonName)
  // }

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

  useEffect(() => {
    setLegArrivals(legs.map((leg) => leg.arrivalPoint.commonName));
  }, [legs]);

  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="logo" className="logo" />
      </div>

      {/* Start of journey form  */}
      <div className="journeyContainer">
        <h2>Plan a journey</h2>
        <form>
          <label>From:</label>
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

          <label>To:</label>
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

          <button className="submitBtn" onClick={getJourney} type="button">
            Find journey
          </button>
        </form>
      </div>
      {/* End of Journey form  */}

      {/* Start of results list  */}
      <div
        className="resultsContainer"
        style={{
          backgroundColor: departure ? "white" : null,
        }}
      >
        {/* Line Tag  */}
        <div
          className="lineTag"
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
                ? "#FFD300"
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
          {lines ? <span>{lines} line</span> : ""}
        </div>

        {journeys.map((journey) => (
          <div className="journeyResults">
            <div className="journey">
              <div className="left">{journey.startDateTime.slice(11, 16)}</div>
              <div className="middle">
                <hr
                  style={{
                    color:
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
                        ? "#FFD300"
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
                />
                <div
                  className="lineImage"
                  style={{
                    borderColor:
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
                        ? "#FFD300"
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
                  {lines ? <span>{journey.duration} Mins</span> : ""}
                </div>

                <hr
                  style={{
                    color:
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
                        ? "#FFD300"
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
                />
              </div>

              <div className="right">
                {journey.arrivalDateTime.slice(11, 16)}
              </div>
            </div>

            <div className="fare">{lines ? <span>£{fare}</span> : ""}</div>
            <div className="legContainer">
              <div className="routeLine">
                {/* This section updates the color of the line based on the lines state variable value */}

                {/* This section maps through the different stops of a route leg, and displays it */}

                {arrival ? <h3>Change at</h3> : ""}

                <div className="legArrivals">
                  {legs.map((leg) => {
                    console.log(leg.arrivalPoint.commonName);
                    const arrivalPoint = leg.arrivalPoint.commonName;
                    const stopPoints = leg.path.stopPoints;
                    return (
                      <div key={arrivalPoint}>
                        {stopPoints.map((stop, i) => {
                          console.log("stopXYZ", stop);
                          if (stop.name !== arrivalPoint) {
                            return <li key={i}>{stop.name}</li>;
                          } else {
                            return;
                          }
                        })}
                        <li>
                          <b>{arrivalPoint}</b>
                        </li>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
