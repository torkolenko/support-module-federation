import { IRequest } from "@/models/IRequest";
import { TableItem } from "../tableItem/TableItem";
import styles from "./TableRow.module.scss";
import { useEffect, useRef, useState } from "react";
import { RequestCard } from "@/components/requestCard/RequestCard";
import { RequestModal } from "@/components/requestModal/RequestModal";
import { getRequestById } from "@/services/api/requests";

interface TableRowProps {
  request: IRequest;
}

export function TableRow({ request }: TableRowProps) {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const updatedRequest = useRef<IRequest | null>(null);

  useEffect(() => {
    if (!isModalActive) {
      updatedRequest.current = null;
    }
  }, [isModalActive]);

  const { id, type, description, userName, createdAt, status } = request;
  const formatCreatedAt = createdAt
    .split("T")[0]
    .split("-")
    .reverse()
    .join(".");

  const requestValues = {
    id,
    type: type.name,
    description,
    userName,
    createdAt: formatCreatedAt,
    status: status.name,
  };

  const requestValuesArr = Object.entries(requestValues);

  return (
    <>
      <tr
        className={styles.tr}
        onClick={async () => {
          try {
            const response = await getRequestById(id);
            updatedRequest.current = response.data;
            setIsModalActive(true);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        {requestValuesArr.length &&
          requestValuesArr.map((value) => {
            return (
              <TableItem mode={value[0]} value={value[1]} key={value[0]} />
            );
          })}
      </tr>
      <RequestModal
        isActive={isModalActive}
        closeModal={() => setIsModalActive(false)}
      >
        <RequestCard request={updatedRequest.current} />
      </RequestModal>
    </>
  );
}
