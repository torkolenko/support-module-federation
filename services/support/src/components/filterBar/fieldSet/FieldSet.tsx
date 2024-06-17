import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { IRequestStatus } from "@/models/IRequestStatus";
import { IRequestType } from "@/models/IRequestType";

import Cross from "@/assets/cross.svg";
import Search from "@/assets/search.svg";
import { useCallback, useState } from "react";

import styles from "./FieldSet.module.scss";
import { setFilterParam } from "@/store/reducers/FilterParamsSlice";

import buttonStyles from "@/components/shared/Button.module.scss";

interface FieldSetProps {
  header: string;
  valuesAray?: string[];
  fieldName: string;
}

export function FieldSet({ header, valuesAray, fieldName }: FieldSetProps) {
  const { types } = useAppSelector((state) => state.typeReducer);
  const { statuses } = useAppSelector((state) => state.statusReducer);
  const dispatch = useAppDispatch();

  const [currentInputValue, setCurrentInputValue] = useState<string>("");

  if (fieldName === "type" || fieldName === "status") {
    valuesAray.push("Любой");
  }

  const handleRadioChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let arrToFind: IRequestType[] | IRequestStatus[];

      if (fieldName === "type") {
        arrToFind = types;
      } else {
        arrToFind = statuses;
      }

      const requestTypeOrStatus = arrToFind.find(
        (obj) => obj.name === e.target.value
      );

      dispatch(setFilterParam({ [`${fieldName}Id`]: requestTypeOrStatus?.id }));
    },
    [setFilterParam, fieldName, types, statuses]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentInputValue(() => e.target.value);
    },
    [setCurrentInputValue]
  );

  const handleInputReset = useCallback(() => {
    setCurrentInputValue(() => "");
    dispatch(setFilterParam({ [fieldName]: undefined }));
  }, [setCurrentInputValue, setFilterParam]);

  const handleInputSubmit = useCallback(() => {
    let newQueryParam: string | undefined = currentInputValue;

    if (currentInputValue === "") {
      newQueryParam = undefined;
    }
    dispatch(setFilterParam({ [fieldName]: newQueryParam }));
  }, [setFilterParam, currentInputValue, fieldName]);

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleInputSubmit();
      }
    },
    [handleInputSubmit]
  );

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        <div>
          <h4 className={styles.legend__header}>{header}</h4>
        </div>
      </legend>
      {(fieldName === "type" || fieldName === "status") &&
        valuesAray.length &&
        valuesAray.map((value) => {
          return (
            <div
              key={value}
              className={styles["fieldset__body-item-container"]}
            >
              <span className={styles["fieldset__body-item"]}>
                <input
                  type="radio"
                  id={value}
                  value={value}
                  name={fieldName}
                  onChange={handleRadioChange}
                  className={styles["fieldset__body-item-radio"]}
                />
                <label
                  htmlFor={value}
                  className={styles["fieldset__body-item-text"]}
                >
                  {value}
                </label>
              </span>
            </div>
          );
        })}
      {(fieldName === "userName" || fieldName === "createdAt") && (
        <div className={styles["fieldset__body-item-container"]}>
          <input
            type={header === "Пользователь" ? "text" : "date"}
            value={currentInputValue}
            name={fieldName}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className={styles["fieldset__body-item-input"]}
          />
          <button
            onClick={handleInputSubmit}
            className={`${buttonStyles["svg-btn"]} ${styles["ml-2"]}`}
            type="button"
          >
            <Search fill="#0a8fdc" height={14} width={14} />
          </button>

          <button
            onClick={handleInputReset}
            className={buttonStyles["svg-btn"]}
            type="reset"
          >
            <Cross fill="#fd1e00" height={10} width={10} />
          </button>
        </div>
      )}
    </fieldset>
  );
}
