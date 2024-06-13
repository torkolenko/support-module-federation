import { useCallback, useEffect, useState, useRef } from "react";
import styles from "./RequestForm.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Plus from "@/assets/plus.svg";
import { postRequest } from "@/services/api/requests";
import { fetchRequestsThunk } from "@/store/reducers/ActionCreators";
import { Dropdown } from "../dropdown/Dropdown";
import buttonStyles from "@/components/shared/Button.module.scss";
import Cross from "@/assets/cross.svg";

interface NavBarProps {
  closeModal: () => void;
}

export function RequestForm({ closeModal }: NavBarProps) {
  const { currentPage } = useAppSelector((state) => state.pageReducer.page);

  const filteredParams = useAppSelector(
    (state) => state.filterParamReducer.params
  );

  const { types } = useAppSelector((state) => state.typeReducer);
  const typeNames = types.map((type) => type.name);
  const dispatch = useAppDispatch();

  const USER_TOUCHED_ERROR = "Имя пользователя не может быть пустым";
  const USER_MINLENGTH_ERROR = "Имя должно состоять минимум из двух букв";
  const USER_CONTENT_ERROR =
    "Поле может содержать только буквы, дефис и пробел. Первые два символа - буквы.";
  const DESCRIPTION_TOUCHED_ERROR = "Описание обращения не может быть пустым";

  const DESCRIPTION_FIELD_NAME = "description";
  const USER_FIELD_NAME = "user";
  const TYPE_FIELD_NAME = "type";

  const [userName, setUserName] = useState<string>("");
  const [userTouched, setUserTouched] = useState<boolean>(false);
  const [userError, setUserError] = useState<string>(USER_TOUCHED_ERROR);

  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    if (types.length) {
      setSelectedType(() => types[0].name);
    }
  }, [types.length]);

  const [uploadFile, setUploadFile] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const [description, setDescription] = useState<string>("");
  const [descriptionTouched, setDescriptionTouched] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<string>(
    DESCRIPTION_TOUCHED_ERROR
  );

  const filePicker = useRef(null);

  const [isFormValid, SetIsFormValid] = useState<boolean>(false);

  const validUserName = (uName: string): string => {
    if (!uName) {
      return USER_TOUCHED_ERROR;
    }

    if (uName.length === 1) {
      return USER_MINLENGTH_ERROR;
    }

    const re = /^\p{L}\p{L}[-\s\p{L}]*$/u;
    if (!re.test(uName)) {
      return USER_CONTENT_ERROR;
    }

    return "";
  };

  useEffect(() => {
    if (descriptionError || userError) {
      SetIsFormValid(() => false);
    } else {
      SetIsFormValid(() => true);
    }
  }, [descriptionError, userError]);

  const handleBlur = useCallback(
    (
      event:
        | React.FocusEvent<HTMLInputElement>
        | React.FocusEvent<HTMLTextAreaElement>
    ) => {
      switch (event.target.name) {
        case USER_FIELD_NAME:
          setUserTouched(() => true);
          break;
        case DESCRIPTION_FIELD_NAME:
          setDescriptionTouched(() => true);
          break;
      }
    },
    [setUserTouched, setDescriptionTouched]
  );

  const handleUserChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const inputValue = e.target.value;

      setUserName(() => inputValue);

      const errorInInput = validUserName(inputValue);

      setUserError(() => errorInInput);
    },
    []
  );

  const handleDescriptionChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const inputValue = e.target.value;

      setDescription(() => inputValue);

      if (!inputValue) {
        setDescriptionError(() => DESCRIPTION_TOUCHED_ERROR);
      } else {
        setDescriptionError(() => "");
      }
    },
    [setDescriptionError, setDescription]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.files);
      setUploadFile(e.target.files[0]);
    },
    [setUploadFile]
  );

  const handleFilePick = useCallback(() => {
    filePicker.current.click();
  }, [filePicker]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const selectedTypeId = types
        .find((type) => type.name === selectedType)
        .id.toString();

      const formData = new FormData();

      formData.append("typeId", selectedTypeId);
      formData.append("userName", userName);
      formData.append("description", description);

      if (uploadFile) {
        formData.append("image", uploadFile);
      }
      try {
        await postRequest(formData);
        await dispatch(
          fetchRequestsThunk({
            limit: 13,
            page: currentPage,
            ...filteredParams,
          })
        );
        closeModal();
      } catch (e) {
        console.log(e);
      }
    },
    [uploadFile, selectedType, types, userName, description, uploadFile]
  );

  const cutFileName = (value: string, maxLength: number): string => {
    const withoutExtension = value.slice(0, value.lastIndexOf("."));

    if (withoutExtension.length > maxLength) {
      return `${value.slice(0, maxLength)}..${value.slice(
        value.lastIndexOf(".")
      )}`;
    }

    return value;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form__container}>
        <label htmlFor={USER_FIELD_NAME} className={styles["form__label"]}>
          Автор обращения
        </label>
        <div style={{ height: "63px" }}>
          <input
            placeholder="Введите имя автора обращения"
            id={USER_FIELD_NAME}
            className={styles.form__input}
            value={userName}
            type="text"
            name={USER_FIELD_NAME}
            onBlur={handleBlur}
            onChange={handleUserChange}
          />
          {userTouched && (
            <div className={styles.validation__error}>{userError}</div>
          )}
        </div>
      </div>
      <div className={styles.form__container} style={{ marginTop: "17px" }}>
        <label htmlFor={TYPE_FIELD_NAME} className={styles["form__label"]}>
          Тип запроса
        </label>
        <Dropdown
          liArray={typeNames}
          selectedValue={selectedType}
          setSelectedValue={(typeName: string) => setSelectedType(typeName)}
        />
      </div>
      <h4 className={styles["form__h4"]}>Добавить описание</h4>
      <div style={{ height: "175px" }}>
        <textarea
          className={styles.form__textarea}
          value={description}
          name={DESCRIPTION_FIELD_NAME}
          onBlur={handleBlur}
          onChange={handleDescriptionChange}
          placeholder="Введите описание запроса"
        />
        {descriptionTouched && (
          <div className={styles.validation__error}>{descriptionError}</div>
        )}
      </div>
      <h4 className={styles["form__h4"]}>Добавить изображение</h4>
      <div className={styles["form__img-content"]}>
        <button
          onClick={handleFilePick}
          className={styles["form__img-btn"]}
          type="button"
        >
          <Plus fill="#615E5E" height={20} width={20} />
        </button>
        <input
          ref={filePicker}
          key={fileInputKey}
          className={styles.hidden}
          type="file"
          onChange={handleFileChange}
          accept="image/*,.png,.jpg,.gif"
        ></input>
        {uploadFile && (
          <div className={styles["form__img-info"]}>
            {cutFileName(uploadFile.name, 18)}
            <button
              onClick={() => {
                setFileInputKey(fileInputKey + 1);
                setUploadFile(null);
              }}
              className={buttonStyles["svg-btn"]}
              style={{ width: "12px" }}
              type="button"
            >
              <Cross fill="#fd1e00" height={10} width={10} />
            </button>
          </div>
        )}
      </div>
      <div className={styles["form__submit-btns-container"]}>
        <button
          className={buttonStyles.button}
          style={{ width: "123px" }}
          disabled={!isFormValid}
          type="submit"
        >
          Сохранить
        </button>
        <button
          className={buttonStyles.button}
          style={{ width: "109px" }}
          type="button"
          onClick={() => closeModal()}
        >
          Закрыть
        </button>
      </div>
    </form>
  );
}
