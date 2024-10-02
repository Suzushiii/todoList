import React, { useState } from "react";

// Estilos de botão e input refinados para um visual moderno
const buttonStyle = (bgColor) => ({
  marginLeft: "10px",
  backgroundColor: bgColor,
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  padding: "10px 15px",
  cursor: "pointer",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s, transform 0.2s",
});

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "60%",
  marginRight: "10px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

const listItemStyle = (completed) => ({
  padding: "15px",
  backgroundColor: completed ? "#d4edda" : "#f4f4f4",
  marginBottom: "10px",
  textDecoration: completed ? "line-through" : "none",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s",
});

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  const handleAddTask = () => {
    if (newTask) {
      const task = { text: newTask, completed: false };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const toggleCompleteTask = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setIsEditing(true);
    setCurrentTaskIndex(index);
    setEditTaskText(tasks[index].text);
  };

  const handleUpdateTask = () => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === currentTaskIndex) {
        return { ...task, text: editTaskText };
      }
      return task;
    });
    setTasks(updatedTasks);
    setIsEditing(false);
    setCurrentTaskIndex(null);
    setEditTaskText("");
  };

  return (
    <div
      style={{
        marginTop: "20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#333", marginBottom: "20px" }}>Lista de Tarefas</h1>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Digite uma tarefa"
        style={inputStyle}
      />
      <button
        onClick={handleAddTask}
        style={{
          ...buttonStyle("#28a745"),
          backgroundColor: "#28a745",
          marginTop: "10px",
        }}
      >
        Adicionar
      </button>

      {/* Se estiver editando uma tarefa, exibe os campos de edição */}
      {isEditing && (
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            value={editTaskText}
            onChange={(e) => setEditTaskText(e.target.value)}
            style={inputStyle}
          />
          <button
            onClick={handleUpdateTask}
            style={buttonStyle("#007bff")} // Botão atualizar
          >
            Atualizar
          </button>
        </div>
      )}

      <ul style={{ marginTop: "20px", listStyleType: "none", paddingLeft: 0 }}>
        {tasks.map((task, index) => (
          <li key={index} style={listItemStyle(task.completed)}>
            <span
              style={{
                fontSize: "18px",
                fontWeight: task.completed ? "bold" : "normal",
              }}
            >
              {task.text}
            </span>
            <div>
              <button
                onClick={() => toggleCompleteTask(index)}
                style={{
                  ...buttonStyle(task.completed ? "#ffc107" : "#28a745"),
                  transform: "scale(1)",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                {task.completed ? "Desmarcar" : "Completar"}
              </button>
              <button
                onClick={() => handleEditTask(index)}
                style={{
                  ...buttonStyle("#007bff"),
                  transform: "scale(1)",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                Editar
              </button>
              <button
                onClick={() => handleRemoveTask(index)}
                style={{
                  ...buttonStyle("#dc3545"),
                  transform: "scale(1)",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
