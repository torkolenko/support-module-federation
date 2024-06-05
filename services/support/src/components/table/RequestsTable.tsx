import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchRequestsThunk,
  fetchStatusesThunk,
  fetchTypesThunk,
} from "@/store/reducers/ActionCreators";
import { useEffect } from "react";
import styles from "./RequestsTable.module.scss";
import { TableRow } from "@/components/tableRow/TableRow";

export function RequestsTable() {
  const dispatch = useAppDispatch();
  const { requests, isLoading, error } = useAppSelector(
    (state) => state.requestReducer
  );

  useEffect(() => {
    dispatch(fetchRequestsThunk({}));
    dispatch(fetchTypesThunk());
    dispatch(fetchStatusesThunk());
  }, []);

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
      {requests.length && (
        <table className={styles.table}>
          <thead>
            <tr className={styles.table__container}>
              {tableHeaders.map((i) => {
                return <th>{i}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {requests.map((item) => {
              return <TableRow request={item} key={item.id} />;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
