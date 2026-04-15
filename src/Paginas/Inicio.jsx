import { useState } from "react";

export default function Inicio() {

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const tareas = [
    { id: 1, titulo: "Tarea 1", descripcion: "Descripción 1" },
    { id: 2, titulo: "Tarea 2", descripcion: "Descripción 2" }
  ];

  const abrirModal = (tarea) => {
    setSelectedTask(tarea);
    setShowModal(true);
  };

  return (
    <div>
      <h1>🏠 Inicio</h1>

      <button onClick={() => {
        setSelectedTask(null);
        setShowModal(true);
      }}>
        ➕ Nueva tarea
      </button>

      {tareas.map((tarea) => (
        <div 
          key={tarea.id} 
          className="card"
          onClick={() => abrirModal(tarea)}
          style={{ cursor: "pointer" }}
        >
          {tarea.titulo}
        </div>
      ))}

      {/* MODAL */}
      {showModal && (
        <div className="modalOverlay">
          <div className="modal">

            <h2>
              {selectedTask ? "Editar tarea" : "Crear tarea"}
            </h2>

            <form>
              <input 
                type="text" 
                placeholder="Título"
                defaultValue={selectedTask?.titulo || ""}
              />

              <input 
                type="text" 
                placeholder="Descripción"
                defaultValue={selectedTask?.descripcion || ""}
              />

              {/* Tipo de tarea */}
              <select defaultValue="normal">
                <option value="normal">Normal</option>
                <option value="importante">Importante</option>
                <option value="urgente">Urgente</option>
              </select>

              <div className="modalButtons">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
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