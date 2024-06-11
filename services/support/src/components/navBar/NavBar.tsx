import RightArrow from "@/assets/rightArrow.svg";
import LeftArrow from "@/assets/leftArrow.svg";
import styles from "./NavBar.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setCurrentPage } from "@/store/reducers/PagesSlice";
import { fetchRequestsThunk } from "@/store/reducers/ActionCreators";
import buttonStyles from "@/components/shared/Button.module.scss";

interface NavBarProps {
  isModalActive: boolean;
  setIsModalActive: (isActive: boolean) => void;
}

export function NavBar({ setIsModalActive }: NavBarProps) {
  const dispatch = useAppDispatch();
  const { pagesCount, currentPage } = useAppSelector(
    (state) => state.pageReducer.page
  );

  const filteredParams = useAppSelector(
    (state) => state.filterParamReducer.params
  );

  const changeCurrentPage = async (
    callback: (currentPage: number) => number
  ) => {
    const newPage = callback(currentPage);

    await dispatch(
      fetchRequestsThunk({ limit: 13, page: newPage, ...filteredParams })
    );

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
          <button
            className={buttonStyles.button}
            style={{ marginRight: "23px" }}
            onClick={() => setIsModalActive(true)}
          >
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
