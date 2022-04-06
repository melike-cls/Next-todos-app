import { Popover } from "@headlessui/react";
import { useState, useEffect } from "react";
import { HiDotsHorizontal, HiOutlineClipboard } from "react-icons/hi";
import { AiTwotonePushpin } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import styles from "../styles/Home.module.css";
import useTodoLogic from "../hooks/useTodoLogic";

export default function PopupMenu({ id, isPinned }) {
  const [memoValue, setMemoValue] = useState("");
  const { deleteTodoById, memoTodoById, pinTodoById, isOpen, setIsOpen } =
    useTodoLogic();

  return (
    <Popover className={styles.popover}>
      <Popover.Button className={styles.menuButton}>
        <span className="dropMenu">
          <HiDotsHorizontal color="#fff" fontSize="20px" />
        </span>
      </Popover.Button>
      <Popover.Panel className={styles.popoverPanel}>
        <button
          className={styles.panelButton}
          onClick={() => pinTodoById(id, isPinned)}
        >
          <div className={styles.panelButtonArea}>
            <span className="pinColor">
              <AiTwotonePushpin />
            </span>
            <span className={styles.buttonText}>
              {isPinned ? "UnPin on the top" : "Pin on the top"}
            </span>
          </div>
        </button>
        <button className={styles.panelButton}>
          <div className={styles.panelButtonArea}>
            <span>
              <HiOutlineClipboard />
            </span>
            <span className={styles.buttonText} onClick={() => setIsOpen(true)}>
              Add a memo
            </span>
          </div>
        </button>

        {isOpen && (
          <div className={styles.addMemo}>
            <input
              className={styles.memoInput}
              name="memo"
              onChange={(e) => setMemoValue(e.target.value)}
            />
            <button
              className={styles.memoButtonOkay}
              onClick={(e) => {
                memoTodoById(id, memoValue);
                setMemoValue(null);
              }}
            >
              OK
            </button>
            <button
              className={styles.memoButtonCancel}
              onClick={() => setIsOpen(false)}
            >
              NO
            </button>
          </div>
        )}
        <button
          className={styles.panelButton}
          onClick={() => deleteTodoById(id)}
        >
          <div className={styles.panelButtonArea}>
            <span>
              <RiDeleteBin6Fill />
            </span>
            <span className={styles.buttonText}>Delete</span>
          </div>
        </button>
      </Popover.Panel>
    </Popover>
  );
}
