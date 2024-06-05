import { Outlet } from "react-router-dom";
import styles from "./TableLayout.module.scss";

export const TableLayout = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};
