import styles from "./Main.module.scss";
import { NavBar } from "@/components/navBar/NavBar";
import { RequestsTable } from "@/components/table/RequestsTable";

function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <NavBar />
        <RequestsTable />
      </div>
    </div>
  );
}

export default Main;
