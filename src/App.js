import React from "react";
import {Button} from "react-bootstrap";
import {StyleSheet, css} from "aphrodite";

import TaxiAnimation from "./TaxiAnimation";
import Taxi from "./Taxi";
import {relative} from "path";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#282c34",
    minHeight: "10vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
    overflow: "hidden",
  },
  simHeader: {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: 12,
    fontFamily: "inconsolata",
    fontWeight: 500,
    fontStyle: "normal",
  },
  stats: {
    width: 70,
    paddingLeft: 5,
    paddingRight: 20,
    textAlign: "right",
  },
});

const generateArrivals = (arrivals) => {
  const lastArrival = Math.max(-100, ...arrivals);

  const nextArrival = lastArrival + -Math.log(Math.random()) / 0.1;

  if (nextArrival > 100 && arrivals.length) {
    return arrivals.concat(nextArrival);
  } else {
    return generateArrivals(arrivals.concat(nextArrival));
  }
};

function App() {
  const [taxiArrivals, setTaxiArrivals] = React.useState(
    Array(10)
      .fill()
      .map((_) => generateArrivals([])),
  );

  const missTimes = taxiArrivals.map(
    (arrivals) => Math.min(...arrivals.filter((t) => t > 50)) - 50,
  );
  const nextTimes = taxiArrivals.map(
    (arrivals) => 50 - Math.max(...arrivals.filter((t) => t <= 50)),
  );
  const intervalTimes = taxiArrivals.map(
    (arrivals) =>
      Math.min(...arrivals.filter((t) => t > 50)) -
      Math.max(...arrivals.filter((t) => t <= 50)),
  );

  return (
    <div>
      <header className={css(styles.header)}>
        <span role="img" aria-label="person">
          🙋
        </span>{" "}
        <TaxiAnimation />
      </header>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <p style={{margin: 20}}>
              <Button
                onClick={() => {
                  setTaxiArrivals(
                    Array(100)
                      .fill()
                      .map((_) => generateArrivals([])),
                  );
                }}
              >
                Simulate 100
              </Button>
            </p>
            <p style={{margin: 20}}>
              <Button
                onClick={() => {
                  setTaxiArrivals(
                    Array(1000)
                      .fill()
                      .map((_) => generateArrivals([])),
                  );
                }}
              >
                Simulate 1000
              </Button>
            </p>
          </div>

          <div className="col-9">
            <table style={{margin: 20}}>
              <tbody>
                <tr>
                  <td>Average wait time:</td>
                  <td style={{color: "#c13c3d"}}>
                    {(
                      nextTimes.reduce((sum, t) => sum + t, 0) /
                      missTimes.length
                    ).toFixed(3)}
                  </td>
                </tr>
                <tr>
                  <td>Average miss time:</td>
                  <td style={{color: "#558cf4"}}>
                    {(
                      missTimes.reduce((sum, t) => sum + t, 0) /
                      missTimes.length
                    ).toFixed(3)}
                  </td>
                </tr>
                <tr>
                  <td>Average inter-arrival time:</td>
                  <td>
                    {(
                      taxiArrivals
                        .map(
                          (arrivals) =>
                            (Math.max(...arrivals) - Math.min(...arrivals)) /
                            (arrivals.length - 1),
                        )
                        .reduce((sum, t) => sum + t, 0) / taxiArrivals.length
                    ).toFixed(3)}
                  </td>
                </tr>
                <tr>
                  <td width={220}>Average interval while waiting:</td>
                  <td>
                    {(
                      intervalTimes.reduce((sum, t) => sum + t, 0) /
                      intervalTimes.length
                    ).toFixed(3)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={css(styles.simHeader)}>
        <div></div>
        <div className={css(styles.stats)}>Avg interval</div>
        <div className={css(styles.stats)}>My interval</div>
      </div>
      {taxiArrivals.map((arrivals, i) => (
        <Taxi key={i} arrivals={arrivals} />
      ))}
    </div>
  );
}

export default App;
