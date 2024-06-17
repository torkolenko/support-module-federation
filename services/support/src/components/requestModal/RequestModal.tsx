import { useEffect, useRef } from "react";
import styles from "./RequestModal.module.scss";
import Cross from "@/assets/cross.svg";
import { Transition, TransitionStatus } from "react-transition-group";

interface RequestModalProps {
  isActive: boolean;
  closeModal: () => void;
  isDisabledExit: boolean;
  children: string | JSX.Element | JSX.Element[];
}

const duration = 400;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles: Partial<Record<TransitionStatus, React.CSSProperties>> =
  {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

export const RequestModal = ({
  closeModal,
  isActive,
  isDisabledExit,
  children,
}: RequestModalProps) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });

  useEffect(() => {
    if (isActive) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isActive]);

  const onKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        if (!isDisabledExit) {
          closeModal();
        }
        break;
    }
  };

  return (
    <>
      <Transition
        nodeRef={nodeRef}
        in={isActive}
        timeout={duration}
        unmountOnExit
        mountOnEnter
      >
        {(state) => (
          <div
            ref={nodeRef}
            className={styles.modal}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              if (e.target instanceof HTMLElement) {
                if (!e.target.closest("#modal-content") && !isDisabledExit) {
                  closeModal();
                }
              }
            }}
          >
            <div className={styles.modal__wrapper}>
              <div className={styles.modal__content} id="modal-content">
                <button
                  className={styles.modal__close}
                  onClick={() => {
                    if (!isDisabledExit) {
                      closeModal();
                    }
                  }}
                >
                  <Cross height={14} width={14} />
                </button>
                {children}
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};
