import React, { useState } from "react";

const useTodoLogic = () => {
  const [input, setInput] = useState(null);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const getData = async () => {
    await fetch("/api/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  const deleteTodoById = async (id) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json())
  };

  const memoTodoById = async (id, memo) => {
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ memo: memo }),
    }).then((response) => response.json());
    setIsOpen(false);
  };

  const pinTodoById = async (id, isPinned) => {
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pinned: !isPinned }),
    }).then((response) => response.json());
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTodo(input);
      e.target.value = null;
    }
  };

  const handleTodo = async (input) => {
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: input }),
    })
      .then((response) => response.json())
      .then((data) => setData((prevState) => [...prevState, data]));
  };

  return {
    data,
    setData,
    isOpen,
    setIsOpen,
    getData,
    deleteTodoById,
    memoTodoById,
    pinTodoById,
    handleChange,
    handleKeyDown,
    handleTodo,
  };
};

export default useTodoLogic;
