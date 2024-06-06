import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { FieldSet } from "./fieldSet/FieldSet";
import { useEffect, useState } from "react";
import { fetchRequestsThunk } from "@/store/reducers/ActionCreators";

import styles from "./FilterBar.module.scss";

export function FilterBar() {
  const dispatch = useAppDispatch();

  const { types } = useAppSelector((state) => state.typeReducer);
  const { statuses } = useAppSelector((state) => state.statusReducer);
  const { currentPage } = useAppSelector((state) => state.pageReducer.page);

  const typeNames = types.map((type) => type.name);
  const statusNames = statuses.map((status) => status.name);

  const [typeQueryParam, settypeQueryParamParam] = useState<
    number | undefined
  >();
  const [statusQueryParam, setStatusQueryParam] = useState<
    number | undefined
  >();
  const [userNameQueryParam, setUserNameQueryParam] = useState<
    string | undefined
  >();
  const [createdAtQueryParam, setCreatedAtQueryParam] = useState<
    string | undefined
  >();

  useEffect(() => {
    console.log("change");
    dispatch(
      fetchRequestsThunk({
        limit: 13,
        page: currentPage,
        typeId: typeQueryParam,
        statusId: statusQueryParam,
        userName: userNameQueryParam,
        createdAt: createdAtQueryParam,
      })
    );
  }, [
    typeQueryParam,
    statusQueryParam,
    userNameQueryParam,
    createdAtQueryParam,
  ]);

  return (
    <div className={styles.container}>
      <FieldSet
        mode="radio"
        header="Тип обращения"
        valuesAray={typeNames}
        setQueryParam={(value: number | undefined) =>
          settypeQueryParamParam(value)
        }
      />
      <FieldSet
        mode="radio"
        header="Статус обращения"
        valuesAray={statusNames}
        setQueryParam={(value: number | undefined) =>
          setStatusQueryParam(value)
        }
      />
      <FieldSet
        mode="input"
        header="Пользователь"
        setQueryParam={(value: string | undefined) =>
          setUserNameQueryParam(value)
        }
      />
      <FieldSet
        mode="input"
        header="Дата обращения"
        setQueryParam={(value: string | undefined) =>
          setCreatedAtQueryParam(value)
        }
      />
    </div>
  );
}
