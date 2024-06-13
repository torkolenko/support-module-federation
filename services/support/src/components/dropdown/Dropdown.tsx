import { useCallback, useRef, useState } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  liArray: string[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

export const Dropdown = ({
  liArray,
  selectedValue,
  setSelectedValue,
}: DropdownProps) => {
  const buttonRef = useRef(null);

  const [isDropdownListVisible, setDropdownListVisible] =
    useState<boolean>(false);

  const handleDropdownItemClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (e.target instanceof HTMLElement) {
        setSelectedValue(e.target.innerText);
        setDropdownListVisible(false);
        buttonRef.current.focus();
      }
    },
    []
  );

  return (
    <div className={styles.dropdown}>
      <button
        type="button"
        ref={buttonRef}
        className={styles.dropdown__button}
        onClick={() => setDropdownListVisible(!isDropdownListVisible)}
      >
        {selectedValue}
      </button>
      {isDropdownListVisible ? (
        <ul className={styles.dropdown__list}>
          {liArray.map((value) => {
            return (
              <li
                className={styles["dropdown__list-item"]}
                data-value={value}
                onClick={handleDropdownItemClick}
              >
                {value}
              </li>
            );
          })}
        </ul>
      ) : undefined}
    </div>
  );
};
