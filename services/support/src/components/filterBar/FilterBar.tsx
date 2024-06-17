import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { FieldSet } from "./fieldSet/FieldSet";
import { useEffect, useRef, useState } from "react";
import { fetchRequestsThunk } from "@/store/reducers/ActionCreators";

import styles from "./FilterBar.module.scss";
import { setCurrentPage } from "@/store/reducers/PagesSlice";

export function FilterBar() {
  const dispatch = useAppDispatch();
  const firstRender = useRef(false);

  const { types } = useAppSelector((state) => state.typeReducer);
  const { statuses } = useAppSelector((state) => state.statusReducer);

  const typeNames = types.map((type) => type.name);
  const statusNames = statuses.map((status) => status.name);

  const {
    typeId: typeQueryParam,
    statusId: statusQueryParam,
    userName: userNameQueryParam,
    createdAt: createdAtQueryParam,
  } = useAppSelector((state) => state.filterParamReducer.params);

  useEffect(() => {
    if (!firstRender.current) {
      firstRender.current = true;
    } else {
      dispatch(
        fetchRequestsThunk({
          limit: 13,
          page: 1,
          typeId: typeQueryParam,
          statusId: statusQueryParam,
          userName: userNameQueryParam,
          createdAt: createdAtQueryParam,
        })
      );
    }
  }, [
    typeQueryParam,
    statusQueryParam,
    userNameQueryParam,
    createdAtQueryParam,
  ]);

  useEffect(() => {
    return () => {
      firstRender.current = null;
    };
  }, []);

  return (
    <div className={styles.container}>
      <FieldSet
        header="Тип обращения"
        valuesAray={typeNames}
        fieldName="type"
      />
      <FieldSet
        header="Статус обращения"
        valuesAray={statusNames}
        fieldName="status"
      />
      <FieldSet header="Пользователь" fieldName="userName" />
      <FieldSet header="Дата обращения" fieldName="createdAt" />
    </div>
  );
}
