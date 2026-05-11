import { useState } from "react";

export default function Inicio({ tareas = [], setTareas }) {

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  //Funciones para guardar tareas
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("normal");

  //Abrir tarea
  const abrirModal = (tarea) => {
    setSelectedTask(tarea);
    setTitulo(tarea?.titulo || "");
    setDescripcion(tarea?.descripcion || "");
    setTipo(tarea?.tipo || "normal");
    setShowModal(true);
  };

  //Cerrar tarea
  const cerrarModal = () => {
    setShowModal(false);
    setSelectedTask(null);
    setTitulo("");
    setDescripcion("");
    setTipo("normal");
  };

  // Guardar tarea (crear o editar)
  const guardarTarea = (e) => {
    e.preventDefault();

    if (selectedTask) {
      // Editar tarea
      const nuevasTareas = tareas.map((tarea) =>
        tarea.id === selectedTask.id
          ? {
              ...tarea,
              titulo,
              descripcion,
              tipo
            }
          : tarea
      );

      setTareas(nuevasTareas);
    } else {
      // Crear tarea
      const nuevaTarea = {
        id: Date.now(),
        titulo,
        descripcion,
        tipo
      };

      setTareas((prev) => [...prev, nuevaTarea]);
    }

    cerrarModal();
  };

  return (
    <div>
      <h1>🏠 Inicio</h1>

      <button onClick={() => {
        setSelectedTask(null);
        setTitulo("");
        setDescripcion("");
        setTipo("normal");
        setShowModal(true);
      }}>
        + Nueva tarea
      </button>

      {tareas.map((tarea) => (
        <div
          key={tarea.id}
          className="card"
          onClick={() => abrirModal(tarea)}
          style={{ cursor: "pointer" }}
        >
          <div>
            <h3>{tarea.titulo}</h3>

            <p
              style={{
                marginTop: "6px",
                color: "#6b7280",
              }}
            >
              {tarea.descripcion}
            </p>
          </div>
        </div>
      ))}

      {/* MODAL */}
      {showModal && (
        <div
          className="modalOverlay"
          onClick={cerrarModal}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>
              {selectedTask ? "Editar tarea" : "Crear tarea"}
            </h2>

            <form onSubmit={guardarTarea}>
              <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />

              {/* Tipo de tarea */}
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="normal">Normal</option>
                <option value="importante">Importante</option>
                <option value="urgente">Urgente</option>
              </select>

              <textarea placeholder="Notas"></textarea>

              <div className="modalButtons">
                <button
                  type="button"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>

                <button type="submit">
                  Guardar
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}