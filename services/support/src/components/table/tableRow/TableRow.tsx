import { IRequest } from "@/models/IRequest";
import { TableItem } from "../tableItem/TableItem";

interface TableRowProps {
  request: IRequest;
}

export function TableRow({ request }: TableRowProps) {
  const { id, type, description, userName, createdAt, status } = request;
  const formatCreatedAt = createdAt
    .split("T")[0]
    .split("-")
    .reverse()
    .join(".");

  const requestValuesArr = Object.entries({
    id,
    type: type.name,
    description,
    userName,
    createdAt: formatCreatedAt,
    status: status.name,
  });

  return (
    <tr>
      {requestValuesArr.length &&
        requestValuesArr.map((value) => {
          return <TableItem mode={value[0]} value={value[1]} key={value[0]} />;
        })}
    </tr>
  );
}
