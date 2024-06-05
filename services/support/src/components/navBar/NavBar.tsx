import RightArrow from "@/assets/rightArrow.svg";
import LeftArrow from "@/assets/leftArrow.svg";
import styles from "./NavBar.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { setCurrentPage } from "@/store/reducers/PagesSlice";
import { fetchRequestsThunk } from "@/store/reducers/ActionCreators";

export function NavBar() {
  const dispatch = useAppDispatch();
  const { onePageRequestsLimit, requestsCount, currentPage } = useAppSelector(
    (state) => state.pageReducer.page
  );

  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    setPagesCount(Math.ceil(requestsCount / 15));
  }, [requestsCount, setPagesCount]);

  const changeCurrentPage = async (
    callback: (currentPage: number) => number
  ) => {
    const newPage = callback(currentPage);

    await dispatch(fetchRequestsThunk({ limit: 15, page: newPage }));

    dispatch(setCurrentPage(newPage));
  };

  let isDisabledRight = false;
  let isDisabledLeft = false;

  if (currentPage === 1) {
    isDisabledLeft = true;
  }

  if (currentPage === pagesCount) {
    isDisabledRight = true;
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__body}>
          <button className={styles["header__body-post-button"]}>
            Новый запрос
          </button>
          <div className={styles["header__body-pages"]}>
            {currentPage} из {pagesCount}
          </div>
          <div className={styles["header__body-svg-btns-container"]}>
            <button
              disabled={isDisabledLeft}
              onClick={() => {
                changeCurrentPage((currentPage: number) => --currentPage);
              }}
              className={styles["header__body-svg-button"]}
            >
              <LeftArrow
                width={14}
                height={14}
                fill="#6B7280"
                className={styles["header__body-svg"]}
              />
            </button>

            <button
              disabled={isDisabledRight}
              onClick={() => {
                changeCurrentPage((currentPage: number) => ++currentPage);
              }}
              className={styles["header__body-svg-button"]}
            >
              <RightArrow
                width={14}
                height={14}
                fill="#6B7280"
                className={styles["header__body-svg"]}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
