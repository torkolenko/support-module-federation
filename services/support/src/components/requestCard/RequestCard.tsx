import { useState } from "react";
import styles from "./RequestCard.module.scss";
import { IRequest } from "@/models/IRequest";

interface RequestCardProps {
  request: IRequest;
}

export const RequestCard = ({ request }: RequestCardProps) => {
  const [isDescriptionDetailed, setDescriptionDetailed] =
    useState<boolean>(false);

  const { id, type, description, userName, createdAt, status, image } = request;
  const formatCreatedAt = createdAt
    .split("T")[0]
    .split("-")
    .reverse()
    .join(".");

  const requestValues = Object.entries({
    Номер: id,
    Пользователь: userName,
    Тип: type.name,
    "Прикрепленные файлы": image ? "да" : "нет",
    "Дата создания": formatCreatedAt,
    Статус: status.name,
  });

  let classNames: [string] = [styles["card__option-value"]];

  return (
    <div className={styles.card__container}>
      <div>
        <h2 className={styles["card__description-header"]}>Описание запроса</h2>
        <div className={styles["card__description-content"]}>{description}</div>
      </div>
      {requestValues.map((value) => {
        if (value[0] === "Статус") {
          switch (value[1]) {
            case "В очереди":
              classNames.push(styles.red);
              break;
            case "В работе":
              classNames.push(styles.blue);
              break;
            case "Выполнено":
              classNames.push(styles.green);
              break;
          }
        }

        return (
          <div className={styles["card__option"]}>
            <div className={styles["card__option-property"]}>{value[0]}</div>
            <div className={classNames.join(" ")}>{value[1]}</div>
            <div className={styles["card__points"]}></div>
          </div>
        );
      })}
      <div className={styles["form__submit-btns-container"]}></div>
    </div>
  );
};
