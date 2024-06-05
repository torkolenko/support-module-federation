import styles from "./Main.module.scss";
import { NavBar } from "@/components/navBar/NavBar";
import { RequestsTable } from "@/components/table/RequestsTable";

function Main() {
  return (
    <div className={styles.container}>
      <NavBar />
      <RequestsTable />
    </div>
  );
}

export default Main;
