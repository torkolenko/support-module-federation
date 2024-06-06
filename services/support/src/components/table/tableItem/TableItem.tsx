import styles from "./TableItem.module.scss";

interface TableItemProps {
  value: string | number;
  mode: string;
  //mode: "id" | "type" | "description" | "userName" | "createdAt" | "status";
}

export function TableItem({ value, mode }: TableItemProps) {
  let classNames: [string] = [styles.table__item];

  if (mode === "type") {
    classNames.push(styles["d-inline"]);

    switch (value) {
      case "Ошибка":
        classNames.push(styles.red);
        break;
      case "Новая функциональность":
        classNames.push(styles.green);
        classNames.push(styles["w-100"]);
        break;
      case "Улучшение":
        classNames.push(styles.green);
        break;
      case "Документация":
        classNames.push(styles.blue);
        break;
    }
  }

  if (mode === "status") {
    classNames.push(styles["d-inline"]);

    switch (value) {
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
    <td>
      <div className={classNames.join(" ")}>{value}</div>
    </td>
  );
}
