import React from "react";
import {StyleSheet, css} from "aphrodite";

const styles = StyleSheet.create({
  lane: {
    width: "100%",
    background: "#454545",
    position: "relative",
    height: 10,
  },
});

export default () => {
  const [pos, setPos] = React.useState(0);
  const [taxis, setTaxis] = React.useState([]);
  const [nextTaxi, setNextTaxi] = React.useState(0);

  const requestRef = React.useRef();

  const animate = React.useCallback(
    (time) => {
      setPos(time / 100);
      if (time > nextTaxi) {
        // Add a taxi; remove old ones
        setTaxis(
          taxis
            .concat(time / 100 + 10)
            .filter((taxi) => time / 100 - taxi < 110),
        );
        // Compute time of next taxi
        setNextTaxi(-Math.log(Math.random()) / 0.0005 + time);
      }
      requestRef.current = requestAnimationFrame(animate);
    },
    [taxis, nextTaxi],
  );

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  return (
    <div className={css(styles.lane)}>
      {taxis.map((taxi, i) => (
        <span
          key={i}
          role="img"
          aria-label="taxi"
          style={{position: "absolute", right: `${pos - taxi}%`, bottom: -7}}
        >
          🚕
        </span>
      ))}
    </div>
  );
};
