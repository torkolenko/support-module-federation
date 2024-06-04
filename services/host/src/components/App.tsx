import { Link, Outlet } from "react-router-dom";
import styles from "@/components/App.module.scss";

export const App = () => {
  return (
    <div>
      <div className={styles.zindex}>
        <Link to={"/support"}>Support</Link>
        <br />
        <Link to={"/admin"}>Admin</Link>
      </div>
      <br />
      <Outlet />
    </div>
  );
};
