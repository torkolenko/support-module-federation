import { useAppSelector } from "@/hooks/redux";

import styles from "./RequestsTable.module.scss";
import { TableRow } from "@/components/table/tableRow/TableRow";

export function RequestsTable() {
  const { requests } = useAppSelector((state) => state.requestReducer);

  const tableHeaders = [
    "Номер запроса",
    "Тип запроса",
    "Описание",
    "Пользователь",
    "Дата",
    "Статус",
  ];

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles["table__header-container"]}>
            {tableHeaders.map((i) => {
              return <th key={i}>{i}</th>;
            })}
          </tr>
        </thead>
        {requests.length ? (
          <tbody>
            {requests.map((item) => {
              return <TableRow request={item} key={item.id} />;
            })}
          </tbody>
        ) : undefined}
      </table>
    </div>
  );
}
