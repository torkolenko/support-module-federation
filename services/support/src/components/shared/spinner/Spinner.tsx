import styles from "./Spinner.module.scss";

interface SpinnerProps {
  color?: string;
  diameterInPx?: number;
  thiknessInPx?: number;
}

export const Spinner = ({
  color = "#0a8fdc",
  diameterInPx = 44,
  thiknessInPx = 4,
}: SpinnerProps) => {
  return (
    <div
      className={styles.spinner}
      style={{
        borderColor: color,
        borderTopColor: "transparent",
        height: diameterInPx,
        width: diameterInPx,
        borderWidth: thiknessInPx,
      }}
    ></div>
  );
};
