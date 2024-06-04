import RightArrow from "@/assets/rightArrow.svg";
import LeftArrow from "@/assets/leftArrow.svg";
import styles from "./NavBar.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { changeCurrentPage } from "@/store/reducers/PagesSlice";

export function NavBar() {
  const dispatch = useAppDispatch();
  const { currentPage, pagesCount } = useAppSelector(
    (state) => state.pageReducer.page
  );

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__body}>
          <button className={styles["header__body-button"]}>
            Новый запрос
          </button>
          <div className={styles["header__body-pages"]}>
            {currentPage} из {pagesCount}
          </div>
          <div className={styles["header__body-svg-container"]}>
            <LeftArrow
              as="button"
              onClick={() => dispatch(changeCurrentPage(currentPage - 1))}
              width={13}
              height={13}
              className={styles["header__body-svg"]}
            />
            <RightArrow
              as="button"
              onClick={() => dispatch(changeCurrentPage(currentPage + 1))}
              width={13}
              height={13}
              className={styles["header__body-svg"]}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
