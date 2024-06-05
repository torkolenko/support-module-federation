import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchRequestsThunk,
  fetchStatusesThunk,
  fetchTypesThunk,
} from "@/store/reducers/ActionCreators";
import { useEffect } from "react";

import styles from "./Main.module.scss";
import { NavBar } from "@/components/navBar/NavBar";
import { RequestsTable } from "@/components/table/RequestsTable";

function Main() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRequestsThunk({ limit: 15 }));
    dispatch(fetchTypesThunk());
    dispatch(fetchStatusesThunk());
  }, []);

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
