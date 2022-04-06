import styles from "../styles/Home.module.css";
import PopupMenu from "./Popup";
import { AiTwotonePushpin } from "react-icons/ai";
import { useState } from "react";

const Todo = ({ id, isChecked, isPinned, content, memo }) => {
  const [checks, setChecks] = useState(isChecked);

  //Todo Check By Id "PATCH" Function
  const checkTodoById = async (id, checks) => {
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ checked: checks }),
    }).then((response) => response.json());
  };

  return (
    <div className={styles.todoItem}>
      <div className={styles.pinArea}>
        {isPinned && (
          <span className="pinColor">
            <AiTwotonePushpin color="red" fontSize="20px" />
          </span>
        )}
      </div>
      <div className={styles.check}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={checks}
            onChange={() => {
              setChecks(!checks);
              checkTodoById(id, checks);
            }}
          />
          <span className={styles.checkmark}></span>
        </label>
      </div>
      <div className={styles.content}>
        <span className={styles.contentText}>{content}</span>
        {memo && <span className={styles.contentMemo}>{memo}</span>}
      </div>
      <div className={styles.actionButton}>
        <PopupMenu id={id} isPinned={isPinned}></PopupMenu>
      </div>
    </div>
  );
};
export default Todo;
