import React from "react";
import {StyleSheet, css} from "aphrodite";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 150,
  },
  bar: {
    position: "absolute",
    bottom: 0,
  },
});

const BAR_WIDTH = 5;

export default ({taxiArrivals}) => {
  const intervals = taxiArrivals
    .flatMap((arrivals) =>
      arrivals.map((t, i, arr) => (i === 0 ? null : arr[i] - arr[i - 1])),
    )
    .filter((e) => e != null);

  const waitIntervals = taxiArrivals.map(
    (arrivals) =>
      Math.min(...arrivals.filter((t) => t > 50)) -
      Math.max(...arrivals.filter((t) => t <= 50)),
  );
  console.log(waitIntervals);

  const buckets = Array(80)
    .fill()
    .map((_, i) => i);

  const histogramAll = buckets.map(
    (bucket, i) =>
      intervals.filter((int) => int < bucket && int > buckets[i - 1]).length,
  );

  const histogramWait = buckets.map(
    (bucket, i) =>
      waitIntervals.filter((int) => int < bucket && int > buckets[i - 1])
        .length,
  );
  console.log(histogramWait);

  const scaleFactor = 140 / Math.max(...histogramAll);
  const scaleFactorWait = 70 / Math.max(...histogramWait);

  return (
    <div className={css(styles.container)}>
      {histogramAll.map((height, bucket) => (
        <span
          key={bucket}
          className={css(styles.bar)}
          style={{
            background: "#6eb563",
            height: height * scaleFactor,
            width: BAR_WIDTH,
            left: bucket * BAR_WIDTH,
          }}
        ></span>
      ))}

      {histogramWait.map((height, bucket) => (
        <span
          key={bucket}
          className={css(styles.bar)}
          style={{
            background: "#da743a",
            height: height * scaleFactorWait,
            width: BAR_WIDTH,
            left: bucket * BAR_WIDTH,
            opacity: 0.6,
          }}
        ></span>
      ))}
    </div>
  );
};
