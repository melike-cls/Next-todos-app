import styles from "../styles/Home.module.css";
import PopupMenu from "./Popup";
import { AiTwotonePushpin } from "react-icons/ai";

const fetch = (...args) => fetch(...args).then((res) => res.json());

const Todo = ({ id, isChecked, isPintle, content, memo }) => {
  //Todo Check By Id "PATCH" Function
  const checkTodoById = async (id, check) => {
    await fetch("/api/tasks/" + `${id}`, {
      method: "PATCH",
      body: JSON.stringify({ checked: check }),
    });
    mutate("/api/tasks");
  };

  return (
    <div className={styles.todoItem}>
      <div className={styles.pinArea}>
        {isPintle && (
          <span className="pinColor">
            <AiTwotonePushpin />
          </span>
        )}
        <style jsx>
          {`
            .pinColor {
              color: #f06292;
              font-size: 20px;
            }
          `}
        </style>
      </div>
      <div className={styles.check}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => checkTodoById(id, e.target.checked)}
          />
          <span className={styles.checkmark}></span>
        </label>
      </div>
      <div className={styles.content}>
        <span className={styles.contentText}>{content}</span>
        {memo && <span className={styles.contentMemo}>{memo}</span>}
      </div>
      <div className={styles.actionButton}>
        <PopupMenu id={id} value={isPintle}></PopupMenu>
      </div>
    </div>
  );
};
export default Todo;
