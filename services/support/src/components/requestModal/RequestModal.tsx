import styles from "./RequestModal.module.scss";

interface RequestModalProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  children: string | JSX.Element | JSX.Element[];
}

export const RequestModal = ({
  isActive,
  setIsActive,
  children,
}: RequestModalProps) => {
  return (
    <div
      className={isActive ? styles["active-modal"] : styles.modal}
      onClick={() => {
        setIsActive(false);
      }}
    >
      <div
        className={
          isActive ? styles["active-modal__content"] : styles.modal__content
        }
        onClick={(e) => e.stopPropagation()}
      >
        {isActive && children}
      </div>
    </div>
  );
};
