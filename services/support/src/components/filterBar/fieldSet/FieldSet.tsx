import { useAppSelector } from "@/hooks/redux";
import { IRequestStatus } from "@/models/IRequestStatus";
import { IRequestType } from "@/models/IRequestType";

import Cross from "@/assets/cross.svg";
import Search from "@/assets/search.svg";
import { useCallback, useState } from "react";

import styles from "./FieldSet.module.scss";

interface FieldSetProps {
  header: string;
  valuesAray?: string[];
  mode: "radio" | "input";
  setQueryParam?: (value: number | string) => void;
}

export function FieldSet({
  mode,
  header,
  valuesAray,
  setQueryParam,
}: FieldSetProps) {
  const { types } = useAppSelector((state) => state.typeReducer);
  const { statuses } = useAppSelector((state) => state.statusReducer);

  const [currentInputValue, setCurrentInputValue] = useState<string>("");

  if (mode === "radio") {
    valuesAray.push("Любой");
  }

  const handleRadioChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let arrToFind: IRequestType[] | IRequestStatus[];

      if (header === "Тип обращения") {
        arrToFind = types;
      } else {
        arrToFind = statuses;
      }

      const requestTypeOrStatus = arrToFind.find(
        (obj) => obj.name === e.target.value
      );

      setQueryParam(requestTypeOrStatus?.id);
    },
    [setQueryParam]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentInputValue(() => e.target.value);
    },
    [setCurrentInputValue]
  );

  const handleInputReset = useCallback(() => {
    setCurrentInputValue(() => "");
    setQueryParam(undefined);
  }, [setCurrentInputValue, setQueryParam]);

  const handleInputSubmit = useCallback(() => {
    let newQueryParam: string | undefined = currentInputValue;

    if (currentInputValue === "") {
      newQueryParam = undefined;
    }
    setQueryParam(newQueryParam);
  }, [setQueryParam, currentInputValue]);

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
      {mode === "radio" &&
        valuesAray.length &&
        valuesAray.map((value) => {
          return (
            <div className={styles["fieldset__body-item-container"]}>
              <span className={styles["fieldset__body-item"]}>
                <input
                  type="radio"
                  id={value}
                  value={value}
                  name={header}
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
      {mode === "input" && (
        <div className={styles["fieldset__body-item-container"]}>
          <input
            type={header === "Пользователь" ? "text" : "date"}
            value={currentInputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className={styles["fieldset__body-item-input"]}
          />
          <button
            onClick={handleInputSubmit}
            className={`${styles["fieldset__body-item-svg-btn"]} ${styles["ml-2"]}`}
          >
            <Search fill="#0a8fdc" height={14} width={14} />
          </button>

          <button
            onClick={handleInputReset}
            className={styles["fieldset__body-item-svg-btn"]}
          >
            <Cross fill="#fd1e00" height={10} width={10} />
          </button>
        </div>
      )}
    </fieldset>
  );
}
