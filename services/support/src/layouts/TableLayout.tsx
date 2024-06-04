import { NavBar } from "@/components/navBar/NavBar";
import { Outlet } from "react-router-dom";
import styles from "./TableLayout.module.scss";

export const TableLayout = () => {
  return (
    <div className={styles.wrapper}>
      <NavBar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
