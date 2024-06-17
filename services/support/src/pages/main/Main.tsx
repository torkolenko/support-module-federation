import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchRequestsThunk,
  fetchStatusesThunk,
  fetchTypesThunk,
} from "@/store/reducers/ActionCreators";
import { useEffect, useRef, useState } from "react";

import styles from "./Main.module.scss";
import { NavBar } from "@/components/navBar/NavBar";
import { RequestsTable } from "@/components/table/RequestsTable";
import { FilterBar } from "@/components/filterBar/FilterBar";
import { RequestModal } from "@/components/requestModal/RequestModal";
import { RequestForm } from "@/components/requestForm/RequestForm";
import { Spinner } from "@/components/shared/spinner/Spinner";
import Danger from "@/assets/danger.svg";
import buttonStyles from "@/components/shared/Button.module.scss";

function Main() {
  const dispatch = useAppDispatch();
  const { error: typesError } = useAppSelector((state) => state.typeReducer);
  const { error: statusesError } = useAppSelector(
    (state) => state.statusReducer
  );
  const { error: requestError } = useAppSelector(
    (state) => state.requestReducer
  );

  const firstRender = useRef(false);
  let isFirstLoadError = false;

  if (firstRender.current) {
    console.log(firstRender.current);
    isFirstLoadError = !!requestError || !!statusesError || !!typesError;
    firstRender.current = false;
  }

  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [isDataLoading, setDataLoading] = useState<boolean>(true);

  const setFirstState = async () => {
    setDataLoading(true);
    await Promise.all([
      dispatch(fetchRequestsThunk({ limit: 13 })),
      dispatch(fetchTypesThunk()),
      dispatch(fetchStatusesThunk()),
    ]);
    setDataLoading(false);
    firstRender.current = true;
  };

  useEffect(() => {
    setFirstState();
  }, []);
  console.log("render");

  if (isDataLoading) {
    return (
      <div className={styles.spinner__container}>
        <Spinner />
      </div>
    );
  }

  if (isFirstLoadError) {
    return (
      <div className={styles.spinner__container}>
        <div className={styles["error-content__container"]}>
          <Danger
            width={70}
            height={70}
            fill={"#fd1e00"}
            className={styles["mb-10"]}
          />
          <span className={styles["mb-10"]}>
            Упс... Произошла ошибка отображения страницы
          </span>
          <button
            className={buttonStyles.button}
            onClick={() => setFirstState()}
          >
            Обновить
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
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
