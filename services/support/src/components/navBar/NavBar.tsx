import RightArrow from "@/assets/rightArrow.svg";
import LeftArrow from "@/assets/leftArrow.svg";
import styles from "./NavBar.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchRequestsThunk } from "@/store/reducers/ActionCreators";
import buttonStyles from "@/components/shared/Button.module.scss";

interface NavBarProps {
  isModalActive: boolean;
  openModal: () => void;
}

export function NavBar({ openModal }: NavBarProps) {
  const dispatch = useAppDispatch();
  const { pagesCount, currentPage } = useAppSelector(
    (state) => state.pageReducer.page
  );
  const { isFiltering } = useAppSelector((state) => state.filterParamReducer);

  const filteredParams = useAppSelector(
    (state) => state.filterParamReducer.params
  );

  const changeCurrentPage = async (
    callback: (currentPage: number) => number
  ) => {
    let newPage = callback(currentPage);

    if (isFiltering) {
      newPage = 1;
    }

    await dispatch(
      fetchRequestsThunk({ limit: 13, page: newPage, ...filteredParams })
    );
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
            onClick={() => openModal()}
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
