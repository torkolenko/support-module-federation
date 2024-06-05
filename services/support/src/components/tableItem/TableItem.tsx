import styles from "./TableItem.module.scss";

interface TableItemProps {
  value: string | number;
  mode: string;
  //mode: "id" | "type" | "description" | "userName" | "createdAt" | "status";
}

export function TableItem({ value, mode }: TableItemProps) {
  let classNames: [string] = [styles.item];

  if (mode === "type") {
    switch (value) {
      case "Ошибка":
        classNames.push(styles.red);
        break;
      case "Новая функциональность":
        classNames.push(styles.green);
        break;
      case "Улучшение":
        classNames.push(styles.green);
        break;
      case "Документация":
        classNames.push(styles.blue);
        break;
    }
  }
  console.log(mode, " + ", value, "+", classNames);
  if (mode === "status") {
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

  return <td className={classNames.join(" ")}>{value}</td>;
}
