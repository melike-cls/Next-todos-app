import { Popover } from "@headlessui/react";
// import { mutate } from "swr";
import { useState } from "react";
import { HiDotsHorizontal, HiOutlineClipboard } from "react-icons/hi";
import { AiTwotonePushpin } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";

import styles from "../styles/Home.module.css";

const fetch = (...args) => fetch(...args).then((res) => res.json());

export default function PopupMenu({ id, pinValue }) {
  //Memo Input Control State
  const [isOpen, setIsOpen] = useState(false);
  //Memo Input Value State
  const [memoValue, setMemoValue] = useState(null);

  //Pin Todo By Id "PATCH" Function
  const pinTodoById = async (id, pinValue) => {
    await fetch("/api/tasks/" + `${id}`, {
      method: "PATCH",
      body: JSON.stringify({ pintle: !pinValue }),
    });
    // mutate("/api/tasks");
  };

  //Add Memo By Id "PATCH" Function
  const memoTodoById = async (id, memo) => {
    await fetch("/api/tasks/" + `${id}`, {
      method: "PATCH",
      body: JSON.stringify({ memo: memo }),
    });
    setIsOpen(false);
    mutate("/api/tasks");
  };

  //Delete Todo By Id "DELETE" Function
  const deleteTodoById = async (id) => {
    await fetch("/api/tasks/" + `${id}`, {
      method: "DELETE",
    });
    mutate("/api/tasks");
  };

  return (
    <Popover className={styles.popover}>
      <Popover.Button className={styles.menuButton}>
        <span className="dropMenu">
          <HiDotsHorizontal />
        </span>

        <style jsx>
          {`
            .dropMenu {
              color: #a9b1ba;
              font-size: 20px;
            }
          `}
        </style>
      </Popover.Button>
      <Popover.Panel className={styles.popoverPanel}>
        <button
          className={styles.panelButton}
          onClick={() => pinTodoById(id, pinValue)}
        >
          <div className={styles.panelButtonArea}>
            <span className="pinColor">
              <AiTwotonePushpin />
            </span>
            <span className={styles.buttonText}>Pin on the top</span>
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
              O
            </button>
            <button
              className={styles.memoButtonCancel}
              onClick={() => setIsOpen(false)}
            >
              X
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
