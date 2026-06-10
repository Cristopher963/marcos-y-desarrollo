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

  // Eliminar tarea
  const eliminarTarea = (id) => {
    fetch(`http://localhost:8080/tareas/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      setTareas((prev) => prev.filter((t) => t.idTarea !== id));
    })
    .catch((err) => console.error(err));
  };

  // Guardar tarea (crear o editar)
  const guardarTarea = (e) => {
    e.preventDefault();

    if (selectedTask) {
      // Editar tarea
      fetch(`http://localhost:8080/tareas/${selectedTask.idTarea}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descripcion, prioridad: tipo })
      })
      .then((res) => res.json())
      .then((tareaActualizada) => {
        setTareas((prev) =>
          prev.map((t) =>
            t.idTarea === tareaActualizada.idTarea ? tareaActualizada : t));
        cerrarModal();
      })
      .catch((err) => console.error(err));
    } else {
      // Crear tarea
      fetch("http://localhost:8080/tareas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descripcion, prioridad: tipo })
      })
      .then((res) => res.json())
      .then((tareaNueva) => {
        setTareas((prev) => [...prev, tareaNueva]);
        cerrarModal();
      })
      .catch((err) => console.error(err));
    }
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
        <div key={tarea.idTarea} className="card" style={{ cursor: "pointer" }}>
          <div onClick={() => abrirModal(tarea)}>
            <h3>{tarea.titulo}</h3>
            <p style={{ marginTop: "6px", color: "#6b7280" }}>
              {tarea.descripcion}
            </p>
          </div>
          <button onClick={() => eliminarTarea(tarea.idTarea)} style={{ marginTop: "8px" }}>
            Eliminar
          </button>
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
                <option value="MEDIA">Normal</option>
                <option value="ALTA">Importante</option>
                <option value="BAJA">Baja</option>
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