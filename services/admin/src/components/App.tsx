import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";

export const App = () => {
  console.log(styles);
  return (
    <div className={styles.div}>
      ADMIN MODULE
      <Outlet />
    </div>
  );
};
