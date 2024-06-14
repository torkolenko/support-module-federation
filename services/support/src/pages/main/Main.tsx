import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchRequestsThunk,
  fetchStatusesThunk,
  fetchTypesThunk,
} from "@/store/reducers/ActionCreators";
import { useEffect, useState } from "react";

import styles from "./Main.module.scss";
import { NavBar } from "@/components/navBar/NavBar";
import { RequestsTable } from "@/components/table/RequestsTable";
import { FilterBar } from "@/components/filterBar/FilterBar";
import { RequestModal } from "@/components/requestModal/RequestModal";
import { RequestForm } from "@/components/requestForm/RequestForm";

function Main() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(
    (state) => state.requestReducer
  );

  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchRequestsThunk({ limit: 13 }));
    dispatch(fetchTypesThunk());
    dispatch(fetchStatusesThunk());
  }, []);

  return (
    <>
      <div>
        <div className={styles.container}>
          <div className={styles["filter-bar"]}>
            <FilterBar />
          </div>
          <div className={styles.content}>
            <NavBar
              isModalActive={isModalActive}
              openModal={() => setIsModalActive(true)}
            />
            <RequestsTable />
          </div>
        </div>
      </div>
      <RequestModal
        isActive={isModalActive}
        closeModal={() => setIsModalActive(false)}
      >
        <RequestForm closeModal={() => setIsModalActive(false)} />
      </RequestModal>
    </>
  );
}

export default Main;
