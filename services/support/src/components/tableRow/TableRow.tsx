import { IRequest } from "@/models/IRequest";

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

  const itemArr = Object.values({
    id,
    type: type.name,
    description,
    userName,
    createdAt: formatCreatedAt,
    status: status.name,
  });

  return (
    <tr>
      {itemArr.length &&
        itemArr.map((item) => {
          return <td key={item}>{item}</td>;
        })}
    </tr>
  );
}
