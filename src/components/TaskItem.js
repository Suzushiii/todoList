import React from "react";

const TaskItem = ({ task, toggleComplete, deleteTask }) => {
  return (
    <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>
      <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
      <button onClick={() => deleteTask(task.id)}>Remover</button>
    </li>
  );
};

export default TaskItem;
