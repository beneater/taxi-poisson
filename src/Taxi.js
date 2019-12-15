import React from "react";
import {StyleSheet, css} from "aphrodite";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    fontSize: 12,
    fontFamily: "inconsolata",
    fontWeight: 500,
    fontStyle: "normal",
  },
  lane: {
    width: "100%",
    position: "relative",
    borderBottom: "1px solid #eee",
    overflow: "hidden",
  },
  stats: {
    width: 70,
    paddingLeft: 5,
    paddingRight: 20,
    textAlign: "right",
  },
});

export default ({arrivals}) => {
  const avgRate =
    (Math.max(...arrivals) - Math.min(...arrivals)) / (arrivals.length - 1);

  const missTime = Math.min(...arrivals.filter((t) => t > 50));
  const nextTime = Math.max(...arrivals.filter((t) => t <= 50));

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.lane)}>
        {arrivals.map((taxi, i) => (
          <span
            key={i}
            role="img"
            aria-label="taxi"
            style={{
              position: "absolute",
              right: `${taxi}%`,
              opacity: taxi === missTime || taxi === nextTime ? 1 : 0.4,
              width: 7,
            }}
          >
            🚕
          </span>
        ))}
        <span
          // Center line
          style={{
            position: "absolute",
            left: "50%",
            borderLeft: "1px solid #ddd",
          }}
        >
          &nbsp;
        </span>

        <span
          // Left shading
          style={{
            position: "absolute",
            right: "50%",
            left: `${100 - missTime}%`,
            background: "#558cf4",
            opacity: 0.2,
            bottom: "40%",
            top: "40%",
          }}
        >
          &nbsp;
        </span>

        <span
          // Right shading
          style={{
            position: "absolute",
            left: "50%",
            right: `${nextTime}%`,
            background: "#c13c3d",
            opacity: 0.2,
            bottom: "40%",
            top: "40%",
          }}
        >
          &nbsp;
        </span>
      </div>
      <div className={css(styles.stats)}>{avgRate.toFixed(3)}</div>
      <div className={css(styles.stats)}>
        {(missTime - nextTime).toFixed(3)}
      </div>
    </div>
  );
};
