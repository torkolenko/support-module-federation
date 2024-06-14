import { Link } from "react-router-dom";
import styles from "./Page404.module.scss";

function Page404() {
  return (
    <div className={styles.page404}>
      <h1 className={styles.page404__header}>404</h1>
      <p className={styles.page404__content}>
        Страница, которую вы ищете могла быть удалена
      </p>
      <Link to="/support" className={styles.page404__link}>
        Вернуться в SupportApp
      </Link>
    </div>
  );
}

export default Page404;
